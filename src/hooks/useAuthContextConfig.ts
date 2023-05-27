import { useEffect, useMemo, useState } from "react";
import jwt from "jwt-decode";

import { getToken, removeToken, storeToken } from "@helpers/token.helper";
import { ITokenUser } from "@models/hooks/ITokenUser";

export const useAuthContextConfig = () => {
  const [token, setToken] = useState("");

  const user = useMemo<ITokenUser | null>(() => {
    if (token) {
      const tokenPayload = jwt<ITokenUser>(token);

      return tokenPayload;
    }
    return null;
  }, [token]);

  const isAdmin = useMemo<boolean>(() => {
    return !!user?.isAdmin;
  }, [user]);

  const logout = () => {
    setToken("");
    removeToken();
  };

  useEffect(() => {
    const storedToken = getToken();
    if (storedToken) setToken(storedToken);
  }, []);

  return {
    token,
    setToken: (accessToken: string) => {
      setToken(accessToken);
      return storeToken(accessToken);
    },
    user,
    isAdmin,
    logout,
  };
};
