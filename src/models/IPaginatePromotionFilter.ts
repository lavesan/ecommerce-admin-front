import { WeekDay } from "@enums/WeekDay.enum";

export interface IPaginatePromotionfilter {
  enterpriseId?: string;
  name?: string;
  weekDay?: WeekDay;
}
