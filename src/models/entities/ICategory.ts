import { IEnterprise } from "./IEnterprise";
import { IProduct } from "./IProduct";

export interface ICategory {
  id: string;
  name: string;
  description: string;
  imageKey: string;
  isDisabled: boolean;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  products?: IProduct[];
  enterprise?: IEnterprise;
}
