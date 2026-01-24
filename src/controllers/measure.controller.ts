import { Request, Response, NextFunction, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import * as Yup from "yup";

import { ValidationError } from "@/utils/ApiError.js";

import Measure from "@/models/Measure.js";

interface CreateMeasureRequestBody {
  date: string;
  weight: number;
  petRecordId: string;
}

interface UpdateMeasureRequestBody extends CreateMeasureRequestBody {
  id: string;
  createdAt: Date;
}

const measureController = {
  findAllWithPetRecordId: (async (req: Request<{ petRecordId: string }>, res: Response, next: NextFunction) => {
    try {
      const { petRecordId } = req.params;
      // @ts-ignore
      const measures = await Measure.findAll({
        where: { petRecordId: petRecordId },
        order: [["date", "ASC"]],
      });

      return res.status(StatusCodes.OK).json(measures);
    } catch (error) {
      next(error);
    }
  }) as unknown as RequestHandler,

  create: (async (req: Request<{ petRecordId: string }, object, CreateMeasureRequestBody>, res: Response, next: NextFunction) => {
    try {
      const schema = Yup.object().shape({
        date: Yup.string().required(),
        weight: Yup.number().required(),
        petRecordId: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) throw new ValidationError();

      // @ts-ignore
      const measure = await Measure.create(req.body);

      return res.status(StatusCodes.OK).json(measure);
    } catch (error) {
      next(error);
    }
  }) as RequestHandler<{ petRecordId: string }, object, CreateMeasureRequestBody>,

  update: (async (req: Request<{ petRecordId: string; measureId: string }, object, UpdateMeasureRequestBody>, res: Response, next: NextFunction) => {
    try {
      const schema = Yup.object().shape({
        id: Yup.string().uuid().required(),
        date: Yup.string().required(),
        weight: Yup.number().required(),
        petRecordId: Yup.string().required(),
        createdAt: Yup.date().required(),
        updatedAt: Yup.date(),
      });

      if (!(await schema.isValid(req.body))) throw new ValidationError();

      // @ts-ignore
      await Measure.update(req.body, { where: { id: req.params.measureId } });

      // @ts-ignore
      const updatedMeasure = await Measure.findByPk(req.params.measureId);

      return res.status(StatusCodes.OK).json(updatedMeasure);
    } catch (error) {
      next(error);
    }
  }) as RequestHandler<{ petRecordId: string; measureId: string }, object, UpdateMeasureRequestBody>,

  delete: (async (req: Request<{ petRecordId: string; measureId: string }>, res: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      await Measure.destroy({ where: { id: req.params.measureId } });

      return res.status(StatusCodes.OK).json({ msg: "Deleted" });
    } catch (error) {
      next(error);
    }
  }) as RequestHandler<{ petRecordId: string; measureId: string }>,
};

export default measureController;
