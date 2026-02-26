import { Request, Response, NextFunction, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

import { ValidationError } from "@utils/ApiError";

import { createCalendarEventSchema, updateCalendarEventSchema } from "@/schemas/calendarEvent.schema";

import CalendarEvent, { CalendarEventSource } from "@models/CalendarEvent";
import Vaccine from "@models/Vaccine";
import Wormable from "@models/Wormable.js";

interface CreateCalendarEventRequestBody {
  title: string;
  startDate: Date;
  description: string;
  eventSource: number;
  petRecordId: string;

  // vaccine or wormable related
  reminderDate: Date;
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
        order: [["startDate", "DESC"]],
      });

      const convertCalendarEvents = calendarEvents.map((calendarEvent) => CalendarEvent.convertCalendarEventToFullCalendarModel(calendarEvent));
      aggregateEvents = aggregateEvents.concat(convertCalendarEvents as never[]);

      // @ts-ignore
      const vaccines = await Vaccine.findAll({
        where: { petRecordId: req.params.petRecordId },
        order: [["injectionDate", "DESC"]],
      });

      const convertVaccines = vaccines.map((vaccine) => CalendarEvent.convertVaccineToFullCalendarModel(vaccine));
      aggregateEvents = aggregateEvents.concat(convertVaccines as never[]);

      // @ts-ignore
      const wormables = await Wormable.findAll({
        where: { petRecordId: req.params.petRecordId },
        order: [["injectionDate", "DESC"]],
      });

      const convertWormables = wormables.map((wormable) => CalendarEvent.convertWormableToFullCalendarModel(wormable));
      aggregateEvents = aggregateEvents.concat(convertWormables as never[]);

      return res.status(StatusCodes.OK).json(aggregateEvents);
    } catch (error) {
      next(error);
    }
  }) as unknown as RequestHandler,

  create: (async (req: Request<{ petRecordId: string }, object, CreateCalendarEventRequestBody>, res: Response, next: NextFunction) => {
    try {
      if (!(await createCalendarEventSchema.isValid(req.body))) throw new ValidationError();

      const calendarEventToCreate = req.body;
      let calendarEvent;

      switch (calendarEventToCreate.eventSource as CalendarEventSource) {
        case CalendarEventSource.CALENDAR:
          // @ts-ignore
          calendarEvent = await CalendarEvent.create(calendarEventToCreate);
          break;

        case CalendarEventSource.VACCINE: {
          // @ts-ignore
          const vaccine = await Vaccine.create({
            name: calendarEventToCreate.title,
            injectionDate: calendarEventToCreate.startDate,
            reminderDate: calendarEventToCreate.reminderDate,
            description: calendarEventToCreate.description,
            petRecordId: calendarEventToCreate.petRecordId,
          });

          calendarEvent = CalendarEvent.convertVaccineToFullCalendarModel(vaccine);
          break;
        }

        case CalendarEventSource.WORMABLE: {
          // @ts-ignore
          const wormable = await Wormable.create({
            name: calendarEventToCreate.title,
            injectionDate: calendarEventToCreate.startDate,
            reminderDate: calendarEventToCreate.reminderDate,
            description: calendarEventToCreate.description,
            petRecordId: calendarEventToCreate.petRecordId,
          });

          calendarEvent = CalendarEvent.convertWormableToFullCalendarModel(wormable);
          break;
        }
      }

      return res.status(StatusCodes.OK).json(calendarEvent);
    } catch (error) {
      next(error);
    }
  }) as RequestHandler<{ petRecordId: string }, object, CreateCalendarEventRequestBody>,

  update: (async (
    req: Request<{ petRecordId: string; calendarEventId: string }, object, UpdateCalendarEventRequestBody>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!(await updateCalendarEventSchema.isValid(req.body))) throw new ValidationError();

      const calendarEventToUpdate = req.body;
      let updatedCalendarEvent;

      switch (calendarEventToUpdate.eventSource as CalendarEventSource) {
        case CalendarEventSource.CALENDAR:
          // @ts-ignore
          await CalendarEvent.update(calendarEventToUpdate, { where: { id: req.params.calendarEventId } });
          // @ts-ignore
          updatedCalendarEvent = await CalendarEvent.findByPk(req.params.calendarEventId);
          break;

        case CalendarEventSource.VACCINE: {
          // @ts-ignore
          await Vaccine.update(
            {
              id: calendarEventToUpdate.id,
              name: calendarEventToUpdate.title,
              injectionDate: calendarEventToUpdate.startDate,
              reminderDate: calendarEventToUpdate.reminderDate,
              description: calendarEventToUpdate.description,
              petRecordId: calendarEventToUpdate.petRecordId,
            },
            { where: { id: req.params.calendarEventId } },
          );

          // @ts-ignore
          const vaccine = await Vaccine.findByPk(req.params.calendarEventId);
          updatedCalendarEvent = CalendarEvent.convertVaccineToFullCalendarModel(vaccine);
          break;
        }

        case CalendarEventSource.WORMABLE: {
          // @ts-ignore
          await Wormable.update(
            {
              id: calendarEventToUpdate.id,
              name: calendarEventToUpdate.title,
              injectionDate: calendarEventToUpdate.startDate,
              reminderDate: calendarEventToUpdate.reminderDate,
              description: calendarEventToUpdate.description,
              petRecordId: calendarEventToUpdate.petRecordId,
            },
            { where: { id: req.params.calendarEventId } },
          );

          // @ts-ignore
          const wormable = await Wormable.findByPk(req.params.calendarEventId);
          updatedCalendarEvent = CalendarEvent.convertWormableToFullCalendarModel(wormable);
          break;
        }
      }

      return res.status(StatusCodes.OK).json(updatedCalendarEvent);
    } catch (error) {
      next(error);
    }
  }) as RequestHandler<{ petRecordId: string; calendarEventId: string }, object, UpdateCalendarEventRequestBody>,

  delete: (async (req: Request<{ petRecordId: string; calendarEventId: string; eventSource: string }>, res: Response, next: NextFunction) => {
    try {
      const eventSource: CalendarEventSource = parseInt(req.params.eventSource);

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
  }) as RequestHandler<{ petRecordId: string; calendarEventId: string; eventSource: string }>,
};

export default calendarEventController;
