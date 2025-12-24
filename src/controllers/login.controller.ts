import { Request, Response, NextFunction, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import * as Yup from "yup";

import {
  BadRequestError,
  UnauthorizedError,
  ValidationError,
} from "../utils/ApiError.js";

import jwtService from "../services/jwt.service.js";

import PetRecord from "../models/PetRecord.js";
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
      const user = await User.findOne({
        where: { email: email },
        include: [
          {
            model: PetRecord,
            as: "PetRecords",
            attributes: {
              exclude: [
                'breed',
                'adoptedDate',
                'tagNumber',
                'description'
              ]
            }
          }
        ]
      });

      if (!user) throw new BadRequestError();

      if (!(await user.checkPassword(password))) throw new UnauthorizedError();

      const accessToken = jwtService.jwtSign({ id: user.id });
      const refreshToken = jwtService.jwtSignRefresh({ id: user.id, type: 'refresh' });

      return res.status(StatusCodes.OK).json({
        user,
        accessToken,
        refreshToken
      });
    } catch (error) {
      next(error);
    }
  }) as RequestHandler,

  logout: (async (req: Request, res: Response) => {
    try {
      const token = jwtService.jwtGetToken(req);
      jwtService.jwtBlacklistToken(token);

      res.status(StatusCodes.OK).json({ msg: "Authorized" });
    } catch (error) {
      // Sending always 200 for prevent refresh infinite loop
      res.status(StatusCodes.OK).json({ msg: "Authorized" });
    }
  }) as RequestHandler,
};

export default loginController;
