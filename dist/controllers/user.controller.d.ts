import { RequestHandler } from "express";
declare const userController: {
    add: RequestHandler;
    addAddress: RequestHandler;
    get: RequestHandler;
    find: RequestHandler;
    update: RequestHandler;
    delete: RequestHandler;
};
export default userController;
