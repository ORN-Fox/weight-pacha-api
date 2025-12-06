import { Router } from "express";

import addressController from "../controllers/address.controller.js";

const addressRoutes = Router();

addressRoutes.post("/address", addressController.add);

export { addressRoutes };
