import { PaymentType } from "@enums/PaymentType.enum";
import { IEnterprise } from "./IEnterprise";
import { OrderStatus } from "@enums/OrderStatus.enum";
import { IOrderProduct } from "./IOrderProduct";
import { IFreight } from "./IFreight";
import { IClient } from "./IClient";
import { IAddress } from "./IAddress";

export interface IOrder {
  id: string;
  freightValue: number;
  productsValue: number;
  paymentType: PaymentType;
  moneyExchange: number;
  status: OrderStatus;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  orderProducts?: IOrderProduct[];
  address?: IAddress;
  client?: IClient;
  enterprise?: IEnterprise;
  freight?: IFreight;
}
