import { IAppDialogProps } from "@components/AppDialog";
import { IShowDialogPros } from "@models/context/IShowDialogProps";
import { useState } from "react";

export const useAppContextConfig = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dialog, setDialog] = useState<Omit<IAppDialogProps, "onClose">>(
    {} as IAppDialogProps
  );

  const showDialog = (data: IShowDialogPros) => {
    setDialog({
      ...data,
      isOpen: true,
    });
  };

  const onCloseDialog = () => {
    setDialog((actual) => ({ ...actual, isOpen: false }));
  };

  return {
    dialog,
    showDialog,
    onCloseDialog,
    isLoading,
    setIsLoading,
  };
};
