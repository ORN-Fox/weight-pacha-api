import { Request, Response, NextFunction, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import * as Yup from "yup";

import {
  BadRequestError,
  UnauthorizedError,
  ValidationError,
} from "../utils/ApiError.js";

import jwtService from "../services/jwt.service.js";
import User from "../models/User.js";

interface LoginRequestBody {
  email: string;
  password: string;
}

const loginController = {
  login: (async (req: Request<{}, {}, LoginRequestBody>, res: Response, next: NextFunction) => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) throw new ValidationError();

      const { email, password } = req.body;

      // @ts-ignore
      const user = await User.findOne({ where: { email } });

      if (!user) throw new BadRequestError();

      if (!(await user.checkPassword(password))) throw new UnauthorizedError();

      const token = jwtService.jwtSign({ id: user.id });

      return res.status(StatusCodes.OK).json({ user, token });
    } catch (error) {
      next(error);
    }
  }) as RequestHandler,

  logout: (async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = jwtService.jwtGetToken(req);
      jwtService.jwtBlacklistToken(token);

      res.status(StatusCodes.OK).json({ msg: "Authorized" });
    } catch (error) {
      next(error);
    }
  }) as RequestHandler,
};

export default loginController;
