import { OrderStatus } from "@enums/OrderStatus.enum";
import { PaymentType } from "@enums/PaymentType.enum";
import * as yup from "yup";

export const validationSchema = yup.object({
  created_at: yup.string().notRequired(),
  status: yup
    .mixed()
    .oneOf([
      OrderStatus.CANCELED,
      OrderStatus.DELETED,
      OrderStatus.DOING,
      OrderStatus.DONE,
      OrderStatus.SENDING,
      OrderStatus.TO_APPROVE,
    ])
    .notRequired(),
  paymentType: yup
    .mixed()
    .oneOf([
      PaymentType.CREDIT_CARD_MACHINE,
      PaymentType.DEBIT_CARD_MACHINE,
      PaymentType.MONEY,
    ])
    .notRequired(),
});
