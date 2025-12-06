import dotenv from "dotenv";
dotenv.config();
const databaseConfig = {
    development: {
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || "3306"),
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
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || "3306"),
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        define: {
            timestamps: true,
        },
    },
    production: {
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || "3306"),
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
