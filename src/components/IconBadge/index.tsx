import React from "react";

import { Flex } from "@chakra-ui/react";

interface IIconBadgeProps extends React.PropsWithChildren {
  text: string | number;
}

export const IconBadge = ({ text, children }: IIconBadgeProps) => {
  return (
    <Flex position="relative">
      {!!text && (
        <Flex
          position="absolute"
          top={-1}
          left={-1}
          zIndex={10}
          background="red.700"
          borderRadius="50%"
          color="white"
          padding={1}
          height={4}
          width={4}
          fontSize={10}
          justifyContent="center"
          alignItems="center"
        >
          {text}
        </Flex>
      )}
      {children}
    </Flex>
  );
};
