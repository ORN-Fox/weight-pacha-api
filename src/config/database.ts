import dotenv from "dotenv";
import type { Options } from 'sequelize';

dotenv.config();

const DEFAULT_BD_PORT = "3306";

interface DatabaseConfig {
  development: Options;
  test: Options;
  production: Options;
}

const databaseConfig: DatabaseConfig = {
  development: {
    dialect: process.env.DB_DIALECT as any,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || DEFAULT_BD_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialectOptions: {
      bigNumberStrings: true,
    },
    define: {
      timestamps: true,
    },
  },
  test: {
    dialect: process.env.DB_DIALECT as any,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || DEFAULT_BD_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    define: {
      timestamps: true,
    },
  },
  production: {
    dialect: process.env.DB_DIALECT as any,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || DEFAULT_BD_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialectOptions: {
      bigNumberStrings: true,
    },
    define: {
      timestamps: true,
    },
  },
};

export default databaseConfig;
