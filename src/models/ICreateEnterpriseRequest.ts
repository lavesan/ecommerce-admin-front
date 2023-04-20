import { WeekDay } from "@enums/WeekDay.enum";

export interface ICreateEnterpriseRequest {
  name: string;
  email: string;
  description: string;
  cnpj: string;
  cep: string;
  phone: string;
  estimatedTime: string;
  isDisabled: boolean;
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
    from: Date;
    to: Date;
    weekDay: WeekDay;
  }[];
}
