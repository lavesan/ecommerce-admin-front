import { ICategory } from "./ICategory";
import { IOrderProduct } from "./IOrderProduct";
import { IProductAdditionalCategory } from "./IProductAdditionalCategory";
import { IPromotionProduct } from "./IPromotionProduct";

export interface IProduct {
  id: string;
  name: string;
  description: string;
  boldDescription: string;
  imageKey: string;
  value: number;
  givenPoints: number;
  sellPoints: number;
  isDisabled: boolean;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  category?: ICategory;
  productAdditionalCategory?: IProductAdditionalCategory[];
  orderProducts?: IOrderProduct[];
  promotionProduct?: IPromotionProduct;
}
