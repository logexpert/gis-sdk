import {AuthCredentials, AuthResult, AuthToken, IAuth} from "../auth"
import {ITransport} from "../transport"
import {IStorage} from "../storage"

export type AuthOptions = {
    autoRefresh?: boolean
    msRefreshBeforeExpires?: number
    staticToken?: string
    transport: ITransport
    storage: IStorage
}

export enum StorageKeys {
    Token = 'auth_token',
    RefreshToken = 'auth_refresh_token',
    Expires = 'auth_expires'
}

export type StaticToken = 'StaticToken'
export type DynamicToken = 'DynamicToken'

export type TokenType = StaticToken | DynamicToken | null

export type AuthStorage<T extends TokenType = DynamicToken> = {
    access_token: T extends DynamicToken | StaticToken ? string : null | undefined
    expires: T extends DynamicToken ? number : null
    refresh_token: T extends DynamicToken ? string : null
}

export class Auth extends IAuth {
    autoRefresh = true
    msRefreshBeforeExpires = 30000
    staticToken = ''

    private storage: IStorage
    private transport: ITransport

    private _refreshPromise?: Promise<AuthResult | false>

    constructor(options: AuthOptions) {
        super();

        this.storage = options.storage
        this.transport = options.transport

        this.staticToken = options.staticToken ?? this.staticToken
        this.autoRefresh = options.autoRefresh ?? this.autoRefresh
        this.msRefreshBeforeExpires = options.msRefreshBeforeExpires ?? this.msRefreshBeforeExpires
    }

    get token(): Promise<string | null> {
        return this.storage.get(StorageKeys.Token)
    }

    async login(credentials: AuthCredentials): Promise<AuthResult> {
        this.staticToken = ''
        await this._resetStorage()

        const input = `username=${credentials.username}&password=${credentials.password}&grant_type=password`

        const response = await this.transport.post<AuthResult, any>('auth/token', input, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        const { data } = response

        await this._updateStorage<DynamicToken>({
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            expires: Date.now() + data.expires_in * 1000
        })

        return response.data
    }

    logout(): Promise<void> {
        this.staticToken = ''
        return this._resetStorage()
    }

    refresh(): Promise<AuthResult | false> {
        const refreshPromise = async () => {
            const refresh = await this.storage.get(StorageKeys.RefreshToken)
            if(!refresh) return false

            const response = await this.transport.post<AuthResult, any>('auth/token', {
                refresh_token: refresh,
                grant_type: 'refresh_token'
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })

            const { data } = response

            await this._updateStorage<DynamicToken>({
                access_token: data.access_token,
                refresh_token: data.refresh_token,
                expires: Date.now() + data.expires_in * 1000
            })

            return data
        }

        return (this._refreshPromise = refreshPromise())
    }

    async refreshIfExpired(): Promise<void> {
        if(this.staticToken) return
        if(!this.autoRefresh) return

        if(this._refreshPromise) {
            return
        }

        const expires = Number(await this.storage.get(StorageKeys.Expires))

        if(expires < Date.now() + this.msRefreshBeforeExpires) {
            this.refresh()
        }
    }

    async static(token: AuthToken): Promise<void> {
        await this.transport.get('v1/account', {
            headers: {
                Authorization: `ApiKey ${token}`
            }
        })

        this.staticToken = token

        return this._updateStorage<StaticToken>({
            access_token: token,
            expires: null,
            refresh_token: null
        })
    }

    private _resetStorage(): Promise<void> {
        return this._updateStorage<null>({
            access_token: null,
            refresh_token: null,
            expires: null
        })
    }

    private async _updateStorage<T extends TokenType>(value: AuthStorage<T>): Promise<void> {
        if(value.access_token) await this.storage.set(StorageKeys.Token, value.access_token)
        else await this.storage.delete(StorageKeys.Token)

        if(value.refresh_token) await this.storage.set(StorageKeys.RefreshToken, value.refresh_token)
        else await this.storage.delete(StorageKeys.RefreshToken)

        if(value.expires) await this.storage.set(StorageKeys.Expires, value.expires.toString())
        else await this.storage.delete(StorageKeys.Expires)
    }
}