import { OrderStatus } from "@enums/OrderStatus.enum";
import { PaymentType } from "@enums/PaymentType.enum";

export interface IPaginateOrderFilter {
  status?: OrderStatus;
  paymentType?: PaymentType;
  initialDate?: Date;
  finalDate?: Date;
  enterpriseId?: string;
  clientId?: string;
}
