import { IAppDialogProps } from "@components/AppDialog";

export interface IShowDialogPros
  extends Omit<IAppDialogProps, "onClose" | "isOpen"> {}
