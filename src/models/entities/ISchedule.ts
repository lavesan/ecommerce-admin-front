import { WeekDay } from "@enums/WeekDay.enum";
import { IEnterprise } from "./IEnterprise";

export interface ISchedule {
  id: string;
  from: Date;
  to: Date;
  weekDay: WeekDay;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  enterprise?: IEnterprise;
}
