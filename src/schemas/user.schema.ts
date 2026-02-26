import * as Yup from "yup";

const MIN_PASSWORD_LENGTH: number = parseInt(process.env.MIN_PASSWORD_LENGTH ?? "8");
const MAX_PASSWORD_LENGTH: number = parseInt(process.env.MAX_PASSWORD_LENGTH ?? "128");

const createUserSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH),
});

const updateUserSchema = Yup.object().shape({
  id: Yup.string().uuid().required(),
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  oldPassword: Yup.string().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH),
  password: Yup.string()
    .min(MIN_PASSWORD_LENGTH)
    .max(MAX_PASSWORD_LENGTH)
    .when("oldPassword", (oldPassword, field) => {
      if (oldPassword) {
        return field.required();
      } else {
        return field;
      }
    }),
  confirmPassword: Yup.string().when("password", (password, field) => {
    if (password) {
      return field.required().oneOf([Yup.ref("password")]);
    } else {
      return field;
    }
  }),
});

export { createUserSchema, updateUserSchema };
