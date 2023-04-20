import { ProductAdditionalType } from "@enums/ProductAdditionalType.enum";

export interface IProductCreateOrEditForm {
  name: string;
  description: string;
  boldDescription: string;
  imageKey: string;
  value: number;
  givenPoints: number;
  sellPoints: number;
  isDisabled: boolean;
  productAdditionalCategory: {
    additionalCategoryId?: string;
    name: string;
    description: string;
    limit: number;
    type: ProductAdditionalType;
    isOptional: boolean;
    isDisabled: boolean;
    productAdditionals: {
      additionalId?: string;
      imageKey: string;
      name: string;
      value: number;
      isDisabled: boolean;
    }[];
  }[];
}
