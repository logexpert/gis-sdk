const { LOGEXPERT_URL, LOGEXPERT_TOKEN, LOGEXPERT_CHECKED_OBJECT_ID } = process.env
import { Logexpert } from '../../src'

describe('exchange/mileage', () => {
    it('should return number', async () => {
        const sdk = new Logexpert(LOGEXPERT_URL!)
        await sdk.auth.static(LOGEXPERT_TOKEN!)

        const result = await sdk.exchange.mileage(LOGEXPERT_CHECKED_OBJECT_ID!,
            new Date('2022-07-18T21:00:00'),
            new Date('2022-07-19T20:59:59'))

        expect(result).toBeGreaterThanOrEqual(0.0)
    })
})