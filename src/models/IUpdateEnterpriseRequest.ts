import { WeekDay } from "@enums/WeekDay.enum";

export interface IUpdateEnterpriseRequest {
  name: string;
  email: string;
  description: string;
  cnpj: string;
  phone: string;
  cep: string;
  estimatedTime: string;
  isDisabled: boolean;
  street: string;
  complement: string;
  number: string;
  district: string;
  state: string;
  city: string;
  imageKey: string;
  bannerKey: string;
  freights?: {
    id?: string | undefined;
    addressKey: string;
    addressValue: string;
    value: number;
  }[];
  schedules?: {
    id?: string | undefined;
    from: Date;
    to: Date;
    weekDay: WeekDay;
  }[];
}
