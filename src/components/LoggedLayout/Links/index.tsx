import {
  HiShoppingBag,
  HiGift,
  HiServer,
  HiShoppingCart,
  HiOfficeBuilding,
  HiPresentationChartLine,
  HiUserGroup,
  HiThumbUp,
} from "react-icons/hi";

import { SidebarLink } from "../Sidebar/SidebarLink";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "@hooks/useAuthContext";

interface ILinksProps {
  onLinkClick?: VoidFunction;
}

export const Links = ({ onLinkClick = () => {} }: ILinksProps) => {
  const { pathname } = useLocation();

  const { isAdmin } = useAuthContext();

  return (
    <>
      {isAdmin && (
        <SidebarLink
          icon={HiUserGroup}
          to="/usuarios"
          label="Usuários"
          isActive={pathname.includes("/usuarios")}
          marginBottom={1}
          onClick={onLinkClick}
        />
      )}
      {isAdmin && (
        <SidebarLink
          icon={HiThumbUp}
          to="/clientes"
          label="Clientes"
          isActive={pathname.includes("/clientes")}
          marginBottom={1}
          onClick={onLinkClick}
        />
      )}
      <SidebarLink
        icon={HiOfficeBuilding}
        to="/empresas"
        label="Empresas"
        isActive={pathname.includes("/empresas")}
        marginBottom={1}
        onClick={onLinkClick}
      />
    </>
  );
};
