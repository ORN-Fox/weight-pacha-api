import { Request, Response, NextFunction, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

import { ValidationError } from "@utils/ApiError.js";

import { createCalendarEventSchema, updateCalendarEventSchema } from "@/schemas/calendarEvent.schema";

import Wormable from "@models/Wormable.js";

interface CreateWormableRequestBody {
  name: string;
  injectionDate: Date;
  reminderDate: Date;
  description: string;
  petRecordId: string;
}

interface UpdateWormableRequestBody extends CreateWormableRequestBody {
  id: string;
  createdAt: Date;
}

const wormableController = {
  findAllWithPetRecordId: (async (req: Request<{ petRecordId: string }>, res: Response, next: NextFunction) => {
    try {
      const { petRecordId } = req.params;
      // @ts-ignore
      const wormables = await Wormable.findAll({
        where: { petRecordId: petRecordId },
        order: [["injectionDate", "DESC"]],
      });

      return res.status(StatusCodes.OK).json(wormables);
    } catch (error) {
      next(error);
    }
  }) as unknown as RequestHandler,

  create: (async (req: Request<{ petRecordId: string }, object, CreateWormableRequestBody>, res: Response, next: NextFunction) => {
    try {
      if (!(await createCalendarEventSchema.isValid(req.body))) throw new ValidationError();

      // @ts-ignore
      const wormable = await Wormable.create(req.body);

      return res.status(StatusCodes.OK).json(wormable);
    } catch (error) {
      next(error);
    }
  }) as RequestHandler<{ petRecordId: string }, object, CreateWormableRequestBody>,

  update: (async (
    req: Request<{ petRecordId: string; wormableId: string }, object, UpdateWormableRequestBody>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!(await updateCalendarEventSchema.isValid(req.body))) throw new ValidationError();

      // @ts-ignore
      await Wormable.update(req.body, { where: { id: req.params.wormableId } });

      // @ts-ignore
      const updatedWormable = await Wormable.findByPk(req.params.wormableId);

      return res.status(StatusCodes.OK).json(updatedWormable);
    } catch (error) {
      next(error);
    }
  }) as RequestHandler<{ petRecordId: string; wormableId: string }, object, UpdateWormableRequestBody>,

  delete: (async (req: Request<{ petRecordId: string; wormableId: string }>, res: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      await Wormable.destroy({ where: { id: req.params.wormableId } });

      return res.status(StatusCodes.OK).json({ msg: "Deleted" });
    } catch (error) {
      next(error);
    }
  }) as RequestHandler<{ petRecordId: string; wormableId: string }>,
};

export default wormableController;
