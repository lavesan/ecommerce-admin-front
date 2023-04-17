import { IClient } from "./IClient";
import { IOrder } from "./IOrder";

export interface IAddress {
  id: string;
  cep: string;
  street: string;
  complement: string;
  number: string;
  district: string;
  state: string;
  city: string;
  shortName: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  client?: IClient;
  order?: IOrder;
}
