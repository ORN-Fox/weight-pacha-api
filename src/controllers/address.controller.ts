import { Request, Response, NextFunction, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

import { ValidationError } from "@utils/ApiError.js";

import { createAddressSchema } from "@/schemas/address.schema";

import Address from "@models/Address.js";

interface AddressRequestBody {
  city: string;
  state: string;
  neighborhood: string;
  country: string;
}

const addressController = {
  add: (async (req: Request<object, object, AddressRequestBody>, res: Response, next: NextFunction) => {
    try {
      if (!(await createAddressSchema.isValid(req.body))) throw new ValidationError();

      // @ts-ignore
      await Address.findOne({
        where: { ...req.body },
      });

      // @ts-ignore
      const address = await Address.create(req.body);

      return res.status(StatusCodes.OK).json(address);
    } catch (error) {
      next(error);
    }
  }) as RequestHandler,
};

export default addressController;
