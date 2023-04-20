import { ProductAdditionalType } from "@enums/ProductAdditionalType.enum";
import { ONLY_NUMBER_ERROR, REQUIRED_ERROR } from "@helpers/error.helper";
import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().required(REQUIRED_ERROR),
  description: yup.string().required(REQUIRED_ERROR),
  boldDescription: yup.string().required(REQUIRED_ERROR),
  value: yup.number().required(REQUIRED_ERROR),
  givenPoints: yup.number().required(REQUIRED_ERROR),
  sellPoints: yup.number().required(REQUIRED_ERROR),
  isDisabled: yup.boolean().notRequired(),
  productAdditionalCategory: yup
    .array()
    .of(
      yup.object({
        additionalCategoryId: yup.string().notRequired(),
        name: yup.string().required(REQUIRED_ERROR),
        description: yup.string().required(REQUIRED_ERROR),
        limit: yup.number().required(REQUIRED_ERROR),
        type: yup
          .mixed()
          .oneOf([
            ProductAdditionalType.MORE_THAN_ONE_SELECT,
            ProductAdditionalType.ONE_SELECT,
          ])
          .required(REQUIRED_ERROR),
        isOptional: yup.boolean().required(REQUIRED_ERROR),
        isDisabled: yup.boolean().notRequired(),
        productAdditionals: yup
          .array()
          .of(
            yup.object({
              additionalId: yup.string().notRequired(),
              imageKey: yup.string().required(REQUIRED_ERROR),
              name: yup.string().required(REQUIRED_ERROR),
              value: yup.number().required(REQUIRED_ERROR),
              isDisabled: yup.boolean().notRequired(),
            })
          )
          .notRequired(),
      })
    )
    .notRequired(),
});
