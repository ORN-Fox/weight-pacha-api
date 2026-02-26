import * as Yup from "yup";

const createCalendarEventSchema = Yup.object().shape({
  title: Yup.string().required(),
  startDate: Yup.date().required(),
  description: Yup.string().nullable(),
  eventSource: Yup.number().required(),
  petRecordId: Yup.string().required(),

  // vaccine or wormable related
  reminderDate: Yup.date().nullable(),
});

const updateCalendarEventSchema = Yup.object().shape({
  id: Yup.string().uuid().required(),
  title: Yup.string().required(),
  startDate: Yup.date().required(),
  description: Yup.string().nullable(),
  eventSource: Yup.number().required(),
  petRecordId: Yup.string().required(),
  createdAt: Yup.date().required(),

  // vaccine or wormable related
  reminderDate: Yup.date().nullable(),
});

export { createCalendarEventSchema, updateCalendarEventSchema };
