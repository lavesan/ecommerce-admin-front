import { useEffect, useMemo, useState } from "react";
import jwt from "jwt-decode";

import { ITokenUser } from "@models/hooks/ITokenUser";
import {
  getCredentialsToken,
  clearCredentials,
  setCredentialsToken,
} from "@helpers/auth.helper";
import { ICredentialsToken } from "@models/ICredentialsToken";
import { RefreshTokenService } from "@services/refreshToken.service";

export const useAuthContextConfig = () => {
  const refreshTokenService = RefreshTokenService.getInstance();

  const [token, setToken] = useState<ICredentialsToken | null>(null);

  const user = useMemo<ITokenUser | null>(() => {
    if (token) {
      const tokenPayload = jwt<ITokenUser>(token.accessToken);

      return tokenPayload;
    }
    return null;
  }, [token]);

  const isAdmin = useMemo<boolean>(() => {
    return !!user?.isAdmin;
  }, [user]);

  const logout = () => {
    setToken(null);
    clearCredentials();
    refreshTokenService.logout();
  };

  useEffect(() => {
    const storedCredentials = getCredentialsToken();
    if (storedCredentials) setToken(storedCredentials);
  }, []);

  return {
    token,
    setToken: (credentials: ICredentialsToken) => {
      setToken(credentials);
      return setCredentialsToken(credentials);
    },
    user,
    isAdmin,
    logout,
  };
};
