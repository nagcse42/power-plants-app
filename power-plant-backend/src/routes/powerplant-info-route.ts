import express from 'express';
import controller from '../controller/powerinfo-controller';

const router = express.Router();

router.get('/power/generation/info', controller.fetchAllStatePowerInfo);
router.get('/power/generation/:topN', controller.findTopNPowerGenerationStates);
router.post('/power/generation/info', controller.addStatePowerInfo);

router.get('/power/plant/info', controller.fetchAllPowerPlantsInfo);
router.get('/power/plant/:state', controller.findPowerPlantsByState);
router.post('/power/plant/info', controller.addStatePowerInfo);

export = router;