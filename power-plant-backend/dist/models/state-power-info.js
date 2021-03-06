"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const StatePowerSchema = new mongoose_1.default.Schema({
    year: Number,
    state: String,
    fipsCode: String,
    namePlateCapacity: Number,
    annualHeatInptFrmCombstn: Number,
    oznSeasnHeatInptFrmCombstn: Number,
    totalAnnualHeatInput: Number,
    totalOznSeasnHeatInput: Number,
    annualNetGeneration: Number,
    oznSeasonNetGeneration: Number,
    annualCoalNetGeneration: Number,
    annualOilNetGeneration: Number,
    annualGasNetGeneration: Number,
    annualNuclearNetGeneration: Number,
    annualHydroNetGeneration: Number,
    annualBiomassNetGeneration: Number,
    annualWindNetGeneration: Number,
    annualSolarNetGeneration: Number,
    annualGeothermalNetGeneration: Number,
    annualOtherFossilNetGeneration: Number,
    annualUnknwnOrPurchsdNetGeneration: Number,
    annualTotalNonRenewablesNetGeneration: Number,
    annualTotalRenewablesNetGeneration: Number,
    annualTotalNonHydroRenewablesNetGeneration: Number,
    annualTotalCombustnNetGeneration: Number,
    annualTotalNonCombustnNetGeneration: Number,
    coalGenerationPercentRsrcMix: Number,
    oilGenerationPercentRsrcMix: Number,
    gasGenerationPercentRsrcMix: Number,
    nuclearGenerationPercentRsrcMix: Number,
    hydroGenerationPercentRsrcMix: Number,
    biomassGenerationPercentRsrcMix: Number,
    windGenerationPercentRsrcMix: Number,
    solarGenerationPercentRsrcMix: Number,
    geothrmlGenerationPercentRsrcMix: Number,
    othrFossilGenerationPercentRsrcMix: Number,
    othrUnknwnPrchsdGenerationPercentRsrcMix: Number,
    totalNonRenewablesGenerationPercentRSMix: Number,
    totalRenewablesGenerationPercentRSMix: Number,
    totalNonHydroRenewablesGenerationPrcntRSMix: Number,
    totalCombustionGenerationPrcntRSMix: Number,
    totalNonCombustionGenerationPrcntRSmix: Number,
    annualNonBaseloadCoalNetGeneration: Number,
    annualNonBaseloadOilNetGeneration: Number,
    annualNonBaseloadGasNetGeneration: Number,
    annualNonBaseloadNuclearNetGeneration: Number,
    annualNonBaseloadHydroNetGeneration: Number,
    annualNonBaseloadBiomassNetGeneration: Number,
    annualNonBaseloadWindNetGeneration: Number,
    annualNonBaseloadSolarNetGeneration: Number,
    annualNonBaseloadGeoThermalNetGeneration: Number,
    annualNonBaseloadOtherFossilNetGeneration: Number,
    annualNonBaseloadOtherUnknwnOrPurchasedFuelNetGeneration: Number,
    nonBaseloadCoalGenerationPrcntRSMix: Number,
    nonBaseloadOilGenerationPercentRSMix: Number,
    nonBaseloadGasGenerationPercentRSMix: Number,
    nonBaseloadNuclearGenerationPercentRSMix: Number,
    nonBaseloadHydroGenerationPercentRSMix: Number,
    nonBaseloadBiomassGenerationPercentRSMix: Number,
    nonBaseloadWindGenerationPercentRSMix: Number,
    nonBaseloadSolarGenerationPercentRSMix: Number,
    nonBaseloadGeothermalGenerationPercentRSMix: Number,
    nonBaseloadOtherFossilGenerationPercentRSMix: Number,
    nonBaseloadOtherUnknwnOrPurchasedFuelGenerationPercentRSMix: Number
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model("StatePower", StatePowerSchema);
//# sourceMappingURL=state-power-info.js.map