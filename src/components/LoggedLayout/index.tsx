import React from "react";
import { Flex } from "@chakra-ui/react";

import { Sidebar } from "./Sidebar";

export const LoggedLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <Flex flexDir="row" flexWrap="nowrap">
      <Sidebar />
      <Flex>{children}</Flex>
    </Flex>
  );
};
