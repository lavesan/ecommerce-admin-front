import { useCookies } from "react-cookie";

import { COOKIE_TOKEN } from "@constants/auth.contants";

export const useTokenCookies = () => {
  const [cookies, setCookie, removeCookie] = useCookies([COOKIE_TOKEN]);

  return {
    token: cookies.token,
    setToken: (token: string) => {
      const expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 7);
      return setCookie("token", token, { expires: expireDate });
    },
    removeToken: () => removeCookie("token"),
  };
};
