import { useQuery } from "react-query";
import { useAppContext } from "./useAppContext";
import { useEffect, useState } from "react";
import { ImageService } from "@services/image.service";

export const useGetImageQuery = (fileKey: string) => {
  const imageService = ImageService.getInstance();

  const { setIsLoading } = useAppContext();

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (fileKey) {
      setEnabled(true);
    }
  }, [fileKey]);

  return useQuery(
    ["image", fileKey],
    () => {
      if (fileKey) {
        return imageService.getByKey(fileKey);
      }
    },
    {
      enabled,
      retry: false,
      onSettled: () => {
        setIsLoading(false);
        setEnabled(false);
      },
    }
  );
};
