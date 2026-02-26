import * as Yup from "yup";

const createVaccineSchema = Yup.object().shape({
  name: Yup.string().required(),
  injectionDate: Yup.date().required(),
  reminderDate: Yup.date().nullable(),
  description: Yup.string().nullable(),
  petRecordId: Yup.string().required(),
});

const updateVaccineSchema = Yup.object().shape({
  id: Yup.string().uuid().required(),
  name: Yup.string().required(),
  injectionDate: Yup.date().required(),
  reminderDate: Yup.date().nullable(),
  description: Yup.string().nullable(),
  petRecordId: Yup.string().required(),
  createdAt: Yup.date().required(),
  updatedAt: Yup.date(),
});

export { createVaccineSchema, updateVaccineSchema };
