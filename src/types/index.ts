export * from './gis_object'
export * from './track_point'
export * from './object_state_info'

export type Item = Record<string, any>
export type ID = number | string

export type LatLon = {
    Latitude: number
    Longitude: number
}

export type PartialItem<T extends Item> = {
    [Key in keyof T]?: T[Key] extends Item ? PartialItem<T[Key]> : T[Key]
}
