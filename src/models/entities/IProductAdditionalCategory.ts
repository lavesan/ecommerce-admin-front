import { ProductAdditionalType } from "@enums/ProductAdditionalType.enum";
import { IProduct } from "./IProduct";
import { IProductAdditional } from "./IProductAdditional";

export interface IProductAdditionalCategory {
  id: string;
  name: string;
  description: string;
  limit: number;
  type: ProductAdditionalType;
  isDisabled: boolean;
  isOptional: boolean;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  productAdditionals?: IProductAdditional[];
  product?: IProduct;
}
