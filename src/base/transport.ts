import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import {ITransport, TransportRequestOptions, TransportResponse} from "../transport";

export type TransportMethods = 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch'

export type TransportOptions = TransportRequestOptions & {
    url: string
    beforeRequest?: (config: AxiosRequestConfig) => Promise<AxiosRequestConfig>
}

export class TransportAxios extends ITransport {
    private axios: AxiosInstance
    private config: TransportOptions

    constructor(config: TransportOptions) {
        super()

        this.config = config

        this.axios = axios.create({
            baseURL: config.url,
            params: config.params,
            headers: config.headers,
            onUploadProgress: config.onUploadProgress,
            withCredentials: true
        })

        if(config.beforeRequest) this.beforeRequest = config.beforeRequest
    }

    async beforeRequest(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
        return config
    }

    async request<Result, Input>(method: TransportMethods, path: string, data?: Input, options?: Omit<TransportOptions, 'url'>): Promise<TransportResponse<Result>> {
        let config: AxiosRequestConfig = {
            method,
            url: path,
            data: data,
            params: options?.params,
            headers: options?.headers,
            onUploadProgress: options?.onUploadProgress
        }

        config = await this.beforeRequest(config)

        const response = await this.axios.request(config)

        return {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            data: response.data
        }
    }

    get<Result>(path: string, options?: TransportRequestOptions): Promise<TransportResponse<Result>> {
        return this.request('get', path, undefined, options)
    }

    delete<Result, Input>(path: string, data?: Input, options?: TransportRequestOptions): Promise<TransportResponse<Result>> {
        return this.request('delete', path, data, options)
    }

    head<Result>(path: string, options?: TransportRequestOptions): Promise<TransportResponse<Result>> {
        return this.request('head', path, undefined, options)
    }

    async options<Result>(path: string, options?: TransportRequestOptions): Promise<TransportResponse<Result>> {
        return this.request('options', path,undefined, options)
    }

    async patch<Result, Input>(path: string, data?: Input, options?: TransportRequestOptions): Promise<TransportResponse<Result>> {
        return this.request('patch', path, data, options)
    }

    async post<Result, Input>(path: string, data?: Input, options?: TransportRequestOptions): Promise<TransportResponse<Result>> {
        return this.request('post', path, data, options)
    }

    async put<Result, Input>(path: string, data?: Input, options?: TransportRequestOptions): Promise<TransportResponse<Result>> {
        return this.request('put', path, data, options)
    }
}
