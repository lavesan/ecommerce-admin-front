import { WeekDay } from "@enums/WeekDay.enum";
import { REQUIRED_ERROR } from "@helpers/error.helper";
import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().required(REQUIRED_ERROR),
  description: yup.string().required(REQUIRED_ERROR),
  weekDay: yup
    .mixed()
    .oneOf([
      WeekDay.DOM,
      WeekDay.SEG,
      WeekDay.TER,
      WeekDay.QUA,
      WeekDay.QUI,
      WeekDay.SEX,
      WeekDay.SAB,
    ])
    .required(REQUIRED_ERROR),
  promotionProducts: yup
    .array()
    .of(
      yup.object({
        promotionProductId: yup.string().notRequired(),
        productId: yup.string().uuid().required(REQUIRED_ERROR),
        value: yup.number().required(REQUIRED_ERROR),
      })
    )
    .notRequired(),
});
