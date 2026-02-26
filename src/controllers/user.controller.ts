import { Request, Response, NextFunction, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import * as Yup from "yup";

import { UnauthorizedError, ValidationError } from "@utils/ApiError.js";

import { createUserSchema, updateUserSchema } from "@/schemas/user.schema";
import { updateUserSettingsSchema } from "@/schemas/userSettings.schema";

import Address from "@models/Address";
import PetRecord from "@models/PetRecord";
import User from "@models/User";
import UserSettings from "@models/UserSettings";

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
  favoritePetRecordId?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface RequestWithUserId<P = any, ResBody = any, ReqBody = any, ReqQuery = any> extends Request<P, ResBody, ReqBody, ReqQuery> {
  userId?: string;
}

//Yup is a JavaScript schema builder for value parsing and validation.

const userController = {
  add: (async (req: Request<object, object, CreateUserRequestBody>, res: Response, next: NextFunction) => {
    try {
      if (!(await createUserSchema.isValid(req.body))) throw new ValidationError();

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
      if (!(await updateUserSchema.isValid(req.body))) throw new ValidationError();

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
      if (!(await updateUserSettingsSchema.isValid(req.body))) throw new ValidationError();

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
