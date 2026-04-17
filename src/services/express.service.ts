import express, { Express, Router } from "express";
import rateLimit from "express-rate-limit";
import fs from "fs";
import bodyParser from "body-parser";
import cors from "cors";
import { fileURLToPath, pathToFileURL } from "url";
import { dirname } from "path";

import logger from "./logger.service";

import globalErrorHandler from "../middlewares/errorHandler.middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const routesDir = process.env.NODE_ENV === "production" ? __dirname + "/../../dist/routes/" : __dirname + "/../routes/";
const routeFiles = fs.readdirSync(routesDir);

let server: Express;
const routes: Router[] = [];

const limiter = rateLimit({
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

interface ExpressService {
  init: () => Promise<void>;
}

const expressService: ExpressService = {
  init: async (): Promise<void> => {
    try {
      // Loading routes automatically
      for (const file of routeFiles) {
        // Absolute path to convert to ESIM-compatible URL
        const routePath = pathToFileURL(routesDir + file).href;
        const route = await import(routePath);
        const routeName = Object.keys(route)[0];
        routes.push(route[routeName]);
      }

      server = express();
      server.use(bodyParser.json());
      server.use((cors as (options: cors.CorsOptions) => express.RequestHandler)(corsOptions));
      server.options("*", (cors as (options: cors.CorsOptions) => express.RequestHandler)(corsOptions));

      routes.forEach((route) => {
        server.use(route);
      });

      server.use(limiter);

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
