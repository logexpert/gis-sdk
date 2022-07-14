import {Item, ID, PartialItem} from "./types"
import {TransportRequestOptions} from "./transport"

export type QueryOne<T> = {
    $select?: keyof T | (keyof T)[] | string | string[]
    $expand?: string,
}

export type QueryMany<T> = QueryOne<T> & {
    $filter?: string
    $orderby?: string
    $top?: number
}

export type HandlerResponseOne<T extends Item> = T

export type HandlerResponseMany<T extends Item> = {
    value: T[]
}

export interface IHandlerItems<T extends Item> {
    createOne(value: PartialItem<T>): Promise<HandlerResponseOne<T>>
    readOne(id: ID, query?: QueryOne<T>): Promise<HandlerResponseOne<T>>
    readByQuery(query: QueryMany<T>): Promise<HandlerResponseMany<T>>
    updateOne(id: ID, value: PartialItem<T>): Promise<HandlerResponseOne<T>>
    deleteOne(id: ID): Promise<void>
}

export type HandlerOptions = {
    requestOptions: TransportRequestOptions
}


