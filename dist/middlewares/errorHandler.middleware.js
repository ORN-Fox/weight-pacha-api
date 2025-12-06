import { StatusCodes } from "http-status-codes";
import { IsApiError } from "../utils/ApiError.js";
const currentEnv = process.env.NODE_ENV || "development";
/**
 * Global error handler for all routes
 */
export default (err, _req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    if (IsApiError(err)) {
        const apiError = err;
        res.status(apiError.statusCode).send(apiError.message);
        return;
    }
    if (currentEnv === "development") {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
        return;
    }
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something went wrong");
};
