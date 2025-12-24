import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import { petRecordMiddleware } from "../middlewares/petRecord.middleware.js";

import measureController from "../controllers/measure.controller.js";

const measureRoutes = Router();

measureRoutes.get("/pet-record/:petRecordId/measures", authMiddleware, petRecordMiddleware, measureController.findAllWithPetRecordId);
measureRoutes.post("/pet-record/:petRecordId/measure", authMiddleware, petRecordMiddleware, measureController.create);
measureRoutes.put("/pet-record/:petRecordId/measure/:measureId", authMiddleware, petRecordMiddleware, measureController.update);
measureRoutes.delete("/pet-record/:petRecordId/measure/:measureId", authMiddleware, petRecordMiddleware, measureController.delete);

export { measureRoutes };
