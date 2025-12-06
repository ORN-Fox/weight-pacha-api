import { StatusCodes } from "http-status-codes";
import * as Yup from "yup";
import { BadRequestError, UnauthorizedError, ValidationError, } from "../utils/ApiError.js";
import Address from "../models/Address.js";
import User from "../models/User.js";
//Yup is a JavaScript schema builder for value parsing and validation.
const userController = {
    add: (async (req, res, next) => {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                email: Yup.string().email().required(),
                password: Yup.string().required().min(6),
            });
            if (!(await schema.isValid(req.body)))
                throw new ValidationError();
            const { email } = req.body;
            // @ts-ignore
            const userExists = await User.findOne({
                where: { email },
            });
            if (userExists)
                throw new BadRequestError();
            // @ts-ignore
            const user = await User.create(req.body);
            return res.status(StatusCodes.OK).json(user);
        }
        catch (error) {
            next(error);
        }
    }),
    addAddress: (async (req, res, next) => {
        try {
            const { body, userId } = req;
            const schema = Yup.object().shape({
                city: Yup.string().required(),
                state: Yup.string().required(),
                neighborhood: Yup.string().required(),
                country: Yup.string().required(),
            });
            if (!(await schema.isValid(body.address)))
                throw new ValidationError();
            // @ts-ignore
            const user = await User.findByPk(userId);
            if (!user)
                throw new BadRequestError();
            // @ts-ignore
            let address = await Address.findOne({
                where: { ...body.address },
            });
            if (!address) {
                // @ts-ignore
                address = await Address.create(body.address);
            }
            // @ts-ignore
            await user.addAddress(address);
            return res.status(StatusCodes.OK).json(user);
        }
        catch (error) {
            next(error);
        }
    }),
    get: (async (req, res, next) => {
        try {
            // @ts-ignore
            const users = await User.findAll();
            return res.status(StatusCodes.OK).json(users);
        }
        catch (error) {
            next(error);
        }
    }),
    find: (async (req, res, next) => {
        try {
            const { id } = req.params;
            // @ts-ignore
            const user = await User.findByPk(id);
            if (!user)
                throw new BadRequestError();
            return res.status(StatusCodes.OK).json(user);
        }
        catch (error) {
            next(error);
        }
    }),
    update: (async (req, res, next) => {
        try {
            const schema = Yup.object().shape({
                name: Yup.string(),
                email: Yup.string().email(),
                oldPassword: Yup.string().min(6),
                password: Yup.string()
                    .min(6)
                    .when("oldPassword", (oldPassword, field) => {
                    if (oldPassword) {
                        return field.required();
                    }
                    else {
                        return field;
                    }
                }),
                confirmPassword: Yup.string().when("password", (password, field) => {
                    if (password) {
                        return field.required().oneOf([Yup.ref("password")]);
                    }
                    else {
                        return field;
                    }
                }),
            });
            if (!(await schema.isValid(req.body)))
                throw new ValidationError();
            const { email, oldPassword } = req.body;
            // @ts-ignore
            const user = await User.findByPk(req.userId);
            if (!user)
                throw new BadRequestError();
            if (email) {
                // @ts-ignore
                const userExists = await User.findOne({
                    where: { email },
                });
                if (userExists)
                    throw new BadRequestError();
            }
            if (oldPassword && !(await user.checkPassword(oldPassword)))
                throw new UnauthorizedError();
            const newUser = await user.update(req.body);
            return res.status(StatusCodes.OK).json(newUser);
        }
        catch (error) {
            next(error);
        }
    }),
    delete: (async (req, res, next) => {
        try {
            const { id } = req.params;
            // @ts-ignore
            const user = await User.findByPk(id);
            if (!user)
                throw new BadRequestError();
            await user.destroy();
            return res.status(StatusCodes.OK).json({ msg: "Deleted" });
        }
        catch (error) {
            next(error);
        }
    }),
};
export default userController;
