import {ID, ObjectStateInfo} from "../types";
import {ITransport} from "../transport";
import {HandlerOptions, HandlerResponseMany, HandlerResponseOne, QueryMany, QueryOne} from "../handler";
import {Query} from "../base";

export class ObjectStateInfosHandler {
    private readonly _method = 'ObjectStateInfos'

    readonly transport: ITransport
    readonly version: number

    constructor(transport: ITransport, version: number = 1) {
        this.transport = transport
        this.version = version
    }

    private get _path() {
        return `v${this.version}/${this._method}`
    }

    async readOne(id: ID, query?: QueryOne<ObjectStateInfo>, options?: HandlerOptions): Promise<HandlerResponseOne<ObjectStateInfo>> {
        const response = await this.transport.get(`${this._path}/${id}`, {
            params: this._prepareQuery(query) as Record<string, any> | undefined,
            ...options?.requestOptions
        })

        return response.data as HandlerResponseOne<ObjectStateInfo>
    }

    async readByQuery(query?: QueryMany<ObjectStateInfo>, options?: HandlerOptions): Promise<HandlerResponseMany<ObjectStateInfo>> {
        const response = await this.transport.get(this._path, {
            params: this._prepareQuery(query) as Record<string, any> | undefined,
            ...options?.requestOptions
        })

        return response.data as HandlerResponseMany<ObjectStateInfo>
    }

    _prepareQuery<T>(query?: Query<T>): Query<T> | null | undefined {
        if(query?.$select && query.$select instanceof Array) query.$select = query.$select.join(',')
        return query
    }
}