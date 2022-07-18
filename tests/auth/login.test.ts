import { AxiosError } from 'axios'
import { Logexpert } from '../../src'

const { LOGEXPERT_USERNAME, LOGEXPERT_PASSWORD, LOGEXPERT_URL, LOGEXPERT_TOKEN } = process.env

describe('static', () => {
    it('without error with correct token', async () => {
        const sdk = new Logexpert(LOGEXPERT_URL!)
        await sdk.auth.static(LOGEXPERT_TOKEN!)
    })

    it('should be error with invalid token', async () => {
        const sdk = new Logexpert(LOGEXPERT_URL!)

        try {
            await sdk.auth.static('invalid token')
        }
        catch (e) {
            const er = e as AxiosError
            expect(er.code).toBe('ERR_BAD_REQUEST')
        }
    })
})

describe('login', () => {
    it('should return correct auth result', async () => {
        const sdk = new Logexpert(LOGEXPERT_URL!)

        const result = await sdk.auth.login({
            username: LOGEXPERT_USERNAME!,
            password: LOGEXPERT_PASSWORD!
        })

        expect(result).toMatchObject({
            access_token: expect.any(String),
            expires_in: expect.any(Number),
            refresh_token: expect.any(String),
            token_type: expect.any(String)
        })
    })

    it('should return unauthorized code for invalid password', async () => {
        const sdk = new Logexpert(LOGEXPERT_URL!)

        try {
            await sdk.auth.login({
                username: LOGEXPERT_USERNAME!,
                password: 'invalid password'
            })
        }
        catch (e) {
            expect(e).toBeInstanceOf(AxiosError)
            const er = e as AxiosError
            expect(er.code).toBe('ERR_BAD_REQUEST')
            expect(er.response?.data).toMatchObject({
                error: 'invalid_grant',
                error_description: 'Неверное имя пользователя или пароль',
                'error_uri': expect.any(String)
            })
        }
    })

    it('should return unauthorized code for invalid user', async () => {
        const sdk = new Logexpert(LOGEXPERT_URL!)

        try {
            await sdk.auth.login({
                username: 'invalid user',
                password: LOGEXPERT_PASSWORD!
            })
        }
        catch (e) {
            expect(e).toBeInstanceOf(AxiosError)
            const er = e as AxiosError
            expect(er.code).toBe('ERR_BAD_REQUEST')
            expect(er.response?.data).toMatchObject({
                error: 'invalid_grant',
                error_description: 'Неверное имя пользователя или пароль',
                'error_uri': expect.any(String)
            })
        }
    })
})