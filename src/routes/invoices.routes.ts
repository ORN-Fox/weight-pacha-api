import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import { petRecordMiddleware } from "../middlewares/petRecord.middleware.js";

import invoiceController from "../controllers/invoice.controller.js";

const invoiceRoutes = Router();

invoiceRoutes.get("/pet-record/:petRecordId/invoices", authMiddleware, petRecordMiddleware, invoiceController.findAllWithPetRecordId);
invoiceRoutes.post("/pet-record/:petRecordId/invoice", authMiddleware, petRecordMiddleware, invoiceController.create);
invoiceRoutes.put("/pet-record/:petRecordId/invoice/:invoiceId", authMiddleware, petRecordMiddleware, invoiceController.update);
invoiceRoutes.delete("/pet-record/:petRecordId/invoice/:invoiceId", authMiddleware, petRecordMiddleware, invoiceController.delete);

export { invoiceRoutes };
