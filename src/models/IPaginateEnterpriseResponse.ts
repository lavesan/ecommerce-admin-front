import { IEnterprise } from "./entities/IEnterprise";
import { IPaginationResponse } from "./pagination.models";

interface IFormattedEnterprise extends IEnterprise {
  openOrdersCount: number;
}

export interface IPaginateEnterpriseResponse
  extends IPaginationResponse<IFormattedEnterprise> {}
