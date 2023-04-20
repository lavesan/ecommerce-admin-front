import { AppImageInput } from "@components/AppImageInput";
import { useAppContext } from "@hooks/useAppContext";
import { useGetImageRequest } from "@hooks/useGetImageRequest";
import { useSaveImage } from "@hooks/useSaveImage";
import { IProductCreateOrEditForm } from "@models/forms/IProductCreateOrEditForm";
import { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";

interface IAdditionalFieldImageProps {
  name: Path<IProductCreateOrEditForm>;
  value: string;
  setValue: UseFormSetValue<IProductCreateOrEditForm>;
}

export function AdditionalFieldImage({
  name,
  value,
  setValue,
}: IAdditionalFieldImageProps) {
  const { setIsLoading } = useAppContext();

  const { data } = useGetImageRequest(value);
  const { saveImage } = useSaveImage();

  const onImageChange = async (file: File) => {
    const newImageKey = await saveImage({
      file,
      preffix: "product_additional",
      oldImageKey: value,
    }).finally(() => setIsLoading(false));
    setValue(name, newImageKey);
  };

  return <AppImageInput onImageChange={onImageChange} imageSrc={data} />;
}
