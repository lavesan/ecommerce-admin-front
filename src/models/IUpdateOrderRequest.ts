import { OrderStatus } from "@enums/OrderStatus.enum";

export interface IUpdateOrderRequest {
  status: OrderStatus;
}
