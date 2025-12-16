import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";

import addressController from "../controllers/address.controller.js";

const addressRoutes = Router();

addressRoutes.post("/address", authMiddleware, addressController.add);

export { addressRoutes };
