import { IEnterprise } from "./entities/IEnterprise";
import { IPromotionProduct } from "./entities/IPromotionProduct";

export interface IFormatPaginatePromotion {
  id: string;
  name: string;
  description: string;
  imageKey: string;
  weekDay: string;
  created_at: string;
  updated_at?: Date;
  deleted_at?: Date;
  enterprise?: IEnterprise;
  promotionProducts?: IPromotionProduct[];
}
