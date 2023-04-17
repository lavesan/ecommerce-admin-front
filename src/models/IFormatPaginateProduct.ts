import { ICategory } from "./entities/ICategory";
import { IOrderProduct } from "./entities/IOrderProduct";
import { IProductAdditionalCategory } from "./entities/IProductAdditionalCategory";
import { IPromotionProduct } from "./entities/IPromotionProduct";

export interface IFormatPaginateProduct {
  id: string;
  name: string;
  description: string;
  boldDescription: string;
  imageKey: string;
  value: string;
  givenPoints: number;
  sellPoints: number;
  isDisabled: string;
  created_at: string;
  updated_at?: Date;
  deleted_at?: Date;
  category?: ICategory;
  productAdditionalCategory?: IProductAdditionalCategory[];
  orderProducts?: IOrderProduct[];
  promotionProduct?: IPromotionProduct;
}
