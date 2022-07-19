const { LOGEXPERT_URL, LOGEXPERT_TOKEN, LOGEXPERT_CHECKED_OBJECT_ID } = process.env
import { Logexpert } from '../../src'

describe('exchange/mileage', () => {
    it('should return number', async () => {
        const sdk = new Logexpert(LOGEXPERT_URL!)
        await sdk.auth.static(LOGEXPERT_TOKEN!)

        const result = await sdk.exchange.mileage(LOGEXPERT_CHECKED_OBJECT_ID!,
            new Date('2021-07-01T00:00:00'),
            new Date('2021-07-10T08:00:00'))

        expect(result).toBeGreaterThanOrEqual(0.0)
    })
})