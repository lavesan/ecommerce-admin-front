import { IEnterprise } from "./entities/IEnterprise";
import { IProduct } from "./entities/IProduct";

export interface IFormatPaginateCategory {
  id: string;
  name: string;
  description: string;
  imageKey: string;
  isDisabled: string;
  created_at: string;
  updated_at?: Date;
  deleted_at?: Date;
  products?: IProduct[];
  enterprise?: IEnterprise;
}
