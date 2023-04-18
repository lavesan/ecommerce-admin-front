import { ScheduleRelation } from "@enums/ScheduleRelation";
import { WeekDay } from "@enums/WeekDay.enum";
import { IEnterprise } from "./IEnterprise";

export interface ISchedule {
  id: string;
  time: Date;
  relation: ScheduleRelation;
  weekDay: WeekDay;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  enterprise?: IEnterprise;
}
