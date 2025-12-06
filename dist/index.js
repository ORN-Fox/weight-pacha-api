import dotenv from "dotenv";
import expressService from "./services/express.service.js";
import jwtService from "./services/jwt.service.js";
import sequelizeService from "./services/sequelize.service.js";
dotenv.config();
const services = [expressService, jwtService, sequelizeService];
(async () => {
    try {
        for (const service of services) {
            await service.init();
        }
        console.log("Server initialized.");
        //PUT ADITIONAL CODE HERE.
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
})();
