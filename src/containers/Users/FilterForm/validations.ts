import * as yup from "yup";

export const validationSchema = yup.object({
  email: yup.string().notRequired(),
  name: yup.string().notRequired(),
});
