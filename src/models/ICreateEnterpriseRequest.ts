import { ScheduleRelation } from "@enums/ScheduleRelation";
import { WeekDay } from "@enums/WeekDay.enum";

export interface ICreateEnterpriseRequest {
  name: string;
  email: string;
  description: string;
  cnpj: string;
  cep: string;
  phone: string;
  street: string;
  complement: string;
  number: string;
  district: string;
  state: string;
  city: string;
  imageKey: string;
  userId: string;
  freights: {
    addressKey: string;
    addressValue: string;
    value: number;
  }[];
  schedules?: {
    time: Date;
    relation: ScheduleRelation;
    weekDay: WeekDay;
  }[];
}
