import React from "react";

import { ITokenUser } from "@models/hooks/ITokenUser";

export const AuthContext = React.createContext({
  token: "",
  setToken: (token: string) => {},
  user: {} as ITokenUser | null,
  logout: () => {},
  isAdmin: false,
});
