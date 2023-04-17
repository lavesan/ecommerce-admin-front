import { IOrderProductAdditional } from "./IOrderProductAdditional";
import { IProductAdditionalCategory } from "./IProductAdditionalCategory";

export interface IProductAdditional {
  id: string;
  name: string;
  imageKey: string;
  value: number;
  isDisabled: boolean;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  productAdditionalCategory?: IProductAdditionalCategory;
  orderProductAdditional?: IOrderProductAdditional[];
}
