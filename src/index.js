import dotenv from "dotenv";
import expressService from "./services/express.service";
import jwtService from "./services/jwt.service";
import sequelizeService from "./services/sequelize.service";

dotenv.config();

const services = [expressService, jwtService, sequelizeService];

(async () => {
  try {
    for (const service of services) {
      await service.init();
    }
    console.log("Server initialized.");
    //PUT ADITIONAL CODE HERE.
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
