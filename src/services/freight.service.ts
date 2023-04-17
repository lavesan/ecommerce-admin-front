import { server } from "@config/axios.config";
import { ICreateFreightRequest } from "@models/ICreateFreightRequest";
import { ICreatePromotionRequest } from "@models/ICreatePromotionRequest";
import { IPaginatePromotionfilter } from "@models/IPaginatePromotionFilter";
import { IUpdateFreightRequest } from "@models/IUpdateFreightRequest";
import { IUpdatePromotionRequest } from "@models/IUpdatePromotionRequest";
import { IFreight } from "@models/entities/IFreight";
import { IPromotion } from "@models/entities/IPromotion";
import {
  IPaginationRequest,
  IPaginationResponse,
} from "@models/pagination.models";

export class FreightService {
  private static INSTANCE: FreightService;

  async paginate(
    params: IPaginationRequest
  ): Promise<IPaginationResponse<IFreight>> {
    const res = await server.get<IPaginationResponse<IFreight>>("/freight", {
      params,
    });
    return res.data;
  }

  async findAll(enterpriseId: string): Promise<IPaginationResponse<IFreight>> {
    const res = await server.get<IPaginationResponse<IFreight>>(
      `/freight/all/${enterpriseId}`
    );
    return res.data;
  }

  async findById(id: string): Promise<IFreight> {
    const res = await server.get<IFreight>(`/freight/${id}`);
    return res.data;
  }

  async create(body: ICreateFreightRequest): Promise<IFreight> {
    const res = await server.post<IFreight>("/freight", body);
    return res.data;
  }

  async update(id: string, body: IUpdateFreightRequest): Promise<boolean> {
    const res = await server.put<boolean>(`/freight/${id}`, body);
    return res.data;
  }

  static getInstance() {
    if (!this.INSTANCE) this.INSTANCE = new FreightService();
    return this.INSTANCE;
  }
}
