import * as Yup from "yup";

const createAddressSchema = Yup.object().shape({
  city: Yup.string().required(),
  state: Yup.string().required(),
  neighborhood: Yup.string().required(),
  country: Yup.string().required(),
});

export { createAddressSchema };
