import { Request, Response, NextFunction, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import * as Yup from "yup";

import { ValidationError } from "@/utils/ApiError.js";

import Address from "@/models/Address.js";

interface AddressRequestBody {
  city: string;
  state: string;
  neighborhood: string;
  country: string;
}

const addressController = {
  add: (async (req: Request<{}, {}, AddressRequestBody>, res: Response, next: NextFunction) => {
    try {
      const schema = Yup.object().shape({
        city: Yup.string().required(),
        state: Yup.string().required(),
        neighborhood: Yup.string().required(),
        country: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) throw new ValidationError();

      // @ts-ignore
      const addressExists = await Address.findOne({
        where: { ...req.body },
      });

      if (addressExists) throw new BadRequestError();

      // @ts-ignore
      const address = await Address.create(req.body);

      return res.status(StatusCodes.OK).json(address);
    } catch (error) {
      next(error);
    }
  }) as RequestHandler,
};

export default addressController;
