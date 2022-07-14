export type Headers = Record<string, string>

export type TransportResponse<T> = {
    data: T
    status: number
    statusText?: string
    headers: Headers
}

export type TransportRequestOptions = {
    params?: Record<string, any>
    headers?: Headers
    onUploadProgress?: ((progressEvent: any) => void) | undefined
}

export abstract class ITransport {
    abstract get<Result>(path: string, options?: TransportRequestOptions): Promise<TransportResponse<Result>>
    abstract head<Result>(path: string, options?: TransportRequestOptions): Promise<TransportResponse<Result>>
    abstract options<Result>(path: string, options?: TransportRequestOptions): Promise<TransportResponse<Result>>
    abstract delete<Result, Input>(path: string, data?: Input, options?: TransportRequestOptions): Promise<TransportResponse<Result>>
    abstract post<Result, Input>(path: string, data?: Input, options?: TransportRequestOptions): Promise<TransportResponse<Result>>
    abstract put<Result, Input>(path: string, data?: Input, options?: TransportRequestOptions): Promise<TransportResponse<Result>>
    abstract patch<Result, Input>(path: string, data?: Input, options?: TransportRequestOptions): Promise<TransportResponse<Result>>
}
