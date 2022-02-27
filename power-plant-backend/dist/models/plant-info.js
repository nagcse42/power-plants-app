"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const PlantInfoSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model("PlantInfo", PlantInfoSchema);
//# sourceMappingURL=plant-info.js.map