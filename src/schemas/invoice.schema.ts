import * as Yup from "yup";

const createInvoiceSchema = Yup.object().shape({
  billingDate: Yup.date().required(),
  amount: Yup.number().required(),
  description: Yup.string().nullable(),
  petRecordId: Yup.string().required(),
});

const updateInvoiceSchema = Yup.object().shape({
  id: Yup.string().uuid().required(),
  billingDate: Yup.date().required(),
  amount: Yup.number().required(),
  description: Yup.string().nullable(),
  petRecordId: Yup.string().required(),
  createdAt: Yup.date().required(),
  updatedAt: Yup.date(),
});

export { createInvoiceSchema, updateInvoiceSchema };
