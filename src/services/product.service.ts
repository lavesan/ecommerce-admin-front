import { server } from "@config/axios.config";
import { ICreateProductRequest } from "@models/ICreateProductRequest";
import { IPaginateProductFilter } from "@models/IPaginateProductFilter";
import { IUpdateProductRequest } from "@models/IUpdateProductRequest";
import { IProduct } from "@models/entities/IProduct";
import {
  IPaginationRequest,
  IPaginationResponse,
} from "@models/pagination.models";

export class ProductService {
  private static INSTANCE: ProductService;

  async paginate(
    params: IPaginationRequest & IPaginateProductFilter
  ): Promise<IPaginationResponse<IProduct>> {
    const res = await server.get<IPaginationResponse<IProduct>>("/product", {
      params,
    });
    return res.data;
  }

  async findById(id: string): Promise<IProduct> {
    const res = await server.get<IProduct>(`/product/${id}`);
    return res.data;
  }

  async create(body: ICreateProductRequest): Promise<IProduct> {
    const res = await server.post<IProduct>("/product", body);
    return res.data;
  }

  async update(id: string, body: IUpdateProductRequest): Promise<boolean> {
    const res = await server.put<boolean>(`/product/${id}`, body);
    return res.data;
  }

  async findByEnterpriseId(id: string): Promise<IProduct[]> {
    const res = await server.get<IProduct[]>(`/product/enterprise/${id}`);
    return res.data;
  }

  static getInstance() {
    if (!this.INSTANCE) this.INSTANCE = new ProductService();
    return this.INSTANCE;
  }
}
