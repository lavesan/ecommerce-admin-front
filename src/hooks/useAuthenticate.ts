import { useEffect } from "react";
import { useTokenCookies } from "./useTokenCookies";
import { useLocation, useNavigate } from "react-router-dom";

export const useAuthenticate = () => {
  const { token } = useTokenCookies();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (token && pathname === "/login") {
      navigate("/");
    } else if (!token) navigate("/login");
  }, [token]);
};
