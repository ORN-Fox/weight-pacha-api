import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import { petRecordMiddleware } from "../middlewares/petRecord.middleware.js";

import noteController from "../controllers/note.controller.js";

const noteRoutes = Router();

noteRoutes.get("/pet-record/:petRecordId/notes", authMiddleware, petRecordMiddleware, noteController.findAllWithPetRecordId);
noteRoutes.post("/pet-record/:petRecordId/note", authMiddleware, petRecordMiddleware, noteController.create);
noteRoutes.put("/pet-record/:petRecordId/note/:noteId", authMiddleware, petRecordMiddleware, noteController.update);
noteRoutes.delete("/pet-record/:petRecordId/note/:noteId", authMiddleware, petRecordMiddleware, noteController.delete);

export { noteRoutes as measureRoutes };
