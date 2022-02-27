"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const powerinfo_controller_1 = __importDefault(require("../controller/powerinfo-controller"));
const router = express_1.default.Router();
router.get('/power/generation/info', powerinfo_controller_1.default.fetchAllStatePowerInfo);
router.get('/power/generation/:topN', powerinfo_controller_1.default.findTopNPowerGenerationStates);
router.post('/power/generation/info', powerinfo_controller_1.default.addStatePowerInfo);
router.get('/power/plant/info', powerinfo_controller_1.default.fetchAllPowerPlantsInfo);
router.get('/power/plant/:state', powerinfo_controller_1.default.findPowerPlantsByState);
router.post('/power/plant/info', powerinfo_controller_1.default.addStatePowerInfo);
module.exports = router;
//# sourceMappingURL=powerplant-info-route.js.map