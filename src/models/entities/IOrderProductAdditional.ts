import { IOrderProduct } from "./IOrderProduct";
import { IProductAdditional } from "./IProductAdditional";

export interface IOrderProductAdditional {
  id: string;
  quantity: number;
  value: number;
  created_at: Date;
  productAdditional?: IProductAdditional;
  orderProduct?: IOrderProduct;
}
