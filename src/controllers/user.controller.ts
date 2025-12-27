import { Request, Response, NextFunction, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import * as Yup from "yup";

import {
  BadRequestError,
  UnauthorizedError,
  ValidationError,
} from "../utils/ApiError.js";

import Address from "@/models/Address";
import PetRecord from "@/models/PetRecord";
import User from "@/models/User";
import UserSettings from "@/models/UserSettings";

interface CreateUserRequestBody {
  name: string;
  email: string;
  password: string;
}

interface AddAddressRequestBody {
  address: {
    city: string;
    state: string;
    neighborhood: string;
    country: string;
  };
}

interface UpdateUserRequestBody {
  name?: string;
  email?: string;
  oldPassword?: string;
  password?: string;
  confirmPassword?: string;
}

interface RequestWithUserId<
  P = any,
  ResBody = any,
  ReqBody = any,
  ReqQuery = any
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  userId?: string;
}

//Yup is a JavaScript schema builder for value parsing and validation.

const MIN_PASSWORD_LENGTH: number = parseInt(process.env.MIN_PASSWORD_LENGTH || "8");
const MAX_PASSWORD_LENGTH: number = 128;

const userController = {

  add: (async (req: Request<{}, {}, CreateUserRequestBody>, res: Response, next: NextFunction) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH),
      });

      if (!(await schema.isValid(req.body))) throw new ValidationError();

      const { email } = req.body;

      // @ts-ignore
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) throw new BadRequestError();

      // @ts-ignore
      const user = await User.create(req.body as any);

      return res.status(StatusCodes.OK).json(user);
    } catch (error) {
      next(error);
    }
  }) as RequestHandler,

  addAddress: (async (
    req: RequestWithUserId<{}, {}, AddAddressRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { body, userId } = req;

      const schema = Yup.object().shape({
        city: Yup.string().required(),
        state: Yup.string().required(),
        neighborhood: Yup.string().required(),
        country: Yup.string().required(),
      });

      if (!(await schema.isValid(body.address))) throw new ValidationError();

      // @ts-ignore
      const user = await User.findByPk(userId);

      if (!user) throw new BadRequestError();

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
    } catch (error) {
      next(error);
    }
  }) as RequestHandler,

  find: (async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      // @ts-ignore
      const user = await User.findByPk(id, {
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
          },
          {
            model: UserSettings,
            as: "Settings"
          }
        ]
      });

      if (!user) throw new BadRequestError();

      return res.status(StatusCodes.OK).json(user);
    } catch (error) {
      next(error);
    }
  }) as unknown as RequestHandler,

  update: (async (
    req: RequestWithUserId<{}, {}, UpdateUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        oldPassword: Yup.string().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH),
        password: Yup.string()
          .min(MIN_PASSWORD_LENGTH)
          .max(MAX_PASSWORD_LENGTH)
          .when("oldPassword", (oldPassword, field) => {
            if (oldPassword) {
              return field.required();
            } else {
              return field;
            }
          }),
        confirmPassword: Yup.string().when("password", (password, field) => {
          if (password) {
            return field.required().oneOf([Yup.ref("password")]);
          } else {
            return field;
          }
        }),
      });

      if (!(await schema.isValid(req.body))) throw new ValidationError();

      const { email, oldPassword } = req.body;

      // @ts-ignore
      const user = await User.findByPk(req.userId);

      if (!user) throw new BadRequestError();

      if (email) {
        // @ts-ignore
        const userExists = await User.findOne({
          where: { email },
        });

        if (userExists) throw new BadRequestError();
      }

      if (oldPassword && !(await user.checkPassword(oldPassword)))
        throw new UnauthorizedError();

      const newUser = await user.update(req.body);

      return res.status(StatusCodes.OK).json(newUser);
    } catch (error) {
      next(error);
    }
  }) as RequestHandler,

  delete: (async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      // @ts-ignore
      const user = await User.findByPk(id);

      if (!user) throw new BadRequestError();

      await user.destroy();

      return res.status(StatusCodes.OK).json({ msg: "Deleted" });
    } catch (error) {
      next(error);
    }
  }) as unknown as RequestHandler,
  
};

export default userController;
