import { server } from "@config/axios.config";
import { ICreateClientRequest } from "@models/ICreateClientRequest";
import { IPaginateClientRequest } from "@models/IPaginateClientRequest";
import { IUpdateClientRequest } from "@models/IUpdateClientRequest";
import { IClient } from "@models/entities/IClient";
import {
  IPaginationRequest,
  IPaginationResponse,
} from "@models/pagination.models";

export class ClientService {
  private static INSTANCE: ClientService;

  async paginate(
    params: IPaginationRequest & IPaginateClientRequest
  ): Promise<IPaginationResponse<IClient>> {
    const res = await server.get<IPaginationResponse<IClient>>("/client", {
      params,
    });
    return res.data;
  }

  async findById(id: string): Promise<IClient> {
    const res = await server.get<IClient>(`/client/${id}`);
    return res.data;
  }

  async create(body: ICreateClientRequest): Promise<IClient> {
    const res = await server.post<IClient>("/client", body);
    return res.data;
  }

  async update(id: string, body: IUpdateClientRequest): Promise<boolean> {
    const res = await server.put<boolean>(`/client/${id}`, body);
    return res.data;
  }

  static getInstance() {
    if (!this.INSTANCE) this.INSTANCE = new ClientService();
    return this.INSTANCE;
  }
}
