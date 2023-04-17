import { ProductAdditionalType } from "@enums/ProductAdditionalType.enum";

interface IUpdateProductAdditionalCategory {
  id?: string;
  name: string;
  description: string;
  limit: number;
  type: ProductAdditionalType;
  imageKey: string;
  isOptional: boolean;
  productAdditionals: {
    id?: string;
    name: string;
    imageKey: string;
    value: number;
  }[];
}

export interface IUpdateProductRequest {
  categoryId: string;
  name: string;
  description: string;
  boldDescription: string;
  imageKey: string;
  value: number;
  givenPoints: number;
  sellPoints: number;
  productAdditionalCategory: IUpdateProductAdditionalCategory[];
}
