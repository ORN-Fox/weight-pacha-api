import * as Yup from "yup";

const updateUserSettingsSchema = Yup.object().shape({
  id: Yup.string().uuid().required(),
  locale: Yup.string().required(),
  theme: Yup.string().required(),
  calendarViewFormat: Yup.string().required(),
  itemsPerPage: Yup.number().required(),
  favoritePetRecordId: Yup.string().nullable(),
});

export { updateUserSettingsSchema };
