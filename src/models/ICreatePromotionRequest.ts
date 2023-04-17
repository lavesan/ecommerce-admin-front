import { WeekDay } from "@enums/WeekDay.enum";

export interface ICreatePromotionRequest {
  name: string;
  description: string;
  imageKey: string;
  weekDay: WeekDay;
  enterpriseId: string;
  products: {
    id: string;
    value: number;
  }[];
}
