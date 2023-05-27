import { Flex, Heading, IconButton } from "@chakra-ui/react";
import { AiOutlinePoweroff } from "react-icons/ai";

import { useAppContext } from "@hooks/useAppContext";
import { forwardRef } from "react";
import { Links } from "../Links";
import { useAuthContext } from "@hooks/useAuthContext";

const AiOutlinePoweroffRef = forwardRef((props, ref) => (
  <AiOutlinePoweroff {...props} />
));

export const Sidebar = () => {
  const { logout, user } = useAuthContext();

  return (
    <Flex
      as="header"
      height="100vh"
      position="sticky"
      left={0}
      top={0}
      zIndex={2}
      flexDir="column"
      padding={4}
      backgroundColor="green.500"
    >
      <Heading as="h2" size="xs" color="white" marginBottom={4}>
        Olá, {user?.name}
      </Heading>
      <Links />
      <IconButton
        as={AiOutlinePoweroffRef}
        aria-label="Logout"
        onClick={logout}
        alignSelf="center"
        marginTop="auto"
        cursor="pointer"
        color="white"
        backgroundColor="green.500"
        title="Sair"
        _hover={{
          color: "green.500",
          backgroundColor: "white",
        }}
      ></IconButton>
    </Flex>
  );
};
