import { Flex, IconButton } from "@chakra-ui/react";
import { useAppContext } from "@hooks/useAppContext";
import { forwardRef, useState } from "react";
import { AiOutlinePoweroff } from "react-icons/ai";
import { HiOutlineMenu } from "react-icons/hi";
import { MobileMenu } from "./MobileMenu";

const AiOutlinePoweroffRef = forwardRef((props, ref) => (
  <AiOutlinePoweroff {...props} />
));

const HiOutlineMenuRef = forwardRef((props, ref) => (
  <HiOutlineMenu {...props} />
));

export const MobileHeader = () => {
  const { logout } = useAppContext();
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
