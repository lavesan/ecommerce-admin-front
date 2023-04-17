import { IEnterprise } from "./entities/IEnterprise";
import { IOrderProduct } from "./entities/IOrderProduct";
import { IFreight } from "./entities/IFreight";
import { IClient } from "./entities/IClient";
import { IAddress } from "./entities/IAddress";

export interface IFormatPaginateOrder {
  id: string;
  clientName: string;
  freightValue: string;
  productsValue: string;
  paymentType: string;
  totalValue: string;
  moneyExchange: number;
  status: { label: string; scheme: string };
  created_at: string;
  updated_at?: Date;
  deleted_at?: Date;
  orderProducts?: IOrderProduct[];
  address?: IAddress;
  client?: IClient;
  enterprise?: IEnterprise;
  freight?: IFreight;
}
