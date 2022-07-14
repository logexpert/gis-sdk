import {ID, Item, PartialItem} from "../types";
import {HandlerResponseMany, HandlerResponseOne, IHandlerItems, HandlerOptions, QueryOne, QueryMany} from "../handler";
import {ITransport} from "../transport";

export type Query<T> = QueryOne<T> | QueryMany<T>

export class HandlerItems<T extends Item> implements IHandlerItems<T> {
    protected transport: ITransport
    protected collection: string
    protected version: number

    constructor(collection: string, transport: ITransport, version: number) {
        this.collection = collection
        this.transport = transport
        this.version = version
    }

    async createOne(value: PartialItem<T>): Promise<HandlerResponseOne<T>> {
        const response = await this.transport.post(this.path, value)
        return response.data as HandlerResponseOne<T>
    }

    async updateOne(id: ID, value: PartialItem<T>): Promise<HandlerResponseOne<T>> {
        const response = await this.transport.patch(`${this.path}/${id}`, value)
        return response.data as HandlerResponseOne<T>
    }

    async deleteOne(id: ID): Promise<void> {
        await this.transport.delete(`${this.path}/${id}`)
    }

    protected get path() {
        return `v${this.version}/${this.collection}`
    }

    async readByQuery(query: QueryMany<T>, options?: HandlerOptions): Promise<HandlerResponseMany<T>> {
        const response = await this.transport.get(this.path, {
            params: this._prepareQuery(query)!,
            ...options?.requestOptions
        })

        return response.data as HandlerResponseMany<T>
    }

    async readOne(id: ID, query?: QueryOne<T>, options?: HandlerOptions): Promise<HandlerResponseOne<T>> {
        const response = await this.transport.get(`${this.path}/${id}`, {
            params: this._prepareQuery(query) as Record<string, any>,
            ...options?.requestOptions
        })

        return response.data as HandlerResponseOne<T>
    }

    _prepareQuery<T>(query?: Query<T>): Query<T> | null | undefined {
        if(query?.$select && query.$select instanceof Array) query.$select = query.$select.join(',')
        return query
    }
}