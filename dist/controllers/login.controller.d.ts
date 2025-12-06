import { RequestHandler } from "express";
declare const loginController: {
    login: RequestHandler;
    logout: RequestHandler;
};
export default loginController;
