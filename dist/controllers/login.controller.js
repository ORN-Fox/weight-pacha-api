import { StatusCodes } from "http-status-codes";
import * as Yup from "yup";
import { BadRequestError, UnauthorizedError, ValidationError, } from "../utils/ApiError.js";
import jwtService from "../services/jwt.service.js";
import User from "../models/User.js";
const loginController = {
    login: (async (req, res, next) => {
        try {
            const schema = Yup.object().shape({
                email: Yup.string().email().required(),
                password: Yup.string().required(),
            });
            if (!(await schema.isValid(req.body)))
                throw new ValidationError();
            const { email, password } = req.body;
            // @ts-ignore
            const user = await User.findOne({ where: { email } });
            if (!user)
                throw new BadRequestError();
            if (!(await user.checkPassword(password)))
                throw new UnauthorizedError();
            const token = jwtService.jwtSign({ id: user.id });
            return res.status(StatusCodes.OK).json({ user, token });
        }
        catch (error) {
            next(error);
        }
    }),
    logout: (async (req, res, next) => {
        try {
            const token = jwtService.jwtGetToken(req);
            jwtService.jwtBlacklistToken(token);
            res.status(StatusCodes.OK).json({ msg: "Authorized" });
        }
        catch (error) {
            next(error);
        }
    }),
};
export default loginController;
