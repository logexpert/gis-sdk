import {ObjectsHandler, TrackPointsHandler, ObjectStateInfosHandler} from "./handlers"
import {ITransport} from "./transport"
import {TransportAxios} from "./base"
import {IAuth} from "./auth"
import {IStorage} from "./storage"
import {LocalStorage, MemoryStorage, StorageOptions} from "./base/storage"
import {Auth, AuthOptions} from "./base/auth"

export type LogexpertStorageOptions = StorageOptions & {
    mode?: 'LocalStorage' | 'MemoryStorage' | 'NodeStorage'
}

export type LogexpertOptions = {
    transport?: ITransport
    auth?: IAuth | Omit<AuthOptions, 'transport' | 'storage'>
    storage?: IStorage | LogexpertStorageOptions
}

export class Logexpert {
    private _objects?: ObjectsHandler
    private _trackPoints?: TrackPointsHandler
    private _objectStateInfos?: ObjectStateInfosHandler

    protected readonly version: number

    readonly transport: ITransport
    readonly storage: IStorage
    readonly auth: IAuth

    constructor(url: string, options?: LogexpertOptions, version: number = 1) {
        this.version = version

        if(options?.storage && options.storage instanceof IStorage) this.storage = options.storage
        else {
            const storageOptions = options?.storage as LogexpertStorageOptions | undefined

            if(storageOptions?.mode === 'MemoryStorage' || typeof window === 'undefined') {
                this.storage = new MemoryStorage({
                    prefix: storageOptions?.prefix
                })
            }
            else {
                this.storage = new LocalStorage({
                    prefix: storageOptions?.prefix
                })
            }
        }

        if(!options?.transport) {
            this.transport = new TransportAxios({
                url: url,
                ...options,
                beforeRequest: async (config) => {
                    await this.auth.refreshIfExpired()
                    const token = await this.auth.token

                    return {
                        ...config,
                        headers: {
                            Authorization: `ApiKey ${token}`,
                                ...config.headers
                        }
                    }
                }
            })
        }
        else this.transport = options.transport

        if(options?.auth && options.auth instanceof IAuth) this.auth = options.auth
        else {
            this.auth = new Auth({
                transport: this.transport,
                storage: this.storage,
                ...options?.auth
            })
        }
    }

    get objects(): ObjectsHandler {
        if(!this._objects) {
            this._objects = new ObjectsHandler(this.transport, this.version)
        }

        return this._objects!
    }

    get trackPoints(): TrackPointsHandler {
        if(!this._trackPoints) {
            this._trackPoints = new TrackPointsHandler(this.transport)
        }

        return this._trackPoints
    }

    get objectStateInfos(): ObjectStateInfosHandler {
        if(!this._objectStateInfos) {
            this._objectStateInfos = new ObjectStateInfosHandler(this.transport, this.version)
        }

        return this._objectStateInfos
    }
}