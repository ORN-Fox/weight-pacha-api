import { Request, Response, NextFunction, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import * as Yup from "yup";

import { ValidationError } from "@utils/ApiError.js";

import Vaccine from "@models/Vaccine.js";

interface CreateVaccineRequestBody {
  name: string;
  injectionDate: Date;
  reminderDate: Date;
  description: string;
  petRecordId: string;
}

interface UpdateVaccineRequestBody extends CreateVaccineRequestBody {
  id: string;
  createdAt: Date;
}

const vaccineController = {
  findAllWithPetRecordId: (async (req: Request<{ petRecordId: string }>, res: Response, next: NextFunction) => {
    try {
      const { petRecordId } = req.params;
      // @ts-ignore
      const vaccines = await Vaccine.findAll({
        where: { petRecordId: petRecordId },
        order: [["injectionDate", "DESC"]],
      });

      return res.status(StatusCodes.OK).json(vaccines);
    } catch (error) {
      next(error);
    }
  }) as unknown as RequestHandler,

  create: (async (req: Request<{ petRecordId: string }, object, CreateVaccineRequestBody>, res: Response, next: NextFunction) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        injectionDate: Yup.date().required(),
        reminderDate: Yup.date().nullable(),
        description: Yup.string().nullable(),
        petRecordId: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) throw new ValidationError();

      // @ts-ignore
      const vaccine = await Vaccine.create(req.body);

      return res.status(StatusCodes.OK).json(vaccine);
    } catch (error) {
      next(error);
    }
  }) as RequestHandler<{ petRecordId: string }, object, CreateVaccineRequestBody>,

  update: (async (req: Request<{ petRecordId: string; vaccineId: string }, object, UpdateVaccineRequestBody>, res: Response, next: NextFunction) => {
    try {
      const schema = Yup.object().shape({
        id: Yup.string().uuid().required(),
        name: Yup.string().required(),
        injectionDate: Yup.date().required(),
        reminderDate: Yup.date().nullable(),
        description: Yup.string().nullable(),
        petRecordId: Yup.string().required(),
        createdAt: Yup.date().required(),
        updatedAt: Yup.date(),
      });

      if (!(await schema.isValid(req.body))) throw new ValidationError();

      // @ts-ignore
      await Vaccine.update(req.body, { where: { id: req.params.vaccineId } });

      // @ts-ignore
      const updatedVaccine = await Vaccine.findByPk(req.params.vaccineId);

      return res.status(StatusCodes.OK).json(updatedVaccine);
    } catch (error) {
      next(error);
    }
  }) as RequestHandler<{ petRecordId: string; vaccineId: string }, object, UpdateVaccineRequestBody>,

  delete: (async (req: Request<{ petRecordId: string; vaccineId: string }>, res: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      await Vaccine.destroy({ where: { id: req.params.vaccineId } });

      return res.status(StatusCodes.OK).json({ msg: "Deleted" });
    } catch (error) {
      next(error);
    }
  }) as RequestHandler<{ petRecordId: string; vaccineId: string }>,
};

export default vaccineController;
