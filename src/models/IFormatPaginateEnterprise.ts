import { ICategory } from "./entities/ICategory";
import { IFreight } from "./entities/IFreight";
import { IOrder } from "./entities/IOrder";
import { IPromotion } from "./entities/IPromotion";
import { IUser } from "./entities/IUser";

export interface IFormatPaginateEnterprise {
  id: string;
  email: string;
  name: string;
  description: string;
  cnpj: string;
  cep: string;
  street: string;
  complement: string;
  number: string;
  district: string;
  state: string;
  city: string;
  imageKey: string;
  created_at: string;
  categories?: ICategory[];
  orders?: IOrder[];
  freights?: IFreight[];
  promotions?: IPromotion[];
  user?: IUser;
}
