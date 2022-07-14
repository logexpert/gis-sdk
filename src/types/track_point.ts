export type TrackPoint = {
    Timestamp: string
    InsertDateTime: string
    ExtId: number
    Latitude: number
    Longitude: number
    Altitude: number
    Speed: number
    Heading: number
    SatelliteCount: number
    Hdop?: number
    Valid: boolean
}