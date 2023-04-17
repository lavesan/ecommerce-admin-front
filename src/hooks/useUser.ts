import { useEffect, useState } from "react";
import jwt from "jwt-decode";

import { useTokenCookies } from "./useTokenCookies";

interface IUseUserReturn {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export const useUser = (): IUseUserReturn => {
  const { token } = useTokenCookies();

  const [user, setUser] = useState<IUseUserReturn>({} as IUseUserReturn);

  useEffect(() => {
    if (token) {
      const tokenPayload = jwt<IUseUserReturn>(token);

      setUser(tokenPayload);
    }
  }, [token]);

  return user;
};
