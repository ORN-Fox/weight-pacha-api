import { Request, Response, NextFunction, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import * as Yup from "yup";

import { UnauthorizedError, ValidationError } from "@utils/ApiError.js";

import jwtService from "@services/jwt.service.js";

import PetRecord from "@models/PetRecord";
import User from "@models/User";
import UserSettings from "@models/UserSettings";

interface LoginRequestBody {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface RefreshRequestBody {
  refreshToken: string;
}

const loginController = {
  login: (async (req: Request<object, object, LoginRequestBody>, res: Response, next: NextFunction) => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
        rememberMe: Yup.boolean().default(false),
      });

      if (!(await schema.isValid(req.body))) throw new ValidationError();

      const { email, password, rememberMe } = req.body;

      // @ts-ignore
      const user = await User.findOne({
        where: { email: email },
        include: [
          {
            model: PetRecord,
            as: "PetRecords",
            attributes: {
              exclude: ["breed", "adoptedDate", "tagNumber", "description"],
            },
          },
          {
            model: UserSettings,
            as: "Settings",
          },
        ],
      });

      if (!(await user.checkPassword(password))) throw new UnauthorizedError();

      const accessToken = jwtService.jwtSign({ id: user.id });
      const refreshToken = jwtService.jwtSignRefresh({ id: user.id, type: "refresh" });

      return res.status(StatusCodes.OK).json({
        user,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  }) as RequestHandler,

  refresh: (async (req: Request<object, object, RefreshRequestBody>, res: Response) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        throw new UnauthorizedError();
      }

      const decoded: Record<string, unknown> = jwtService.jwtVerify(refreshToken);

      if (decoded.type !== "refresh") {
        throw new UnauthorizedError();
      }

      // @ts-ignore
      const user = await User.findByPk(decoded.id, {
        include: [
          { model: PetRecord, as: "PetRecords" },
          { model: UserSettings, as: "Settings" },
        ],
      });

      const accessToken = jwtService.jwtSign({ id: user.id });
      const newRefreshToken = jwtService.jwtSignRefresh({ id: user.id, type: "refresh" });

      return res.status(StatusCodes.OK).json({
        user,
        accessToken,
        refreshToken: newRefreshToken,
      });
    } catch {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid refresh token" });
    }
  }) as RequestHandler,

  logout: ((req: Request, res: Response) => {
    try {
      const token = jwtService.jwtGetToken(req);
      jwtService.jwtBlacklistToken(token);

      res.status(StatusCodes.OK).json({ msg: "Authorized" });
    } catch {
      // Sending always 200 for prevent refresh infinite loop
      res.status(StatusCodes.OK).json({ msg: "Authorized" });
    }
  }) as RequestHandler,
};

export default loginController;
