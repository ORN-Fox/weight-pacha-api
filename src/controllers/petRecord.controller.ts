import { Request, Response, NextFunction, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import * as Yup from "yup";

import { ValidationError } from "@/utils/ApiError.js";

import PetRecord from "@/models/PetRecord.js";
import UserPetRecord from "@/models/UserPetRecord.js";

interface CreateOrUpdatePetRecordRequestBody {
    firstName: string;
    lastName: string;
    specie: number;
    breed: string;
    sex: number;
    color: string;
    birthDate: string;
    adoptedDate: string;
    sterilize: boolean;
    sterilizeDate: string;
    tagNumber: string;
    tagRageNumber: string;
    description: string;
}

const petRecordController = {

    find: (async (
        req: Request<{ id: string }>, 
        res: Response, 
        next: NextFunction
    ) => {
        try {
            const { id } = req.params;
            
            // @ts-ignore
            const petRecord = await PetRecord.findByPk(id);

            if (!petRecord) throw new BadRequestError();

            return res.status(StatusCodes.OK).json(petRecord);
        } catch (error) {
            next(error);
        }
    }) as unknown as RequestHandler,

    create: (async (
        req: Request<{}, {}, CreateOrUpdatePetRecordRequestBody>, 
        res: Response, 
        next: NextFunction
    ) => {
        try {
            const schema = Yup.object().shape({
                firstName: Yup.string().required(),
                lastName: Yup.string().nullable(),
                specie: Yup.number().required(),
                breed: Yup.string().nullable(),
                sex: Yup.number().nullable(),
                color: Yup.string().nullable(),
                birthDate: Yup.string().nullable(),
                adoptedDate: Yup.string().nullable(),
                sterilize: Yup.bool().nullable(),
                sterilizeDate: Yup.string().nullable(),
                tagNumber: Yup.string().nullable(),
                tagRageNumber: Yup.string().nullable(),
                description: Yup.string().nullable(),
            });

            if (!(await schema.isValid(req.body))) throw new ValidationError();

            // @ts-ignore
            const petRecord = await PetRecord.create(req.body as any);

            // @ts-ignore
            await UserPetRecord.create({
                userId: req.userId,
                petRecordId: petRecord.id
            });

            return res.status(StatusCodes.OK).json(petRecord);
        } catch (error) {
            next(error);
        }
    }) as RequestHandler,

    update: (async (
        req: Request<{ id: string }, {}, CreateOrUpdatePetRecordRequestBody>,
        res: Response,
        next: NextFunction
    ) => {        
        try {
            const schema = Yup.object().shape({
                id: Yup.string().required(),
                firstName: Yup.string().required(),
                lastName: Yup.string().nullable(),
                specie: Yup.number().required(),
                breed: Yup.string().nullable(),
                sex: Yup.number().nullable(),
                color: Yup.string().nullable(),
                birthDate: Yup.string().nullable(),
                adoptedDate: Yup.string().nullable(),
                sterilize: Yup.bool().default(false).nullable(),
                sterilizeDate: Yup.string().nullable(),
                tagNumber: Yup.string().nullable(),
                tagRageNumber: Yup.string().nullable(),
                description: Yup.string().nullable(),
                createdAt: Yup.date().required()
            });

            if (!(await schema.isValid(req.body))) throw new ValidationError();
            
            // // @ts-ignore
            // req.body.updatedAt = new Date();
            
            // @ts-ignore
            await PetRecord.update(req.body, { where: { id: req.params.id } });
            
            // @ts-ignore
            const updatedPetRecord = await PetRecord.findByPk(req.params.id);
            
            if (!updatedPetRecord) throw new BadRequestError();
            
            return res.status(StatusCodes.OK).json(updatedPetRecord);
        } catch (error) {
            next(error);
        }
    }) as RequestHandler<{ id: string }, any, CreateOrUpdatePetRecordRequestBody>,

};

export default petRecordController;