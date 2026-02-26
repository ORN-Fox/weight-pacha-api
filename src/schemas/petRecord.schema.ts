import * as Yup from "yup";

const createPetRecordSchema = Yup.object().shape({
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
  healthWeight: Yup.number().required(),
  weightUnit: Yup.number().required(),
  description: Yup.string().nullable(),
});

const updatePetRecordSchema = Yup.object().shape({
  id: Yup.string().uuid().required(),
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
  healthWeight: Yup.number().required(),
  weightUnit: Yup.number().required(),
  description: Yup.string().nullable(),
  createdAt: Yup.date().required(),
});

export { createPetRecordSchema, updatePetRecordSchema };
