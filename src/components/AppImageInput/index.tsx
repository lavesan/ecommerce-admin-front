import { Flex, Icon } from "@chakra-ui/react";
import { canvasBlobPreview, canvasPreview } from "@helpers/canvas.helper";
import { useEffect, useMemo, useRef, useState } from "react";
import { HiUpload } from "react-icons/hi";
import { CropImage } from "./CropImage";

interface IAppImageInputProps {
  aspect?: number;
  imageSrc?: string;
  onImageChange: (image: File) => void;
}

export const AppImageInput = ({
  aspect = 1,
  imageSrc,
  onImageChange,
}: IAppImageInputProps) => {
  const [src, setSrc] = useState<any>();
  const [completedCrop, setCompletedCrop] = useState<any>();
  const [updated, setUpdated] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const blobUrlRef = useRef("");

  const hasImage = useMemo(() => imageSrc || updated, [imageSrc, updated]);

  const onModalClose = (update?: boolean) => {
    if (update) setUpdated(true);
    if (update && imageRef.current && previewCanvasRef.current)
      canvasPreview(
        imageRef.current,
        previewCanvasRef.current,
        completedCrop,
        1, // scale
        0 // rotate
      );
    setOpenModal(false);
    previewCanvasRef.current?.toBlob((blob) => {
      if (!blob) {
        throw new Error("Failed to create blob");
      }
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
      const file = new File([blob], `file_${Date.now()}`);

      onImageChange(file);
    });
  };

  const clickFileInput = () => {
    fileInputRef.current?.click();
  };

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setSrc(reader.result?.toString() || "");
        setOpenModal(true);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (imageSrc && previewCanvasRef.current) {
      canvasBlobPreview(imageSrc, previewCanvasRef.current);
    }
  }, [imageSrc]);

  return (
    <>
      <Flex
        ref={fileInputRef}
        as="input"
        type="file"
        accept="image/*"
        onChange={onSelectFile}
        display="none"
        name="image_input"
      />
      <Flex
        justify={["center", "flex-start"]}
        flexGrow={1}
        onClick={clickFileInput}
        title="Selecione uma imagem"
        cursor="pointer"
        height={[150, 200]}
      >
        <canvas
          ref={previewCanvasRef}
          style={{
            objectFit: "contain",
            display: hasImage ? "block" : "none",
          }}
        />
        {!hasImage && (
          <Flex
            justify="center"
            align="center"
            backgroundColor="gray.300"
            width="100%"
          >
            <Icon as={HiUpload} boxSize={[8, 12]} />
          </Flex>
        )}
      </Flex>
      <CropImage
        src={src}
        aspect={aspect}
        ref={imageRef}
        isOpen={openModal}
        onClose={onModalClose}
        setCompletedCrop={setCompletedCrop}
      />
    </>
  );
};
