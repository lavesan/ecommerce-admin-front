import { ImageService } from "@services/image.service";
import { useAppContext } from "./useAppContext";
import { generateImageKey } from "@helpers/image.helper";

interface IUseSaveImageReturn {
  saveImage(params: {
    file: File;
    preffix: string;
    oldImageKey?: string;
  }): Promise<string>;
}

export const useSaveImage = (): IUseSaveImageReturn => {
  const imageService = ImageService.getInstance();

  const { setIsLoading } = useAppContext();

  return {
    async saveImage({ oldImageKey, file, preffix }): Promise<string> {
      if (oldImageKey) {
        await imageService.deleteByKey(oldImageKey).catch(() => {});
      }

      const { key } = await imageService
        .save({
          file,
          key: generateImageKey(preffix),
        })
        .catch(() => {
          setIsLoading(false);
          throw new Error();
        });

      return key;
    },
  };
};
