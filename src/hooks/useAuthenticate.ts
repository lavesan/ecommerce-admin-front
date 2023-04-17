import { useEffect } from "react";
import { useTokenCookies } from "./useTokenCookies";
import { useNavigate } from "react-router-dom";

export const useAuthenticate = () => {
  const { token } = useTokenCookies();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/");
    if (!token) navigate("/login");
  }, [token]);
};
