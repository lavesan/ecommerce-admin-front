import { ScheduleRelation } from "@enums/ScheduleRelation";
import { WeekDay } from "@enums/WeekDay.enum";

export interface IEnterpriseCreateOrEditFormSchedule {
  scheduleId?: string | undefined;
  time: string;
  relation: ScheduleRelation;
  weekDay: WeekDay;
}

export interface IEnterpriseCreateOrEditForm {
  name: string;
  email: string;
  description: string;
  cnpj: string;
  phone: string;
  cep: string;
  street: string;
  complement: string;
  number: string;
  district: string;
  city: string;
  freights?: {
    freightId?: string | undefined;
    addressKey: string;
    addressValue: string;
    value: number;
  }[];
  schedules?: IEnterpriseCreateOrEditFormSchedule[];
}
