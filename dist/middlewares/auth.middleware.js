import jwtService from "../services/jwt.service.js";
import { BadTokenError } from "../utils/ApiError.js";
const authMiddleware = async (req, _res, next) => {
    try {
        if (process.env.SERVER_JWT === "false")
            return next();
        const token = jwtService.jwtGetToken(req);
        const decoded = jwtService.jwtVerify(token);
        // @ts-ignore
        req.userId = decoded.id;
        return next();
    }
    catch (error) {
        next(new BadTokenError());
    }
};
export default authMiddleware;
