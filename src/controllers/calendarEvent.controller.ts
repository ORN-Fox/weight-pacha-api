import { Request, Response, NextFunction, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import * as Yup from "yup";

import { ValidationError } from "@/utils/ApiError";

import CalendarEvent, { CalendarEventSource } from "@/models/CalendarEvent";
import Vaccine from "@/models/Vaccine";
import Wormable from "@/models/Wormable.js";

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
            let aggregateEvents: CalendarEvent[] = [];

            // @ts-ignore
            const calendarEvents = await CalendarEvent.findAll({
                where: { petRecordId: req.params.petRecordId },
                order: [
                    ['startDate', 'DESC']
                ]
            });

            if (!calendarEvents) throw new BadRequestError();

            aggregateEvents = aggregateEvents.concat(calendarEvents);

            // @ts-ignore
            const vaccines = await Vaccine.findAll({
                where: { petRecordId: req.params.petRecordId },
                order: [
                    ['injectionDate', 'DESC']
                ]
            });

            if (!vaccines) throw new BadRequestError();

            let convertVaccines = vaccines.map(vaccine => CalendarEvent.convertVaccineToFullCalendarModel(vaccine));
            aggregateEvents = aggregateEvents.concat(convertVaccines as CalendarEvent[]);

            // @ts-ignore
            const wormables = await Wormable.findAll({
                where: { petRecordId: req.params.petRecordId },
                order: [
                    ['injectionDate', 'DESC']
                ]
            });

            if (!wormables) throw new BadRequestError();

            let convertWormables = wormables.map(wormable => CalendarEvent.convertWormableToFullCalendarModel(wormable));
            aggregateEvents = aggregateEvents.concat(convertWormables as CalendarEvent[]);

            return res.status(StatusCodes.OK).json(aggregateEvents);
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
        req: Request<{ petRecordId: string, calendarEventId: string, eventSource: string }>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const eventSource = parseInt(req.params.eventSource);
            
            switch (eventSource) {
                case CalendarEventSource.CALENDAR:
                     // @ts-ignore
                    await CalendarEvent.destroy({ where: { id: req.params.calendarEventId } });
                    break;

                case CalendarEventSource.VACCINE:
                     // @ts-ignore
                    await Vaccine.destroy({ where: { id: req.params.calendarEventId } });
                    break;

                case CalendarEventSource.WORMABLE:
                     // @ts-ignore
                    await Wormable.destroy({ where: { id: req.params.calendarEventId } });
                    break;
            }

            return res.status(StatusCodes.OK).json({ msg: "Deleted" });
        } catch (error) {
            next(error);
        }
    }) as RequestHandler<{ petRecordId: string, calendarEventId: string, eventSource: string }>,

};

export default calendarEventController;