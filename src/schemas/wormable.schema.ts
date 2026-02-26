import * as Yup from "yup";

const createWormableSchema = Yup.object().shape({
  name: Yup.string().required(),
  injectionDate: Yup.date().required(),
  reminderDate: Yup.date().nullable(),
  description: Yup.string().nullable(),
  petRecordId: Yup.string().required(),
});

const updateWormableSchema = Yup.object().shape({
  id: Yup.string().uuid().required(),
  name: Yup.string().required(),
  injectionDate: Yup.date().required(),
  reminderDate: Yup.date().nullable(),
  description: Yup.string().nullable(),
  petRecordId: Yup.string().required(),
  createdAt: Yup.date().required(),
  updatedAt: Yup.date(),
});

export { createWormableSchema, updateWormableSchema };
