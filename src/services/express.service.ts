import express, { Express, Router } from "express";
import fs from "fs";
import bodyParser from "body-parser";
import cors from "cors";
import globalErrorHandler from "../middlewares/errorHandler.middleware.js";
import { fileURLToPath, pathToFileURL } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/*
  body-parser: Parse incoming request bodies in a middleware before your handlers, 
  available under the req.body property.
*/

const routesDir = process.env.NODE_ENV === "production"
  ? __dirname + "/../../dist/routes/"
  : __dirname + "/../routes/";
const routeFiles = fs
  .readdirSync(routesDir);

let server: Express;
let routes: Router[] = [];

const corsOptions = {
    origin: '*', // TODO replace by valid origin for restrict access (security)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type, Authorization, Content-Length',
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
      server.options('*', (cors as (options: cors.CorsOptions) => express.RequestHandler)(corsOptions));

      routes.forEach((route) => {
        server.use(route);
      });

      server.use(globalErrorHandler);

      const port = process.env.SERVER_PORT || 3000;
      server.listen(port, () => {
        console.log(`[EXPRESS] Server listening on port ${port}`);
      });

      console.log("[EXPRESS] Express initialized");
    } catch (error) {
      console.log("[EXPRESS] Error during express service initialization");
      throw error;
    }
  },
};

export default expressService;
