const { LOGEXPERT_URL, LOGEXPERT_TOKEN, LOGEXPERT_CHECKED_OBJECT_ID } = process.env
import { Logexpert } from '../../src'

describe('events/ridedetector', () => {
    it('can use method', async () => {
        const sdk = new Logexpert(LOGEXPERT_URL!)
        await sdk.auth.static(LOGEXPERT_TOKEN!)

        const result = await sdk.events.rideDetector(LOGEXPERT_CHECKED_OBJECT_ID!,
            new Date('2022-07-18T21:00:00'),
            new Date('2022-07-19T20:59:59'))

        expect(result).toBeInstanceOf(Array)

        for(const event of result) {
            expect(event).toMatchObject({
                Begin: expect.any(String),
                End: expect.any(String),
                Type: expect.any(String),
                Mileage: expect.any(Number),
            })

            expect(event.Mileage).toBeGreaterThanOrEqual(0.0)
        }
    })
})