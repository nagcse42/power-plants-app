import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import PlantInfo from "../models/plant-info";
import StatePower from "../models/state-power-info";
import logging from '../config/logging';

const NAMESPACE = 'PowerInfoControler';


const fetchAllStatePowerInfo = (req: Request, res: Response, next: NextFunction) => {
    StatePower.find()
        .then((dataItems: any) => {
            const response = prepareStatesPowerGenResponse(dataItems);
            res.send(response);
        })
        .catch((err: any) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving StatePower.",
            });
        });
};

const findTopNPowerGenerationStates = (req: Request, res: Response, next: NextFunction) => {
    const params = req.params;
    const topN: number = +params.topN;
    logging.info(NAMESPACE, `findTopNPowerGenerationStates request: [${topN}]`);

    StatePower.find().sort({ "annualNetGeneration": -1 }).limit(topN)
        .then((dataItems: any) => {
            const response = prepareStatesPowerGenResponse(dataItems);
            res.send(response);
        })
        .catch((err: any) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving top-N power generation states.",
            });
        });
};

const addStatePowerInfo = (req: any, res: any) => {
    const statePower = new StatePower(req.body);
    statePower
        .save()
        .then((data: any) => {
            res.send(data);
        })
        .catch((err: any) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the statePower.",
            });
        });
};

const fetchAllPowerPlantsInfo = (req: Request, res: Response, next: NextFunction) => {
    const query = { lat: { "$exists": true, "$ne": 0 }, lon: { "$exists": true, "$ne": 0 } };
    PlantInfo.find(query)
        .then((dataItems: any) => {
            const response = preparePowerPlantsResponse(dataItems);
            res.send(response);
        })
        .catch((err: any) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving PlantInfo.",
            });
        });
};

const findPowerPlantsByState = (req: Request, res: Response, next: NextFunction) => {
    const params = req.params;
    const stateCode: string = params.state;
    logging.info(NAMESPACE, `findPowerPlantsByState request: [${stateCode}]`);

    const query = { lat: { "$exists": true, "$ne": 0 }, lon: { "$exists": true, "$ne": 0 }, plantState: stateCode };
    PlantInfo.find(query)
        .then((dataItems: any) => {
            const response = preparePowerPlantsResponse(dataItems);
            res.send(response);
        })
        .catch((err: any) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving PlantInfo by state.",
            });
        });
};

const addPlantInfo = (req: any, res: any) => {
    const plantInfo = new PlantInfo(req.body);
    plantInfo
        .save()
        .then((data: any) => {
            res.send(data);
        })
        .catch((err: any) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while adding the plantInfo.",
            });
        });
};

const prepareStatesPowerGenResponse = (dataItems: any) => {
    const responseData: any[] = [];
    for (const dataItem of dataItems) {
        const responseItem: any = {
            year: dataItem.year,
            state: dataItem.state,
            fipsCode: dataItem.fipsCode,
            namePlateCapacity: dataItem.namePlateCapacity,
            totalAnnualHeatInput: dataItem.totalAnnualHeatInput,
            totalOznSeasnHeatInput: dataItem.totalOznSeasnHeatInput,
            annualNetGeneration: dataItem.annualNetGeneration,
            z: dataItem.annualNetGeneration
        }
        responseData.push(responseItem);
    }

    return responseData;
};

const preparePowerPlantsResponse = (dataItems: any) => {
    const responseData: any[] = [];
    for (const dataItem of dataItems) {
        const responseItem: any = {
            plantNumber: dataItem.plantNumber,
            year: dataItem.year,
            plantState: dataItem.plantState,
            plantName: dataItem.plantName,
            plantCode: dataItem.plantCode,
            lat: dataItem.lat,
            lon: dataItem.lon,
            plantPrimaryFuel: dataItem.plantPrimaryFuel,
            z: dataItem.fipsCountyCode
        }
        responseData.push(responseItem);
    }

    return responseData;
}

export default { fetchAllStatePowerInfo, findTopNPowerGenerationStates, addStatePowerInfo, fetchAllPowerPlantsInfo, findPowerPlantsByState, addPlantInfo };