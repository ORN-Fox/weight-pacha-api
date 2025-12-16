import { Request, Response, NextFunction, RequestHandler } from "express";

import { BadTokenError } from "../utils/ApiError.js";

import jwtService from "../services/jwt.service.js";

const authMiddleware: RequestHandler = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    if (process.env.SERVER_JWT_ENABLED === "false") return next();

    const token = jwtService.jwtGetToken(req);
    const decoded = await jwtService.jwtVerify(token);

    if (!decoded?.id) {
      next(new BadTokenError());
    }

    req.userId = decoded.id;

    return next();
  } catch (error) {
    next(new BadTokenError());
  }
};

export default authMiddleware;
