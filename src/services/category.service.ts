import { server } from "@config/axios.config";
import { ICreateCategory } from "@models/ICreateCategoryRequest";
import { IPaginateCategoryRequest } from "@models/IPaginateCategoryRequest";
import { ICategory } from "@models/entities/ICategory";
import {
  IPaginationRequest,
  IPaginationResponse,
} from "@models/pagination.models";

export class CategoryService {
  private static INSTANCE: CategoryService;

  async paginate(
    params: IPaginationRequest & IPaginateCategoryRequest
  ): Promise<IPaginationResponse<ICategory>> {
    const res = await server.get<IPaginationResponse<ICategory>>("/category", {
      params,
    });
    return res.data;
  }

  async findById(id: string): Promise<ICategory> {
    const res = await server.get<ICategory>(`/category/${id}`);
    return res.data;
  }

  async create(body: ICreateCategory): Promise<ICategory> {
    const res = await server.post<ICategory>("/category", body);
    return res.data;
  }

  async update(id: string, body: Partial<ICategory>): Promise<boolean> {
    const res = await server.put<boolean>(`/category/${id}`, body);
    return res.data;
  }

  static getInstance() {
    if (!this.INSTANCE) this.INSTANCE = new CategoryService();
    return this.INSTANCE;
  }
}
