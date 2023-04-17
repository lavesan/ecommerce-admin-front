import React from "react";

import { Flex } from "@chakra-ui/react";

export const UnLoggedLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <Flex
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      {children}
    </Flex>
  );
};
