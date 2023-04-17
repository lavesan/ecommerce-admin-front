import { server } from "@config/axios.config";
import { ICreatePromotionRequest } from "@models/ICreatePromotionRequest";
import { IPaginatePromotionfilter } from "@models/IPaginatePromotionFilter";
import { IUpdatePromotionRequest } from "@models/IUpdatePromotionRequest";
import { IPromotion } from "@models/entities/IPromotion";
import {
  IPaginationRequest,
  IPaginationResponse,
} from "@models/pagination.models";

export class PromotionService {
  private static INSTANCE: PromotionService;

  async paginate(
    params: IPaginationRequest & IPaginatePromotionfilter
  ): Promise<IPaginationResponse<IPromotion>> {
    const res = await server.get<IPaginationResponse<IPromotion>>(
      "/promotion",
      {
        params,
      }
    );
    return res.data;
  }

  async findById(id: string): Promise<IPromotion> {
    const res = await server.get<IPromotion>(`/promotion/${id}`);
    return res.data;
  }

  async create(body: ICreatePromotionRequest): Promise<IPromotion> {
    const res = await server.post<IPromotion>("/promotion", body);
    return res.data;
  }

  async update(id: string, body: IUpdatePromotionRequest): Promise<boolean> {
    const res = await server.put<boolean>(`/promotion/${id}`, body);
    return res.data;
  }

  static getInstance() {
    if (!this.INSTANCE) this.INSTANCE = new PromotionService();
    return this.INSTANCE;
  }
}
