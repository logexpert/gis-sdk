import {BaseStorage} from "./base";

export class LocalStorage extends BaseStorage {
    async delete(key: string): Promise<string | null> {
        const value = this.get(this.key(key))
        if(value) {
            localStorage.removeItem(this.key(key))
            return value
        }
        else return null
    }

    async get(key: string): Promise<string | null> {
        return localStorage.getItem(this.key(key))
    }

    async set(key: string, value: string): Promise<string> {
        localStorage.setItem(this.key(key), value)
        return value
    }
}