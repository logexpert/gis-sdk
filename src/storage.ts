export abstract class IStorage {
    abstract get(key: string): Promise<string | null>
    abstract set(key: string, value: string): Promise<string>
    abstract delete(key: string): Promise<string | null>
}