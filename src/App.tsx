import { useMemo, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, Spinner, Flex, StyleProps } from "@chakra-ui/react";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClientProvider } from "react-query";

import { queryClient } from "@config/query-client.config";
import { AppContext } from "@context/AppContext";
import { AxiosInterceptorHOC } from "@config/axios.config";
import { theme } from "./theme";
import Router from "routes";
import { AuthContext } from "@context/AuthContext";
import { useAuthContextConfig } from "@hooks/useAuthContextConfig";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const authContextConfig = useAuthContextConfig();

  const appStyle = useMemo(
    () => (isLoading ? { opacity: 0.7 } : {}),
    [isLoading]
  );

  const loadingStyle = useMemo<StyleProps>(
    () =>
      isLoading
        ? {
            zIndex: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "100vh",
            pointerEvents: "none",
          }
        : { zIndex: -1 },
    [isLoading]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContext.Provider value={{ setIsLoading }}>
          <AuthContext.Provider value={authContextConfig}>
            <ChakraProvider theme={theme}>
              <AxiosInterceptorHOC>
                <Flex
                  position="relative"
                  width="100%"
                  height="100%"
                  minHeight="100vh"
                  {...appStyle}
                >
                  {isLoading && (
                    <Flex {...loadingStyle} position="absolute">
                      <Spinner size="xl" />
                    </Flex>
                  )}
                  <Router />
                </Flex>
              </AxiosInterceptorHOC>
            </ChakraProvider>
          </AuthContext.Provider>
        </AppContext.Provider>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
