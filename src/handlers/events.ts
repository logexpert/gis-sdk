import {ITransport} from "../transport";
import {ID} from "../types";
import {HandlerResponseMany} from "../handler";

export type RideDetectorEvent = {
    Begin: string
    End: string
    Type: 'Ride' | 'Stop' | 'Parking' | 'GpsOff' | 'GpsFail' | 'Teleport' | 'NoneWithMove' | 'None'
    Mileage: number
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
        const response = await this.transport.get<HandlerResponseMany<RideDetectorEvent>>(`${this._path}/ridedetector/${id}`, {
            params: {
                begin: from,
                end: to
            }
        })

        return response.data.value
    }
}
