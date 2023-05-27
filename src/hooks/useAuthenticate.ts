import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuthContext } from "./useAuthContext";
import { getToken } from "@helpers/token.helper";

export const useAuthenticate = () => {
  const { token } = useAuthContext();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const storedToken = getToken();

    if (storedToken && pathname === "/login") {
      navigate("/empresas");
    } else if (!storedToken) {
      const callbackURL = pathname;
      navigate(`/login?callbackURL=${callbackURL}`);
    }
  }, [token]);
};
