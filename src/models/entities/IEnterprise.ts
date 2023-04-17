import { ICategory } from "./ICategory";
import { IFreight } from "./IFreight";
import { IOrder } from "./IOrder";
import { IPromotion } from "./IPromotion";
import { IUser } from "./IUser";

export interface IEnterprise {
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
  created_at: Date;
  categories?: ICategory[];
  orders?: IOrder[];
  freights?: IFreight[];
  promotions?: IPromotion[];
  user?: IUser;
}
