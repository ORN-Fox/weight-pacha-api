import { Request, Response, NextFunction, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import * as Yup from "yup";

import { ValidationError } from "@utils/ApiError.js";

import Note from "@models/Note.js";

interface CreateNoteRequestBody {
  name: string;
  description: string;
}

interface UpdateNoteRequestBody extends CreateNoteRequestBody {
  id: string;
  createdAt: Date;
}

const noteController = {
  findAllWithPetRecordId: (async (req: Request<{ petRecordId: string }>, res: Response, next: NextFunction) => {
    try {
      const { petRecordId } = req.params;

      // @ts-ignore
      const measures = await Note.findAll({
        where: { petRecordId: petRecordId },
      });

      return res.status(StatusCodes.OK).json(measures);
    } catch (error) {
      next(error);
    }
  }) as unknown as RequestHandler,

  create: (async (req: Request<object, object, CreateNoteRequestBody>, res: Response, next: NextFunction) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        description: Yup.string().nullable(),
        petRecordId: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) throw new ValidationError();

      // @ts-ignore
      const note = await Note.create(req.body);

      return res.status(StatusCodes.OK).json(note);
    } catch (error) {
      next(error);
    }
  }) as RequestHandler,

  update: (async (req: Request<{ noteId: string }, object, UpdateNoteRequestBody>, res: Response, next: NextFunction) => {
    try {
      const schema = Yup.object().shape({
        id: Yup.string().uuid().required(),
        name: Yup.string().required(),
        description: Yup.string().nullable(),
        petRecordId: Yup.string().required(),
        createdAt: Yup.date().required(),
      });

      if (!(await schema.isValid(req.body))) throw new ValidationError();

      // @ts-ignore
      await Note.update(req.body, { where: { id: req.params.noteId } });

      // @ts-ignore
      const updatedNote = await Note.findByPk(req.params.noteId);

      return res.status(StatusCodes.OK).json(updatedNote);
    } catch (error) {
      next(error);
    }
  }) as RequestHandler<{ noteId: string }, object, UpdateNoteRequestBody>,

  delete: (async (req: Request<{ noteId: string }>, res: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      await Note.destroy({ where: { id: req.params.noteId } });

      return res.status(StatusCodes.OK).json({ msg: "Deleted" });
    } catch (error) {
      next(error);
    }
  }) as RequestHandler<{ noteId: string }>,
};

export default noteController;
