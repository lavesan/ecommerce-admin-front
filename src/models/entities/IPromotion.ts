import { WeekDay } from "@enums/WeekDay.enum";
import { IEnterprise } from "./IEnterprise";
import { IPromotionProduct } from "./IPromotionProduct";

export interface IPromotion {
  id: string;
  name: string;
  description: string;
  imageKey: string;
  weekDay: WeekDay;
  created_at: Date;
  enterprise?: IEnterprise;
  promotionProducts?: IPromotionProduct[];
}
