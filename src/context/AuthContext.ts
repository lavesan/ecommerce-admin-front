import React from "react";

import { ITokenUser } from "@models/hooks/ITokenUser";
import { ICredentialsToken } from "@models/ICredentialsToken";

export const AuthContext = React.createContext({
  token: null as ICredentialsToken | null,
  setToken: (token: ICredentialsToken) => {},
  user: {} as ITokenUser | null,
  logout: () => {},
  isAdmin: false,
});
