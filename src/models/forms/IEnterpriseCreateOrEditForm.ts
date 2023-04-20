import { WeekDay } from "@enums/WeekDay.enum";

export interface IEnterpriseCreateOrEditFormSchedule {
  scheduleId?: string | undefined;
  from: string;
  to: string;
  weekDay: WeekDay;
}

export interface IEnterpriseCreateOrEditForm {
  name: string;
  email: string;
  description: string;
  cnpj: string;
  estimatedTime: string;
  isDisabled: boolean;
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
