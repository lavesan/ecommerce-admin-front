import { IAddress } from "./entities/IAddress";
import { IOrder } from "./entities/IOrder";

export interface IFormatPaginateClient {
  id: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  points: number;
  created_at: string;
  updated_at?: Date;
  deleted_at?: Date;
  addresses?: IAddress[];
  orders?: IOrder[];
}
