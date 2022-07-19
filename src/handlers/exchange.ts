import {ITransport} from "../transport";
import {ID} from "../types";

type MileageResponse = {
    Mileage: number
}

export class ExchangeHandler {
    private readonly _method = 'exchange'

    readonly transport: ITransport
    readonly version: number

    constructor(transport: ITransport, version: number = 1) {
        this.transport = transport
        this.version = version
    }

    private get _path() {
        return `v${this.version}/${this._method}`
    }

    async mileage(id: ID, from: Date, to: Date): Promise<number> {
        const response = await this.transport.get<MileageResponse>(`${this._path}/mileage`, {
            params: {
                objectId: id,
                begin: from,
                end: to
            }
        })

        return response.data.Mileage
    }
}