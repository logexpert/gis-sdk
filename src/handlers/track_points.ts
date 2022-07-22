import {ITransport} from "../transport";
import {ID, TrackPoint} from "../types";
import {HandlerResponseMany} from "../handler";

export class TrackPointsHandler {
    transport: ITransport
    version: number

    private readonly _method = 'TrackPoints'

    constructor(transport: ITransport, version: number = 1) {
        this.transport = transport
        this.version = version
    }

    private get _path() {
        return `v${this.version}/${this._method}`
    }

    async read(id: ID, from: Date, to: Date): Promise<TrackPoint[]> {
        const response = await this.transport.get<HandlerResponseMany<TrackPoint>>(this._path, {
            params: {
                objectId: id,
                begin: from.toISOString(),
                end: to.toISOString()
            }
        })

        return response.data.value
    }
}