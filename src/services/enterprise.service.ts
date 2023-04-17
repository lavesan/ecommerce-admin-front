import { server } from "@config/axios.config";
import { ICreateEnterpriseRequest } from "@models/ICreateEnterpriseRequest";
import { IPaginateEnterpriseFilter } from "@models/IPaginateEnterpriseFilter";
import { IUpdateEnterpriseRequest } from "@models/IUpdateEnterpriseRequest";
import { IEnterprise } from "@models/entities/IEnterprise";
import {
  IPaginationRequest,
  IPaginationResponse,
} from "@models/pagination.models";

export class EnterpriseService {
  private static INSTANCE: EnterpriseService;

  async paginate(
    params: IPaginationRequest & Partial<IPaginateEnterpriseFilter>
  ): Promise<IPaginationResponse<IEnterprise>> {
    const res = await server.get<IPaginationResponse<IEnterprise>>(
      "/enterprise",
      {
        params,
      }
    );
    return res.data;
  }

  async findById(id: string): Promise<IEnterprise> {
    const res = await server.get<IEnterprise>(`/enterprise/${id}`);
    return res.data;
  }

  async create(body: ICreateEnterpriseRequest): Promise<IEnterprise> {
    const res = await server.post<IEnterprise>("/enterprise", body);
    return res.data;
  }

  async update(id: string, body: IUpdateEnterpriseRequest): Promise<boolean> {
    const res = await server.put<boolean>(`/enterprise/${id}`, body);
    return res.data;
  }

  async delete(id: string): Promise<boolean> {
    const res = await server.delete<boolean>(`/enterprise/${id}`);
    return res.data;
  }

  static getInstance() {
    if (!this.INSTANCE) this.INSTANCE = new EnterpriseService();
    return this.INSTANCE;
  }
}
