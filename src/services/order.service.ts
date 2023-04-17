import { server } from "@config/axios.config";
import { IPaginateOrderFilter } from "@models/IPaginateOrderFilter";
import { IUpdateOrderRequest } from "@models/IUpdateOrderRequest";
import { IOrder } from "@models/entities/IOrder";
import {
  IPaginationRequest,
  IPaginationResponse,
} from "@models/pagination.models";

export class OrderService {
  private static INSTANCE: OrderService;

  async paginate(
    params: IPaginationRequest & IPaginateOrderFilter
  ): Promise<IPaginationResponse<IOrder>> {
    const res = await server.get<IPaginationResponse<IOrder>>("/order", {
      params,
    });
    return res.data;
  }

  async findById(id: string): Promise<IOrder> {
    const res = await server.get<IOrder>(`/order/${id}`);
    return res.data;
  }

  async updateStatus(id: string, body: IUpdateOrderRequest): Promise<boolean> {
    const res = await server.patch<boolean>(`/order/${id}`, body);
    return res.data;
  }

  static getInstance() {
    if (!this.INSTANCE) this.INSTANCE = new OrderService();
    return this.INSTANCE;
  }
}
