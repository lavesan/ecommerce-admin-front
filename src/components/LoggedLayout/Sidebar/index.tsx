import { Flex, IconButton } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import {
  HiShoppingBag,
  HiGift,
  HiServer,
  HiShoppingCart,
  HiOfficeBuilding,
  HiPresentationChartLine,
  HiLogout,
  HiUserGroup,
  HiThumbUp,
} from "react-icons/hi";

import { SidebarLink } from "./SidebarLink";
import { useAppContext } from "@hooks/useAppContext";
import { forwardRef } from "react";

const HiLogoutWithRef = forwardRef((props, ref) => <HiLogout {...props} />);

export const Sidebar = () => {
  const { logout } = useAppContext();
  const { pathname } = useLocation();

  return (
    <Flex
      as="header"
      height="100vh"
      position="sticky"
      flexDir="column"
      padding={4}
      backgroundColor="green.500"
    >
      <SidebarLink
        icon={HiPresentationChartLine}
        to="/"
        label="Dashboard"
        isActive={pathname === "/"}
        marginBottom={1}
      />
      <SidebarLink
        icon={HiUserGroup}
        to="/usuarios"
        label="Usuários"
        isActive={pathname.includes("/usuarios")}
        marginBottom={1}
      />
      <SidebarLink
        icon={HiThumbUp}
        to="/clientes"
        label="Clientes"
        isActive={pathname.includes("/clientes")}
        marginBottom={1}
      />
      <SidebarLink
        icon={HiOfficeBuilding}
        to="/empresas"
        label="Empresas"
        isActive={pathname.includes("/empresas")}
        marginBottom={1}
      />
      <SidebarLink
        icon={HiServer}
        to="/categorias"
        label="Categorias"
        isActive={pathname.includes("/categorias")}
        marginBottom={1}
      />
      <SidebarLink
        icon={HiShoppingBag}
        to="/produtos"
        label="Produtos"
        isActive={pathname.includes("/produtos")}
        marginBottom={1}
      />
      <SidebarLink
        icon={HiGift}
        to="/promocoes"
        label="Promoções"
        isActive={pathname.includes("/promocoes")}
        marginBottom={1}
      />
      <SidebarLink
        icon={HiShoppingCart}
        to="/pedidos"
        label="Pedidos"
        isActive={pathname.includes("/pedidos")}
        marginBottom={1}
      />
      <IconButton
        as={HiLogoutWithRef}
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
