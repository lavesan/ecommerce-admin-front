import { server } from "@config/axios.config";
import { ISaveImageRequest } from "@models/ISaveImageRequest";
import { ISaveImageResponse } from "@models/ISaveImageResponse";

export class ImageService {
  private static INSTANCE: ImageService;

  async save({ file, key }: ISaveImageRequest): Promise<ISaveImageResponse> {
    // FilePart Form Data
    const form = new FormData();
    form.append("file", file);
    form.append("key", key);

    const res = await server.post<ISaveImageResponse>("/image", form);
    return res.data;
  }

  async getByKey(key: string): Promise<boolean> {
    const res = await server.get<boolean>(`/image/${key}`, {
      responseType: "blob",
    });
    return res.data;
  }

  static getInstance() {
    if (!this.INSTANCE) this.INSTANCE = new ImageService();
    return this.INSTANCE;
  }
}
