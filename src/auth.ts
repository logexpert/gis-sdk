export type AuthToken = string

export type AuthResult = {
    access_token: string
    expires_in: number
    refresh_token: string
    token_type: string
}

export type AuthCredentials = {
    username: string
    password: string
}

export abstract class IAuth {
    abstract readonly token: Promise<string | null>

    abstract login(credentials: AuthCredentials): Promise<AuthResult>
    abstract refresh(): Promise<AuthResult | false>
    abstract refreshIfExpired(): Promise<void>
    abstract static(token: AuthToken): Promise<void>
    abstract logout(): Promise<void>
}