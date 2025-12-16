import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";

import userController from "../controllers/user.controller.js";

const userRoutes = Router();

// userRoutes.get("/users", authMiddleware, userController.findAll);
userRoutes.get("/user/:id", authMiddleware, userController.find);
userRoutes.post("/user", authMiddleware, userController.add);
userRoutes.post("/user/address", authMiddleware, userController.addAddress);
userRoutes.put("/user", authMiddleware, userController.update);
userRoutes.delete("/user/:id", authMiddleware, userController.delete);

export { userRoutes };
