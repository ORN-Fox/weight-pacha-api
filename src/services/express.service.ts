import express, { Express, Router } from "express";
import fs from "fs";
import bodyParser from "body-parser";
import globalErrorHandler from "../middlewares/errorHandler.middleware.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/*
  body-parser: Parse incoming request bodies in a middleware before your handlers, 
  available under the req.body property.
*/

const routeFiles = fs
  .readdirSync(__dirname + "/../routes/")
  .filter((file) => file.endsWith(".js"));

let server: Express;
let routes: Router[] = [];

interface ExpressService {
  init: () => Promise<void>;
}

const expressService: ExpressService = {
  init: async (): Promise<void> => {
    try {
      // Loading routes automatically
      for (const file of routeFiles) {
        const route = await import(`../routes/${file}`);
        const routeName = Object.keys(route)[0];
        routes.push(route[routeName]);
      }

      server = express();
      server.use(bodyParser.json());
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
