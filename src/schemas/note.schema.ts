import * as Yup from "yup";

const createNoteSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().nullable(),
  petRecordId: Yup.string().required(),
});

const updateNoteSchema = Yup.object().shape({
  id: Yup.string().uuid().required(),
  name: Yup.string().required(),
  description: Yup.string().nullable(),
  petRecordId: Yup.string().required(),
  createdAt: Yup.date().required(),
});

export { createNoteSchema, updateNoteSchema };
