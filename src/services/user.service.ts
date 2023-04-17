import { server } from "@config/axios.config";
import { IPaginateUserFilter } from "@models/IPaginateUserFilter";
import { IUserLoginRequest } from "@models/IUserLoginRequest";
import { IUserLoginResponse } from "@models/IUserLoginResponse";
import { IUser } from "@models/entities/IUser";
import {
  IPaginationRequest,
  IPaginationResponse,
} from "@models/pagination.models";

export class UserService {
  private static INSTANCE: UserService;

  async login(body: IUserLoginRequest): Promise<IUserLoginResponse> {
    const res = await server.post<IUserLoginResponse>("/user/login", body);
    return res.data;
  }

  async paginate(
    params: IPaginationRequest & IPaginateUserFilter
  ): Promise<IPaginationResponse<IUser>> {
    const res = await server.get<IPaginationResponse<IUser>>("/user", {
      params,
    });
    return res.data;
  }

  async findById(id: string): Promise<IUser> {
    const res = await server.get<IUser>(`/user/${id}`);
    return res.data;
  }

  async create(body: Partial<IUser>): Promise<IUser> {
    const res = await server.post<IUser>("/user", body);
    return res.data;
  }

  async update(id: string, body: Partial<IUser>): Promise<boolean> {
    const res = await server.put<boolean>(`/user/${id}`, body);
    return res.data;
  }

  static getInstance() {
    if (!this.INSTANCE) this.INSTANCE = new UserService();
    return this.INSTANCE;
  }
}
