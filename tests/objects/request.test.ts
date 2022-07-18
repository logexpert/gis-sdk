const { LOGEXPERT_URL, LOGEXPERT_TOKEN, LOGEXPERT_CHECKED_OBJECT_ID } = process.env
import { Logexpert } from '../../src'

describe('objects', () => {
    it('should return correct schema by id', async () => {
        const sdk = new Logexpert(LOGEXPERT_URL!)
        await sdk.auth.static(LOGEXPERT_TOKEN!)

        const result = await sdk.objects.readOne(LOGEXPERT_CHECKED_OBJECT_ID!)

        expect(result).toMatchObject({
            Id: Number(LOGEXPERT_CHECKED_OBJECT_ID!),
            Name: expect.any(String),
            UniqueId: expect.any(String),
            PhoneNumber: expect.any(String),
            AccountingUnitId: expect.any(Number),
            CreateDate: expect.any(String),
            UpdateDate: expect.any(String),
            BatterySensor: expect.any(String),
            GsmSignalSensor: expect.any(String),
            CurrentProtocol: expect.any(String),
            ObjType: expect.any(String),
            IconId: expect.any(Number)
        })

        expect(result.RideDetectorSettings).toMatchObject({
            Type: expect.any(Number),
            MinSatelliteCount: expect.any(Number),
            MinSpeed: expect.any(Number),
            MinParkingTimeSeconds: expect.any(Number),
            MaxTrackPointsDistance: expect.any(Number),
            MinRideTimeSeconds: expect.any(Number),
            MinRideDistance: expect.any(Number),
            GpsSensorName: expect.any(String),
            MaxMessageTimeSeconds: expect.any(Number),
            GpsFailTresholdMinutes: expect.any(Number)
        })

        expect(result.DrainDetectorSettings).toMatchObject({
            DepthCount: expect.any(Number),
            DrainVolume: expect.any(Number),
            DrainMinStopSeconds: expect.any(Number),
            FillVolume: expect.any(Number),
            FillMinStopSeconds: expect.any(Number),
            MaxMessageTimeSeconds: expect.any(Number),
            UseRideDetector: expect.any(Boolean),
            AllowFillsInRides: expect.any(Boolean),
            DrainNorm: expect.any(Number),
        })
    })
})