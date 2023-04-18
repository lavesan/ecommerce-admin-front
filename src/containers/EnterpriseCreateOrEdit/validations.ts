import { ScheduleRelation } from "@enums/ScheduleRelation";
import { WeekDay } from "@enums/WeekDay.enum";
import {
  CNPJ_ERROR,
  EMAIL_ERROR,
  PHONE_ERROR,
  REQUIRED_ERROR,
  TIME_ERROR,
} from "@helpers/error.helper";
import {
  cnpjReg,
  estimatedTimeReg,
  phoneReg,
  timeReg,
} from "@helpers/validation.helper";
import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().required(REQUIRED_ERROR),
  email: yup.string().email(EMAIL_ERROR).required(REQUIRED_ERROR),
  description: yup.string().required(REQUIRED_ERROR),
  cnpj: yup.string().matches(cnpjReg, CNPJ_ERROR).required(REQUIRED_ERROR),
  phone: yup.string().matches(phoneReg, PHONE_ERROR).required(REQUIRED_ERROR),
  estimatedTime: yup
    .string()
    .matches(estimatedTimeReg, TIME_ERROR)
    .notRequired(),
  isDisabled: yup.boolean().notRequired(),
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
          freightId: yup.string().uuid().notRequired(),
          addressKey: yup.string().required(REQUIRED_ERROR),
          addressValue: yup.string().required(REQUIRED_ERROR),
          value: yup.number().required(REQUIRED_ERROR),
        })
        .notRequired()
    )
    .notRequired(),
  schedules: yup
    .array()
    .of(
      yup
        .object({
          scheduleId: yup.string().uuid().notRequired(),
          time: yup
            .string()
            .matches(timeReg, TIME_ERROR)
            .required(REQUIRED_ERROR),
          relation: yup
            .mixed()
            .oneOf([ScheduleRelation.FROM, ScheduleRelation.TO])
            .required(REQUIRED_ERROR),
          weekDay: yup
            .mixed()
            .oneOf([
              WeekDay.DOM,
              WeekDay.QUA,
              WeekDay.QUI,
              WeekDay.SAB,
              WeekDay.SEG,
              WeekDay.SEX,
              WeekDay.TER,
            ])
            .required(REQUIRED_ERROR),
        })
        .notRequired()
    )
    .notRequired(),
});
