import { WeekDay } from "@enums/WeekDay.enum";
import { IEnterprise } from "./IEnterprise";
import { IPromotionProduct } from "./IPromotionProduct";

export interface IPromotion {
  id: string;
  name: string;
  description: string;
  imageKey: string;
  weekDay: WeekDay;
  isDisabled: boolean;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  enterprise?: IEnterprise;
  promotionProducts?: IPromotionProduct[];
}
