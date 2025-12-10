import { Request, Response, NextFunction, RequestHandler } from "express";
import jwtService from "../services/jwt.service.js";
import { BadTokenError } from "../utils/ApiError.js";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const authMiddleware: RequestHandler = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (process.env.SERVER_JWT_ENABLED === "false") return next();

    const token = jwtService.jwtGetToken(req);
    const decoded = jwtService.jwtVerify(token);

    // @ts-ignore
    req.userId = decoded.id;

    return next();
  } catch (error) {
    next(new BadTokenError());
  }
};

export default authMiddleware;
