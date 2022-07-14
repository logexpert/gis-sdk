import {LatLon} from "./index";

export type ObjectStateInfo = LatLon & {
    State: string
    Color: string
    Battery?: string
    GsmSignal?: string
    LastConnectionTime: string
    ObjectTime: string
    LastValidTime: string
    LastPointTime: string
    Speed: number
    Altitude: number
    Heading: number
    SatelliteCount: number
    Id: number
    Sensors: Sensor[]
    RawSensors: Record<string, string>
    LastPoints: LatLon[]
}

export type Sensor = {
    Name: string
    Value: string
}