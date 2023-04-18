import { IAddress } from "./IAddress";
import { IOrder } from "./IOrder";

export interface IClient {
  id: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  points: number;
  phone: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  addresses?: IAddress[];
  orders?: IOrder[];
}
