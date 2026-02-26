import * as Yup from "yup";

const createMeasureSchema = Yup.object().shape({
  date: Yup.string().required(),
  weight: Yup.number().required(),
  petRecordId: Yup.string().required(),
});

const updateMeasureSchema = Yup.object().shape({
  id: Yup.string().uuid().required(),
  date: Yup.string().required(),
  weight: Yup.number().required(),
  petRecordId: Yup.string().required(),
  createdAt: Yup.date().required(),
  updatedAt: Yup.date(),
});

export { createMeasureSchema, updateMeasureSchema };
