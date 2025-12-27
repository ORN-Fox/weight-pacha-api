import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import { petRecordMiddleware } from "../middlewares/petRecord.middleware.js";

import calendarEventController from "../controllers/calendarEvent.controller.js";

const calendarEventRoutes = Router();

calendarEventRoutes.get("/pet-record/:petRecordId/calendar-events", authMiddleware, petRecordMiddleware, calendarEventController.findAllWithPetRecordId);
calendarEventRoutes.post("/pet-record/:petRecordId/calendar-event", authMiddleware, petRecordMiddleware, calendarEventController.create);
calendarEventRoutes.put("/pet-record/:petRecordId/calendar-event/:calendarEventId", authMiddleware, petRecordMiddleware, calendarEventController.update);
calendarEventRoutes.delete("/pet-record/:petRecordId/calendar-event/:calendarEventId/event-source/:eventSource", authMiddleware, petRecordMiddleware, calendarEventController.delete);

export { calendarEventRoutes };
