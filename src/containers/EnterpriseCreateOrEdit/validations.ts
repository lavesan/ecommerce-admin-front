import {
  CNPJ_ERROR,
  EMAIL_ERROR,
  PHONE_ERROR,
  REQUIRED_ERROR,
} from "@helpers/error.helper";
import { cnpjReg, phoneReg } from "@helpers/validation.helper";
import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().required(REQUIRED_ERROR),
  email: yup.string().email(EMAIL_ERROR).required(REQUIRED_ERROR),
  description: yup.string().required(REQUIRED_ERROR),
  cnpj: yup.string().matches(cnpjReg, CNPJ_ERROR).required(REQUIRED_ERROR),
  phone: yup.string().matches(phoneReg, PHONE_ERROR).required(REQUIRED_ERROR),
  cep: yup.string().required(REQUIRED_ERROR),
  street: yup.string().required(REQUIRED_ERROR),
  complement: yup.string().notRequired(),
  number: yup.string().required(REQUIRED_ERROR),
  district: yup.string().required(REQUIRED_ERROR),
  city: yup.string().required(REQUIRED_ERROR),
  freights: yup
    .array()
    .of(
      yup
        .object({
          id: yup.string().uuid().notRequired(),
          addressKey: yup.string().required(REQUIRED_ERROR),
          addressValue: yup.string().required(REQUIRED_ERROR),
          value: yup.number().required(REQUIRED_ERROR),
        })
        .notRequired()
    )
    .notRequired(),
});
