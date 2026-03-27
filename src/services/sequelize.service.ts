import { Sequelize } from "sequelize";

import logger from "./logger.service";

import databaseConfig from "@config/database.js";

import Address from "@models/Address.js";
import CalendarEvent from "@models/CalendarEvent.js";
import Invoice from "@models/Invoice.js";
import Measure from "@models/Measure.js";
import Note from "@models/Note.js";
import PetRecord from "@models/PetRecord.js";
import User from "@models/User.js";
import UserAddress from "@models/UserAddress.js";
import UserPetRecord from "@models/UserPetRecord.js";
import UserSettings from "@models/UserSettings.js";
import Vaccine from "@models/Vaccine.js";
import Wormable from "@models/Wormable.js";

let connection: Sequelize;

interface SequelizeService {
  init: () => Promise<void>;
  getConnection: () => Sequelize | null;
}

const sequelizeService: SequelizeService = {
  init: async (): Promise<void> => {
    try {
      const environment = process.env.NODE_ENV ?? "development";
      const config = databaseConfig[environment as keyof typeof databaseConfig];

      connection = new Sequelize(config);

      // Loading models (reminder : keep order for support relationship correctly)
      const models = {
        User,
        Address,
        PetRecord,
        UserPetRecord,
        UserAddress,
        UserSettings,
        CalendarEvent,
        Invoice,
        Measure,
        Note,
        Vaccine,
        Wormable,
      };

      Object.values(models).forEach((model) => {
        if (typeof model.init === "function") {
          model.init(connection);
        }
      });

      Object.values(models).forEach((model) => {
        if (typeof model.associate === "function") {
          model.associate(models);
        }
      });

      await connection.authenticate();
      logger.info("[SEQUELIZE] Database connection authenticated");
      logger.info("[SEQUELIZE] Database service initialized");
    } catch (error) {
      logger.error("[SEQUELIZE] Error during database service initialization");
      throw error;
    }
  },
  getConnection: (): Sequelize | null => connection,
};

export default sequelizeService;
