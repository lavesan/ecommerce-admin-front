import { IEnterprise } from "./entities/IEnterprise";

export interface IFormatPaginateUser {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: string;
  created_at: string;
  updated_at?: Date;
  deleted_at?: Date;
  enterprises?: IEnterprise[];
}
