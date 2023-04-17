import { IEnterprise } from "./IEnterprise";
import { IOrder } from "./IOrder";

export interface IFreight {
  id: string;
  addressKey: string;
  addressValue: string;
  value: number;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  enterprise?: IEnterprise;
  orders?: IOrder[];
}
