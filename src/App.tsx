import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useMemo, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, Spinner, Flex } from "@chakra-ui/react";

import { AppContext } from "@context/AppContext";
import { useTokenCookies } from "@hooks/useTokenCookies";
import { AxiosInterceptorHOC } from "@config/axios.config";
import { theme } from "./theme";
import Router from "routes";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const { removeToken } = useTokenCookies();

  const appStyle = useMemo(
    () => (isLoading ? { opacity: 0.7 } : {}),
    [isLoading]
  );
  const loadingStyle = useMemo(
    () =>
      isLoading
        ? {
            zIndex: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "100vh",
          }
        : { zIndex: -1 },
    [isLoading]
  );

  const logout = async () => {
    removeToken();
  };

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ logout, setIsLoading }}>
        <ChakraProvider theme={theme}>
          <AxiosInterceptorHOC>
            <Flex position="relative" width="100%" height="100%" {...appStyle}>
              {isLoading && (
                <Flex {...loadingStyle} position="absolute">
                  <Spinner size="xl" />
                </Flex>
              )}
              <Router />
            </Flex>
          </AxiosInterceptorHOC>
        </ChakraProvider>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
