import { Sequelize } from "sequelize";
import databaseConfig from "../config/database.js";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const modelFiles = fs
  .readdirSync(__dirname + "/../models/")
  .filter((file) => file.endsWith(".js"));

let connection: Sequelize | null = null;

interface SequelizeService {
  init: () => Promise<void>;
  getConnection: () => Sequelize | null;
}

const sequelizeService: SequelizeService = {
  init: async (): Promise<void> => {
    try {
      const environment = process.env.NODE_ENV || "development";
      const config = databaseConfig[environment as keyof typeof databaseConfig];

      connection = new Sequelize(config);

      // Loading models automatically
      for (const file of modelFiles) {
        const model = await import(`../models/${file}`);
        model.default.init(connection);
      }

      // Associate models
      for (const file of modelFiles) {
        const model = await import(`../models/${file}`);
        if (model.default.associate) {
          model.default.associate(connection.models);
        }
      }

      await connection.authenticate();
      console.log("[SEQUELIZE] Database connection authenticated");
      console.log("[SEQUELIZE] Database service initialized");
    } catch (error) {
      console.log("[SEQUELIZE] Error during database service initialization");
      throw error;
    }
  },
  getConnection: (): Sequelize | null => connection,
};

export default sequelizeService;
