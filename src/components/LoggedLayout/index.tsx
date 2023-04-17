import React from "react";
import { Flex } from "@chakra-ui/react";

import { Sidebar } from "./Sidebar";
import { useResponsive } from "@hooks/useResponsive";
import { MobileHeader } from "./MobileHeader";

export const LoggedLayout = ({ children }: React.PropsWithChildren) => {
  const { isMobile } = useResponsive();

  return (
    <Flex flexDir={["column", "row"]} flexWrap="nowrap" w="100%">
      {isMobile ? <MobileHeader /> : <Sidebar />}
      <Flex flexDir="column" padding={8} w="100%">
        {children}
      </Flex>
    </Flex>
  );
};
