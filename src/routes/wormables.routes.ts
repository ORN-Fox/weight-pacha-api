import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import { petRecordMiddleware } from "../middlewares/petRecord.middleware.js";

import wormableController from "../controllers/wormable.controller.js";

const wormableRoutes = Router();

wormableRoutes.get("/pet-record/:petRecordId/wormables", authMiddleware, petRecordMiddleware, wormableController.findAllWithPetRecordId);
wormableRoutes.post("/pet-record/:petRecordId/wormable", authMiddleware, petRecordMiddleware, wormableController.create);
wormableRoutes.put("/pet-record/:petRecordId/wormable/:wormableId", authMiddleware, petRecordMiddleware, wormableController.update);
wormableRoutes.delete("/pet-record/:petRecordId/wormable/:wormableId", authMiddleware, petRecordMiddleware, wormableController.delete);

export { wormableRoutes };
