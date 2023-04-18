import { ICategory } from "./ICategory";
import { IFreight } from "./IFreight";
import { IOrder } from "./IOrder";
import { IPromotion } from "./IPromotion";
import { ISchedule } from "./ISchedule";
import { IUser } from "./IUser";

export interface IEnterprise {
  id: string;
  email: string;
  name: string;
  description: string;
  cnpj: string;
  cep: string;
  estimatedTime: string;
  isDisabled: boolean;
  phone: string;
  street: string;
  complement: string;
  number: string;
  district: string;
  state: string;
  city: string;
  imageKey: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  categories?: ICategory[];
  orders?: IOrder[];
  freights?: IFreight[];
  promotions?: IPromotion[];
  user?: IUser;
  schedules?: ISchedule[];
}
