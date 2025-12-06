import { Options } from "sequelize";
interface DatabaseConfig {
    development: Options;
    test: Options;
    production: Options;
}
declare const databaseConfig: DatabaseConfig;
export default databaseConfig;
