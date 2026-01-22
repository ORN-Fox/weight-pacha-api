import { Request, Response, NextFunction, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import * as Yup from "yup";

import { ValidationError } from "@/utils/ApiError.js";

import Wormable from "@/models/Wormable.js";

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
                order: [
                    ['injectionDate', 'DESC']
                ]
            });

            if (!wormables) throw new BadRequestError();

            return res.status(StatusCodes.OK).json(wormables);
        } catch (error) {
            next(error);
        }
    }) as unknown as RequestHandler,

    create: (async (
        req: Request<{ petRecordId: string }, {}, CreateWormableRequestBody>, 
        res: Response, 
        next: NextFunction
    ) => {
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
            const wormable = await Wormable.create(req.body as any);

            return res.status(StatusCodes.OK).json(wormable);
        } catch (error) {
            next(error);
        }
    }) as RequestHandler<{ petRecordId: string }, {}, CreateWormableRequestBody>,

    update: (async (
        req: Request<{ petRecordId: string, wormableId: string }, {}, UpdateWormableRequestBody>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const schema = Yup.object().shape({
                id: Yup.string().required(),
                name: Yup.string().required(),
                injectionDate: Yup.date().required(),
                reminderDate: Yup.date().nullable(),
                description: Yup.string().nullable(),
                petRecordId: Yup.string().required(),
                createdAt: Yup.date().required(),
                updatedAt: Yup.date()
            });

            if (!(await schema.isValid(req.body))) throw new ValidationError();

            // // @ts-ignore
            // req.body.updatedAt = new Date();

            // @ts-ignore
            await Wormable.update(req.body, { where: { id: req.params.wormableId } });

            // @ts-ignore
            const updatedWormable = await Wormable.findByPk(req.params.wormableId);

            if (!updatedWormable) throw new BadRequestError();

            return res.status(StatusCodes.OK).json(updatedWormable);
        } catch (error) {
            next(error);
        }
    }) as RequestHandler<{ petRecordId: string, wormableId: string }, {}, UpdateWormableRequestBody>,

    delete: (async (
        req: Request<{ petRecordId: string, wormableId: string }>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            // @ts-ignore
            await Wormable.destroy({ where: { id: req.params.wormableId } });

            return res.status(StatusCodes.OK).json({ msg: "Deleted" });
        } catch (error) {
            next(error);
        }
    }) as RequestHandler<{ petRecordId: string, wormableId: string }>,

};

export default wormableController;