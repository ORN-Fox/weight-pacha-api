import { Request, Response, NextFunction } from "express";
/**
 * Global error handler for all routes
 */
declare const _default: (err: Error, _req: Request, res: Response, next: NextFunction) => void;
export default _default;
