import { ScheduleRelation } from "@enums/ScheduleRelation";
import { WeekDay } from "@enums/WeekDay.enum";

export interface IUpdateEnterpriseRequest {
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
  state: string;
  city: string;
  imageKey: string;
  userId: string;
  freights?: {
    id?: string | undefined;
    addressKey: string;
    addressValue: string;
    value: number;
  }[];
  schedules?: {
    id?: string | undefined;
    time: string;
    relation: ScheduleRelation;
    weekDay: WeekDay;
  }[];
}
