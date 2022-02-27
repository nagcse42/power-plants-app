"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const plant_info_1 = __importDefault(require("../models/plant-info"));
const state_power_info_1 = __importDefault(require("../models/state-power-info"));
const logging_1 = __importDefault(require("../config/logging"));
const NAMESPACE = 'PowerInfoControler';
const fetchAllStatePowerInfo = (req, res, next) => {
    state_power_info_1.default.find()
        .then((dataItems) => {
        const response = prepareResponse(dataItems);
        res.send(response);
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving StatePower.",
        });
    });
};
const findTopNPowerGenerationStates = (req, res, next) => {
    const params = req.params;
    const topN = +params.topN;
    logging_1.default.info(NAMESPACE, `findTopNPowerGenerationStates request: [${topN}]`);
    state_power_info_1.default.find().sort({ "annualNetGeneration": -1 }).limit(topN)
        .then((dataItems) => {
        const response = prepareResponse(dataItems);
        res.send(response);
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving top-N power generation states.",
        });
    });
};
const addStatePowerInfo = (req, res) => {
    const statePower = new state_power_info_1.default(req.body);
    statePower
        .save()
        .then((data) => {
        res.send(data);
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the statePower.",
        });
    });
};
const fetchAllPowerPlantsInfo = (req, res, next) => {
    const query = { lat: { "$exists": true, "$ne": 0 }, lon: { "$exists": true, "$ne": 0 } };
    plant_info_1.default.find(query)
        .then((data) => {
        res.send(data);
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving PlantInfo.",
        });
    });
};
const findPowerPlantsByState = (req, res, next) => {
    const params = req.params;
    const stateCode = params.state;
    logging_1.default.info(NAMESPACE, `findPowerPlantsByState request: [${stateCode}]`);
    const query = { lat: { "$exists": true, "$ne": 0 }, lon: { "$exists": true, "$ne": 0 }, plantState: stateCode };
    plant_info_1.default.find(query)
        .then((data) => {
        res.send(data);
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving PlantInfo by state.",
        });
    });
};
const addPlantInfo = (req, res) => {
    const plantInfo = new plant_info_1.default(req.body);
    plantInfo
        .save()
        .then((data) => {
        res.send(data);
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while adding the plantInfo.",
        });
    });
};
const prepareResponse = (dataItems) => {
    const responseData = [];
    for (const dataItem of dataItems) {
        const responseItem = {
            year: dataItem.year,
            state: dataItem.state,
            fipsCode: dataItem.fipsCode,
            namePlateCapacity: dataItem.namePlateCapacity,
            totalAnnualHeatInput: dataItem.totalAnnualHeatInput,
            totalOznSeasnHeatInput: dataItem.totalOznSeasnHeatInput,
            annualNetGeneration: dataItem.annualNetGeneration,
            z: dataItem.annualNetGeneration
        };
        responseData.push(responseItem);
    }
    return responseData;
};
exports.default = { fetchAllStatePowerInfo, findTopNPowerGenerationStates, addStatePowerInfo, fetchAllPowerPlantsInfo, findPowerPlantsByState, addPlantInfo };
//# sourceMappingURL=powerinfo-controller.js.map