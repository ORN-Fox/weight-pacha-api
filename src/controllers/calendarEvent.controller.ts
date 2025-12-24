import { Request, Response, NextFunction, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import * as Yup from "yup";

import {
    BadRequestError,
    ValidationError,
} from "../utils/ApiError.js";

import CalendarEvent from "../models/CalendarEvent.js";

interface CreateCalendarEventRequestBody {
    title: string;
    startDate: Date;
    description: string;
    petRecordId: string;
}

interface UpdateCalendarEventRequestBody extends CreateCalendarEventRequestBody {
    id: string;
    createdAt: Date;
}

const calendarEventController = {

    findAllWithPetRecordId: (async (req: Request<{ petRecordId: string }>, res: Response, next: NextFunction) => {
        try {
            // @ts-ignore
            const calendarEvents = await CalendarEvent.findAll({
                where: { petRecordId: req.params.petRecordId },
                order: [
                    ['startDate', 'DESC']
                ]
            });

            if (!calendarEvents) throw new BadRequestError();

            return res.status(StatusCodes.OK).json(calendarEvents);
        } catch (error) {
            next(error);
        }
    }) as unknown as RequestHandler,

    create: (async (
        req: Request<{ petRecordId: string }, {}, CreateCalendarEventRequestBody>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const schema = Yup.object().shape({
                title: Yup.string().required(),
                startDate: Yup.date().required(),
                description: Yup.string().nullable(),
                petRecordId: Yup.string().required(),
            });

            if (!(await schema.isValid(req.body))) throw new ValidationError();

            // TODO handle vaccine and wormable event creation (frontend 0.4.0)
            // @ts-ignore
            const calendarEvent = await CalendarEvent.create(req.body as any);

            return res.status(StatusCodes.OK).json(calendarEvent);
        } catch (error) {
            next(error);
        }
    }) as RequestHandler<{ petRecordId: string }, {}, CreateCalendarEventRequestBody>,

    update: (async (
        req: Request<{ petRecordId: string, calendarEventId: string }, {}, UpdateCalendarEventRequestBody>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const schema = Yup.object().shape({
                id: Yup.string().required(),
                title: Yup.string().required(),
                startDate: Yup.date().required(),
                description: Yup.string().nullable(),
                petRecordId: Yup.string().required(),
                createdAt: Yup.date().required(),
                updatedAt: Yup.date()
            });

            if (!(await schema.isValid(req.body))) throw new ValidationError();

            // // @ts-ignore
            // req.body.updatedAt = new Date();

            // TODO handle vaccine and wormable event updation (frontend 0.4.0)
            // @ts-ignore
            await CalendarEvent.update(req.body, { where: { id: req.params.calendarEventId } });

            // @ts-ignore
            const updatedCalendarEvent = await CalendarEvent.findByPk(req.params.calendarEventId);

            if (!updatedCalendarEvent) throw new BadRequestError();

            return res.status(StatusCodes.OK).json(updatedCalendarEvent);
        } catch (error) {
            next(error);
        }
    }) as RequestHandler<{ petRecordId: string, calendarEventId: string }, {}, UpdateCalendarEventRequestBody>,

    delete: (async (
        req: Request<{ petRecordId: string, calendarEventId: string }>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            // TODO handle vaccine and wormable event deletion (frontend 0.4.0)
            // @ts-ignore
            await CalendarEvent.destroy({ where: { id: req.params.calendarEventId } });

            return res.status(StatusCodes.OK).json({ msg: "Deleted" });
        } catch (error) {
            next(error);
        }
    }) as RequestHandler<{ petRecordId: string, calendarEventId: string }>,

};

export default calendarEventController;