import { AppImageInput } from "@components/AppImageInput";
import { getImgUrl } from "@helpers/image.helper";
import { useAppContext } from "@hooks/useAppContext";
import { useSaveImage } from "@hooks/useSaveImage";
import { IProductCreateOrEditForm } from "@models/forms/IProductCreateOrEditForm";
import { Path, UseFormSetValue } from "react-hook-form";

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

  const { saveImage } = useSaveImage();

  const onImageChange = async (file: File) => {
    const newImageKey = await saveImage({
      file,
      preffix: "product_additional",
      oldImageKey: value,
    }).finally(() => setIsLoading(false));
    setValue(name, newImageKey);
  };

  return (
    <AppImageInput onImageChange={onImageChange} imageSrc={getImgUrl(value)} />
  );
}
