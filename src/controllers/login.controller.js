import { StatusCodes } from 'http-status-codes';
import * as Yup from "yup";

import {
  BadRequestError,
  UnauthorizedError,
  ValidationError,
} from "../utils/ApiError";

import JwtService from "../services/jwt.service";

import User from "../models/User";

let loginController = {
  login: async (req, res, next) => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) throw new ValidationError();

      let { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) throw new BadRequestError();

      if (!(await user.checkPassword(password))) throw new UnauthorizedError();

      const token = JwtService.jwtSign(user.id);

      return res.status(StatusCodes.OK).json({ user, token });
    } catch (error) {
      next(error);
    }
  },

  logout: async (req, res, next) => {
    try {
      JwtService.jwtBlacklistToken(JwtService.jwtGetToken(req));

      res.status(StatusCodes.OK).json({ msg: "Authorized" });
    } catch (error) {
      next(error);
    }
  },
};

export default loginController;
