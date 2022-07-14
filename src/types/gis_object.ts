import {ID} from "./index";

export type GisObject = {
    Id: ID
    Name: string
    UniqueId: string
    PhoneNumber: string
    AccountingUnitId: number
    CreateDate: string
    UpdateDate: string
    BatterySensor: string
    GsmSignalSensor: string
    CurrentProtocol: string
    ObjType: string
    IconId: number
    RideDetectorSettings: RideDetectorSettings
    DrainDetectorSettings: DrainDetectorSettings
    AccountingUnit?: AccountingUnit
}

export type RideDetectorSettings = {
    Type: number
    MinSatelliteCount: number
    MinSpeed: number
    MinParkingTimeSeconds: number
    MaxTrackPointsDistance: number
    MinRideTimeSeconds: number
    MinRideDistance: number
    GpsSensorName: number
    MaxMessageTimeSeconds: number
    GpsFailTresholdMinutes: number
}

export type DrainDetectorSettings = {
    DepthCount: number
    DrainVolume: number
    DrainMinStopSeconds: number
    FillVolume: number
    FillMinStopSeconds: number
    MaxMessageTimeSeconds: number
    UseRideDetector: number
    AllowFillsInRides: number
    DrainNorm: number
}

export type AccountingUnit = {
    Id: ID
    Name: string
    ShowHeaderCaption: boolean
    HeaderCaption: string
    CreateDate: string
    UpdateDate: string
}