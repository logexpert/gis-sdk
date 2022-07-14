import {BaseStorage} from "./base";

export class MemoryStorage extends BaseStorage {
    private values: Record<string, string> = {}

    async delete(key: string): Promise<string | null> {
        if(this.values[this.key(key)]) {
            const value = this.values[this.key(key)]
            delete this.values[this.key(key)]
            return value
        }
        else return null
    }

    async get(key: string): Promise<string | null> {
        return this.values[this.key(key)] ?? null
    }

    async set(key: string, value: string): Promise<string> {
        this.values[this.key(key)] = value
        return value
    }
}