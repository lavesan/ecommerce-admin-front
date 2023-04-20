import { ProductAdditionalType } from "@enums/ProductAdditionalType.enum";

export interface ICreateProductAdditionalCategory {
  name: string;
  description: string;
  limit: number;
  type: ProductAdditionalType;
  isOptional: boolean;
}
