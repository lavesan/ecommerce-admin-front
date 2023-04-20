import { WeekDay } from "@enums/WeekDay.enum";

export interface IPromotionCreateOrEditForm {
  name: string;
  description: string;
  weekDay: WeekDay;
  isDisabled: boolean;
  promotionProducts: {
    promotionProductId?: string;
    productId: string;
    value: number;
  }[];
}
