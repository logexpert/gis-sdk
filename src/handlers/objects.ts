import {HandlerItems} from "../base";
import {GisObject} from "../types";
import {ITransport} from "../transport";

export class ObjectsHandler extends HandlerItems<GisObject> {
    constructor(transport: ITransport, version: number = 1) {
        super('objects', transport, version)
    }
}