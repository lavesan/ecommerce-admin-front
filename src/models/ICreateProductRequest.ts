import { ICreateProductAdditional } from "./ICreateProductAdditional";
import { ICreateProductAdditionalCategory } from "./ICreateProductAdditionalCategory";

export interface ICreateProductAdditionalCategoryRequest
  extends ICreateProductAdditionalCategory {
  productAdditionals: ICreateProductAdditional[];
}

export interface ICreateProductRequest {
  categoryId: string;
  name: string;
  description: string;
  boldDescription: string;
  imageKey: string;
  value: number;
  givenPoints: number;
  sellPoints: number;
  productAdditionalCategory: ICreateProductAdditionalCategoryRequest[];
}
