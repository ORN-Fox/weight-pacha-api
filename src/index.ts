import dotenv from "dotenv";

import expressService from "./services/express.service.js";
import jwtService from "./services/jwt.service.js";
import logger from "./services/logger.service.js";
import sequelizeService from "./services/sequelize.service.js";

dotenv.config();

const services = [expressService, jwtService, sequelizeService];

await (async (): Promise<void> => {
  try {
    for (const service of services) {
      await service.init();
    }

    logger.info("[SERVER] All services initialized successfully");
    logger.info("[SERVER] API is ready and waiting for connections...");

    // Log process events to diagnose unexpected exits
    process.on("exit", (code) => {
      logger.info(`[SERVER] Process exit event with code: ${code.toString()}`);
    });
    process.on("SIGINT", () => {
      logger.info("[SERVER] Received SIGINT. Shutting down...");
      process.exit(0);
    });
    process.on("SIGTERM", () => {
      logger.info("[SERVER] Received SIGTERM. Shutting down...");
      process.exit(0);
    });
    process.on("beforeExit", (code) => {
      logger.info(`[SERVER] beforeExit event with code: ${code.toString()}`);
    });
  } catch (error) {
    logger.error("[SERVER] Initialization error:", error);
    process.exit(1);
  }
})();

// Keep the process alive - ensure event loop stays active
process.stdin.resume();

// Handle unhandled errors
process.on("uncaughtException", (error) => {
  logger.error("[SERVER] Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("[SERVER] Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});
