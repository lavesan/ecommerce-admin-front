import { Link } from "react-router-dom";
import { Link as ChakraLink, Icon, StyleProps } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface ISidebarLinkProps extends StyleProps {
  to: string;
  label: string;
  icon: IconType;
  isActive: boolean;
}

export const SidebarLink = ({
  to,
  label,
  icon,
  isActive,
  ...style
}: ISidebarLinkProps) => {
  return (
    <ChakraLink
      as={Link}
      to={to}
      display="flex"
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="center"
      color="white"
      padding={2}
      borderRadius={4}
      backgroundColor={isActive ? "green.800" : "none"}
      _hover={{
        backgroundColor: "green.800",
      }}
      {...style}
    >
      <Icon marginRight={2} as={icon} />
      {label}
    </ChakraLink>
  );
};
