import mongoose, { Schema } from 'mongoose';
import IPlantInfo from '../interfaces/PlantInfo';

const PlantInfoSchema: Schema = new Schema({
    plantNumber: { type: Number, required: true },
    year: { type: Number, required: true },
    plantState: { type: String, required: true },
    plantName: { type: String, required: true },
    plantCode: { type: Number, required: true },
    plantOperationName: { type: String, required: true },
    operationCode: { type: Number, required: true },
    utilityName: { type: String, required: true },
    utilityId: { type: Number, required: true },
    sector: { type: String, required: true },
    balancingAuthorityName: { type: String, required: true },
    balancingAuthorityCode: { type: String, required: true },
    NERCRegionCode: { type: String, required: true },
    subRegion: { type: String, required: true },
    subRegionName: { type: String, required: true },
    fipsStateCode: { type: Number, required: true },
    fipsCountyCode: { type: Number, required: true },
    countyName: { type: String, required: true },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    numberOfUnits: { type: Number, required: true },
    numberOfGenerators: { type: Number, required: true },
    plantPrimaryFuel: { type: String, required: true },
    plantPrimaryFuelCategory: { type: String, required: true }
},
    {
        timestamps: true
    }
);

export default mongoose.model<IPlantInfo>("PlantInfo", PlantInfoSchema);