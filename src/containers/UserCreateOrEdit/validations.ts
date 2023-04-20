import { EMAIL_ERROR, REQUIRED_ERROR } from "@helpers/error.helper";
import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().required(REQUIRED_ERROR),
  email: yup.string().email(EMAIL_ERROR).required(REQUIRED_ERROR),
  password: yup.string().notRequired(),
  isAdmin: yup.boolean().required(REQUIRED_ERROR),
});
