import { IProduct } from "./IProduct";
import { IPromotion } from "./IPromotion";

export interface IPromotionProduct {
  id: string;
  value: number;
  created_at: Date;
  product?: IProduct;
  promotion?: IPromotion;
}
