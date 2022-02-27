import { Document } from 'mongoose';

export default interface IPlantInfo extends Document {
    plantnumber: number,
    year: number,
    plantState: string,
    plantName: string,
    plantCode: number,
    plantOperationName: string,
    operationCode: number,
    utilityName: string,
    utilityId: number,
    sector: string,
    balancingAuthorityName: string,
    balancingAuthorityCode: string,
    NERCRegionCode: string,
    subRegion: string,
    subRegionName: string,
    fipsStateCode: number,
    fipsCountyCode: number,
    countyName: string,
    lat: number,
    lon: number,
    numberOfUnits: number,
    numberOfGenerators: number,
    plantPrimaryFuel: string,
    plantPrimaryFuelCategory: string
}