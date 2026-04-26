import express, { Router } from "express";
import rateLimit from "express-rate-limit";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";

import logger from "./logger.service";

import globalErrorHandler from "../middlewares/errorHandler.middleware.js";

import { loginRoutes } from "@/routes/login.routes";
import { addressRoutes } from "@/routes/address.routes";
import { calendarEventRoutes } from "@/routes/calendarEvents.routes";
import { invoiceRoutes } from "@/routes/invoices.routes";
import { measureRoutes } from "@/routes/measure.routes";
import { noteRoutes } from "@routes/note.routes";
import { petRecordRoutes } from "@/routes/petRecord.routes";
import { userRoutes } from "@/routes/user.routes";
import { vaccineRoutes } from "@/routes/vaccines.routes";
import { wormableRoutes } from "@/routes/wormables.routes";

interface ExpressService {
  init: () => void;
}

const expressService: ExpressService = {
  init: (): void => {
    try {
      const rateLimiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
      });

      const corsOptions = {
        origin: "*", // TODO replace by valid origin for restrict access (security)
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        credentials: true,
        optionsSuccessStatus: 204,
        allowedHeaders: "Content-Type, Authorization, Content-Length",
      };

      const routes: Router[] = [
        loginRoutes,
        addressRoutes,
        calendarEventRoutes,
        invoiceRoutes,
        measureRoutes,
        noteRoutes,
        petRecordRoutes,
        userRoutes,
        vaccineRoutes,
        wormableRoutes,
      ];

      const server = express();
      server.use(bodyParser.json());
      server.use((cors as (options: cors.CorsOptions) => express.RequestHandler)(corsOptions));
      server.options("*", (cors as (options: cors.CorsOptions) => express.RequestHandler)(corsOptions));
      server.use(rateLimiter);
      server.use(helmet());

      routes.forEach((route) => {
        server.use("/api", route);
      });

      server.get("/", (_req, res) => {
        res.send("Hello World!");
      });

      server.use(globalErrorHandler);

      const port = process.env.SERVER_PORT ?? "3000";
      server.listen(port, () => {
        logger.info(`[EXPRESS] Server listening on port ${port}`);
      });

      logger.info("[EXPRESS] Express initialized");
    } catch (error) {
      console.error("[EXPRESS] Error during express service initialization");
      throw error;
    }
  },
};

export default expressService;
