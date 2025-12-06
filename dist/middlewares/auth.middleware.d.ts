import { RequestHandler } from "express";
declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}
declare const authMiddleware: RequestHandler;
export default authMiddleware;
