import { WeekDay } from "@enums/WeekDay.enum";

export interface ICreatePromotionRequest {
  name: string;
  description: string;
  imageKey: string;
  weekDay: WeekDay;
  enterpriseId: string;
  products: {
    value: number;
    productId: string;
  }[];
}
