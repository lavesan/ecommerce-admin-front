import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().notRequired(),
  email: yup.string().notRequired(),
});
