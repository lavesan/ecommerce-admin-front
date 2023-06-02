import React from "react";

import { IShowDialogPros } from "@models/context/IShowDialogProps";

export const AppContext = React.createContext({
  setIsLoading: (isLoading: boolean) => {},
  showDialog: (data: IShowDialogPros) => {},
});
