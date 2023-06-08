import React, { useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, Spinner, Flex, StyleProps } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { AppContext } from "@context/AppContext";
import { AxiosInterceptorHOC } from "@config/axios.config";
import { theme } from "./theme";
import Router from "routes";
import { AuthContext } from "@context/AuthContext";
import { useAuthContextConfig } from "@hooks/useAuthContextConfig";
import { useAppContextConfig } from "@hooks/useAppContextConfig";
import { AppDialog } from "@components/AppDialog";
import { OrdersContext } from "@context/OrdersContext";
import { useOrdersContextConfig } from "@hooks/useOrdersContextConfig";

function App() {
  const { isLoading, onCloseDialog, dialog, ...appContextConfig } =
    useAppContextConfig();
  const authContextConfig = useAuthContextConfig();
  const ordersContextConfig = useOrdersContextConfig();

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
    <BrowserRouter>
      <AppContext.Provider value={appContextConfig}>
        <AuthContext.Provider value={authContextConfig}>
          <OrdersContext.Provider value={ordersContextConfig}>
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
                  <AppDialog {...dialog} onClose={onCloseDialog} />
                </Flex>
              </AxiosInterceptorHOC>
            </ChakraProvider>
          </OrdersContext.Provider>
        </AuthContext.Provider>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
