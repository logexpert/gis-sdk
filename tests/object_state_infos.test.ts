import { Logexpert } from '../src'
import 'jest-extended'
const { LOGEXPERT_URL, LOGEXPERT_TOKEN, LOGEXPERT_CHECKED_OBJECT_ID } = process.env

describe('object_state_infos', () => {
    it('should return correct schema by id', async () => {
        const sdk = new Logexpert(LOGEXPERT_URL!)
        await sdk.auth.static(LOGEXPERT_TOKEN!)

        const result = await sdk.objectStateInfos.readOne(LOGEXPERT_CHECKED_OBJECT_ID!)

        // todo: add another fields check
        expect(result).toMatchObject({
            Latitude: expect.any(Number),
            Longitude: expect.any(Number),
            State: expect.any(String),
            StateBeginTime: expect.any(String),
            Color: expect.any(String),
            Battery: expect.toBeOneOf([null, String]),
            LastConnectionTime: expect.any(String),
            ObjectTime: expect.any(String),
            LastPointTime: expect.any(String),
            Speed: expect.any(Number),
            Altitude: expect.any(Number),
            Heading: expect.any(Number),
            SatelliteCount: expect.any(Number),
            Id: Number(LOGEXPERT_CHECKED_OBJECT_ID!)
        })
    })
})