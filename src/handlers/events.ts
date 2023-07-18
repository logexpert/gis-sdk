import { ITransport } from "../transport"
import { ID, TrackPoint } from "../types"

export type EventPoint = Pick<TrackPoint, 'Timestamp' | 'Latitude' | 'Longitude'> & {
    Address?: string
}

export type RideDetectorEvent = {
    Begin: string
    End: string
    Type: 'Ride' | 'Stop' | 'Parking' | 'GpsOff' | 'GpsFail' | 'Teleport' | 'NoneWithMove' | 'None'
    Mileage: number
    Duration: string
    MaxSpeed: number
    Points?: TrackPoint[]
    BeginPoint?: EventPoint
    EndPoint?: EventPoint
}

type EventsResult = {
    Value: RideDetectorEvent[]
}

export class EventsHandler {
    transport: ITransport
    version: number

    private readonly _method = 'events'

    constructor(transport: ITransport, version: number = 1) {
        this.transport = transport
        this.version = version
    }

    private get _path() {
        return `v${this.version}/${this._method}`
    }

    async rideDetector(id: ID, from: Date, to: Date): Promise<RideDetectorEvent[]> {
        const response = await this.transport.get<EventsResult>(`${this._path}/ridedetector/${id}`, {
            params: {
                begin: from,
                end: to
            }
        })

        return response.data.Value
    }
}
