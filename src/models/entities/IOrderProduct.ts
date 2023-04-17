import { IOrder } from "./IOrder";
import { IOrderProductAdditional } from "./IOrderProductAdditional";
import { IProduct } from "./IProduct";

export interface IOrderProduct {
  id: string;
  quantity: number;
  value: number;
  points: number;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  order?: IOrder;
  product?: IProduct;
  additionals?: IOrderProductAdditional[];
}
