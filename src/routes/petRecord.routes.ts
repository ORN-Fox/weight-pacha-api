import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";

import petRecordController from "../controllers/petRecord.controller.js";

const petRecordRoutes = Router();

petRecordRoutes.get("/pet-record/:id", authMiddleware, petRecordController.find);
petRecordRoutes.post("/pet-record/", authMiddleware, petRecordController.create);
petRecordRoutes.put("/pet-record/:id", authMiddleware, petRecordController.update);

export { petRecordRoutes };
