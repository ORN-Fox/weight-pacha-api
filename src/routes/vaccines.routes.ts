import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import { petRecordMiddleware } from "../middlewares/petRecord.middleware.js";

import vaccineController from "../controllers/vaccine.controller.js";

const vaccineRoutes = Router();

vaccineRoutes.get("/pet-record/:petRecordId/vaccines", authMiddleware, petRecordMiddleware, vaccineController.findAllWithPetRecordId);
vaccineRoutes.post("/pet-record/:petRecordId/vaccine", authMiddleware, petRecordMiddleware, vaccineController.create);
vaccineRoutes.put("/pet-record/:petRecordId/vaccine/:vaccineId", authMiddleware, petRecordMiddleware, vaccineController.update);
vaccineRoutes.delete("/pet-record/:petRecordId/vaccine/:vaccineId", authMiddleware, petRecordMiddleware, vaccineController.delete);

export { vaccineRoutes };
