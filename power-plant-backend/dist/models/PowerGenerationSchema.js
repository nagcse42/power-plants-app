"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const PowerGenerationSchema = new mongoose_1.Schema({
    year: { type: Number, required: true },
    state: { type: String, required: true },
    stateCode: { type: String, required: true },
    namePlateCapacity: { type: Number, required: true },
    annualHeatFromCombustion: { type: Number, required: true },
    ozoneSeasonHeatFromCombustion: { type: Number, required: true },
    totalAnnaulHeat: { type: Number, required: true },
    totalOzoneSeasonHeat: { type: Number, required: true },
    annualNetGnrtn: { type: Number, required: true },
    ozoneSeasonNetGnrtn: { type: Number, required: true },
    // Annual generation
    annualCoalNetGnrtn: { type: Number, required: true },
    annualOilNetGnrtn: { type: Number, required: true },
    annualGasNetGnrtn: { type: Number, required: true },
    annualNuclearNetGnrtn: { type: Number, required: true },
    annualHydroNetGnrtn: { type: Number, required: true },
    annualBiomasNetGnrtn: { type: Number, required: true },
    annualWindNetGnrtn: { type: Number, required: true },
    annualSolarNetGnrtn: { type: Number, required: true },
    annualGeoThermalNetGnrtn: { type: Number, required: true },
    annualOtherFosilNetGnrtn: { type: Number, required: true },
    annualUnknownOrPurchasedFuelNetGnrtn: { type: Number, required: true },
    // Total generations
    totalNonrenewablesGnrtn: { type: Number, required: true },
    totalRenewablesGnrtn: { type: Number, required: true },
    totalNonHydroRenewablesGnrtn: { type: Number, required: true },
    // Total combustion
    totalCombustionNetGnrtn: { type: Number, required: true },
    totalNonCombustionNetGnrtn: { type: Number, required: true },
    // Generation percentage
    coalGenerationPrcntg: { type: Number, required: true },
    oilGenerationPrcntg: { type: Number, required: true },
    gasGenerationPrcntg: { type: Number, required: true },
    nuclearGenerationPrcntg: { type: Number, required: true },
    hydroGenerationPrcntg: { type: Number, required: true },
    biomassGenerationPrcntg: { type: Number, required: true },
    windGenerationPrcntg: { type: Number, required: true },
    solarGenerationPrcntg: { type: Number, required: true },
    geoThermalGenerationPrcntg: { type: Number, required: true },
    otherFossilGenerationPrcntg: { type: Number, required: true },
    unknownOrPurchasedFuelGenerationPrcntg: { type: Number, required: true },
    // Total Generation percentage
    totalNonrenewablesGenerationPrcntg: { type: Number, required: true },
    totalRenewablesGenerationPrcntg: { type: Number, required: true },
    totalNonHydroRenewablesGenerationPrcntg: { type: Number, required: true },
    // Total combustion percentage
    totalCombustionNetGenerationPrcntg: { type: Number, required: true },
    totalNonCombustionNetGenerationPrcntg: { type: Number, required: true },
    // Annual Non baseload generation
    annualCoalNonBaseLoadGnrtn: { type: Number, required: true },
    annualOilNonBaseLoadGnrtn: { type: Number, required: true },
    annualGasNonBaseLoadGnrtn: { type: Number, required: true },
    annualNuclearNonBaseLoadGnrtn: { type: Number, required: true },
    annualHydroNonBaseLoadGnrtn: { type: Number, required: true },
    annualBiomasNonBaseLoadGnrtn: { type: Number, required: true },
    annualWindNonBaseLoadGnrtn: { type: Number, required: true },
    annualSolarNonBaseLoadGnrtn: { type: Number, required: true },
    annualGeothermallNonBaseLoadGnrtn: { type: Number, required: true },
    annualOtherFosilNonBaseLoadGnrtn: { type: Number, required: true },
    annualUnknownOrPurchasedFuelNonBaseLoadGnrtn: { type: Number, required: true },
    // Annual Non baseload Percentage
    annualCoalNonBaseLoadPrcntg: { type: Number, required: true },
    annualOilNonBaseLoadPrcntg: { type: Number, required: true },
    annualGasNonBaseLoadPrcntg: { type: Number, required: true },
    annualNuclearNonBaseLoadPrcntg: { type: Number, required: true },
    annualHydroNonBaseLoadPrcntg: { type: Number, required: true },
    annualBiomasNonBaseLoadPrcntg: { type: Number, required: true },
    annualWindNonBaseLoadPrcntg: { type: Number, required: true },
    annualSolarNonBaseLoadPrcntg: { type: Number, required: true },
    annualGeothermallNonBaseLoadPrcntg: { type: Number, required: true },
    annualOtherFosilNonBaseLoadPrcntg: { type: Number, required: true },
    annualUnknownOrPurchasedFuelNonBaseLoadPrcntg: { type: Number, required: true }, // STNBOPPR
}, {
    timestamps: true
});
exports.default = mongoose_2.default.model('PowerGenerationSchema', PowerGenerationSchema);
//# sourceMappingURL=PowerGenerationSchema.js.map