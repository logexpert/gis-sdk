import {IStorage} from "../../storage";

export type StorageOptions = {
    prefix?: string
}

export abstract class BaseStorage extends IStorage {
    protected prefix: string

    constructor(options?: StorageOptions) {
        super();

        this.prefix = options?.prefix ?? ''
    }

    protected key(name: string): string {
        return `${this.prefix}${name}`
    }
}