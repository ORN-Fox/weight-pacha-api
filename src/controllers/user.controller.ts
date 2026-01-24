import { Request, Response, NextFunction, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import * as Yup from "yup";

import { UnauthorizedError, ValidationError } from "@/utils/ApiError.js";

import Address from "@/models/Address";
import PetRecord from "@/models/PetRecord";
import User from "@/models/User";
import UserSettings from "@/models/UserSettings";

interface CreateUserRequestBody {
  name: string;
  email: string;
  password: string;
}

interface UpdateUserRequestBody {
  name?: string;
  email?: string;
  oldPassword?: string;
  password?: string;
  confirmPassword?: string;
}

interface AddAddressRequestBody {
  address: {
    city: string;
    state: string;
    neighborhood: string;
    country: string;
  };
}

interface UpdateUserSettingsRequestBody {
  id: string;
  locale?: string;
  theme?: string;
  calendarViewFormat?: string;
  itemsPerPage?: number;
  weightUnit?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface RequestWithUserId<P = any, ResBody = any, ReqBody = any, ReqQuery = any> extends Request<P, ResBody, ReqBody, ReqQuery> {
  userId?: string;
}

//Yup is a JavaScript schema builder for value parsing and validation.

const MIN_PASSWORD_LENGTH: number = parseInt(process.env.MIN_PASSWORD_LENGTH ?? "8");
const MAX_PASSWORD_LENGTH: number = parseInt(process.env.MAX_PASSWORD_LENGTH ?? "128");

const userController = {
  add: (async (req: Request<object, object, CreateUserRequestBody>, res: Response, next: NextFunction) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH),
      });

      if (!(await schema.isValid(req.body))) throw new ValidationError();

      const { email } = req.body;

      // @ts-ignore
      await User.findOne({
        where: { email },
      });

      // @ts-ignore
      const user = await User.create(req.body);

      return res.status(StatusCodes.OK).json(user);
    } catch (error) {
      next(error);
    }
  }) as RequestHandler,

  addAddress: (async (req: RequestWithUserId<object, object, AddAddressRequestBody>, res: Response, next: NextFunction) => {
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

      // @ts-ignore
      let address = await Address.findOne({
        where: { ...body.address },
      });

      // @ts-ignore
      address = await Address.create(body.address);

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
              exclude: ["breed", "adoptedDate", "tagNumber", "description"],
            },
          },
          {
            model: UserSettings,
            as: "Settings",
          },
        ],
      });

      return res.status(StatusCodes.OK).json(user);
    } catch (error) {
      next(error);
    }
  }) as unknown as RequestHandler,

  update: (async (req: RequestWithUserId<object, object, UpdateUserRequestBody>, res: Response, next: NextFunction) => {
    try {
      const schema = Yup.object().shape({
        id: Yup.string().uuid().required(),
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

      const { oldPassword } = req.body;

      // @ts-ignore
      const user = await User.findByPk(req.userId);

      if (oldPassword && !(await user.checkPassword(oldPassword))) throw new UnauthorizedError();

      const newUser = await user.update(req.body);

      return res.status(StatusCodes.OK).json(newUser);
    } catch (error) {
      next(error);
    }
  }) as RequestHandler,

  updateSettings: (async (req: RequestWithUserId<object, object, UpdateUserSettingsRequestBody>, res: Response, next: NextFunction) => {
    try {
      const schema = Yup.object().shape({
        id: Yup.string().uuid().required(),
        locale: Yup.string().required(),
        theme: Yup.string().required(),
        calendarViewFormat: Yup.string().required(),
        itemsPerPage: Yup.number().required(),
        weightUnit: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) throw new ValidationError();

      // @ts-ignore
      await UserSettings.update(req.body, { where: { userId: req.userId } });

      // @ts-ignore
      const updatedUserSettings = await UserSettings.findOne({ where: { userId: req.userId } });

      return res.status(StatusCodes.OK).json(updatedUserSettings);
    } catch (error) {
      next(error);
    }
  }) as RequestHandler,

  delete: (async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      // @ts-ignore
      const user = await User.findByPk(id);

      await user.destroy();

      return res.status(StatusCodes.OK).json({ msg: "Deleted" });
    } catch (error) {
      next(error);
    }
  }) as unknown as RequestHandler,
};

export default userController;
