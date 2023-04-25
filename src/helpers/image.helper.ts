import { IResizeImageOptions } from "@models/helpers/IResizeImageOptions";

export const generateImageKey = (preffix: string) => `${preffix}_${Date.now()}`;

export const getImgUrl = (imageKey: string) =>
  imageKey ? `${import.meta.env.VITE_CDN_URL}/${imageKey}` : imageKey;

function resizeImage(settings: IResizeImageOptions) {
  const file = settings.file;
  const maxSize = settings.maxSize;
  const reader = new FileReader();
  const image = new Image();
  const canvas = document.createElement("canvas");
  const dataURItoBlob = (dataURI: string) => {
    const bytes =
      dataURI.split(",")[0].indexOf("base64") >= 0
        ? atob(dataURI.split(",")[1])
        : unescape(dataURI.split(",")[1]);
    const mime = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const max = bytes.length;
    const ia = new Uint8Array(max);
    for (var i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);
    return new Blob([ia], { type: mime });
  };
  const resize = () => {
    let width = image.width;
    let height = image.height;

    if (width > height) {
      if (width > maxSize) {
        height *= maxSize / width;
        width = maxSize;
      }
    } else {
      if (height > maxSize) {
        width *= maxSize / height;
        height = maxSize;
      }
    }

    canvas.width = width;
    canvas.height = height;
    // @ts-ignore
    canvas.getContext("2d").drawImage(image, 0, 0, width, height);
    let dataUrl = canvas.toDataURL("image/jpeg");
    return dataURItoBlob(dataUrl);
  };

  return new Promise((ok, no) => {
    if (!file.type.match(/image.*/)) {
      no(new Error("Not an image"));
      return;
    }

    reader.onload = (readerEvent: any) => {
      image.onload = () => ok(resize());
      image.src = readerEvent.target.result;
    };
    reader.readAsDataURL(file);
  });
}

export const compressFile = async (file: File): Promise<File> => {
  return file.size / 1024 / 1024 < 1
    ? file
    : await resizeImage({
        file,
        maxSize: 1000,
      })
        .then((resizedFile: any) => {
          resizedFile.lastModifiedDate = new Date();
          resizedFile.name = file.name;
          return resizedFile;
        })
        .catch(() => {
          const errorMsg = "Aconteceu um erro ao comprimir a imagem.";
          throw new Error(errorMsg);
        });
};
