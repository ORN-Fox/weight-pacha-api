import dotenv from "dotenv";
import expressService from "./services/express.service.js";
import jwtService from "./services/jwt.service.js";
import sequelizeService from "./services/sequelize.service.js";

dotenv.config();

const services = [expressService, jwtService, sequelizeService];

await (async (): Promise<void> => {
  try {
    for (const service of services) {
      await service.init();
    }

    console.log("[SERVER] All services initialized successfully");
    console.log("[SERVER] API is ready and waiting for connections...");

    // Log process events to diagnose unexpected exits
    process.on("exit", (code) => {
      console.log(`[SERVER] Process exit event with code: ${code.toString()}`);
    });
    process.on("SIGINT", () => {
      console.log("[SERVER] Received SIGINT. Shutting down...");
      process.exit(0);
    });
    process.on("SIGTERM", () => {
      console.log("[SERVER] Received SIGTERM. Shutting down...");
      process.exit(0);
    });
    process.on("beforeExit", (code) => {
      console.log(`[SERVER] beforeExit event with code: ${code.toString()}`);
    });
  } catch (error) {
    console.error("[SERVER] Initialization error:", error);
    process.exit(1);
  }
})();

// Keep the process alive - ensure event loop stays active
process.stdin.resume();

// Handle unhandled errors
process.on("uncaughtException", (error) => {
  console.error("[SERVER] Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("[SERVER] Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});
