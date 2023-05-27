import { Flex, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { MobileMenu } from "./MobileMenu";
import { useAuthContext } from "@hooks/useAuthContext";
import { AiOutlinePoweroffRef, HiOutlineMenuRef } from "@components/RefIcons";

export const MobileHeader = () => {
  const { logout } = useAuthContext();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <Flex
        as="header"
        flexDir="row"
        justify="space-between"
        backgroundColor="green.500"
        padding={4}
        position="sticky"
        top={0}
        zIndex={2}
      >
        <IconButton
          as={HiOutlineMenuRef}
          aria-label="Menu"
          background="none"
          color="white"
          size="sm"
          onClick={() => setOpenMenu(true)}
          _hover={{
            background: "none",
          }}
        />
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
          size="sm"
          _hover={{
            color: "green.500",
            backgroundColor: "white",
          }}
        ></IconButton>
      </Flex>
      <MobileMenu isOpen={openMenu} onClose={() => setOpenMenu(false)} />
    </>
  );
};
