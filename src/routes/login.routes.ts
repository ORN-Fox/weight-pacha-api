import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";

import loginController from "../controllers/login.controller.js";

const loginRoutes = Router();

loginRoutes.post("/login", loginController.login);
loginRoutes.post("/refresh", loginController.refresh);
loginRoutes.get("/logout", authMiddleware, loginController.logout);

export { loginRoutes };
