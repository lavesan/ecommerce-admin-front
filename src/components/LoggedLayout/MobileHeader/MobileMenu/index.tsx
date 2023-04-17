import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Heading,
} from "@chakra-ui/react";
import { Links } from "@components/LoggedLayout/Links";
import { useUser } from "@hooks/useUser";

interface IMobileMenuProps {
  isOpen: boolean;
  onClose: VoidFunction;
}

export const MobileMenu = ({ isOpen, onClose }: IMobileMenuProps) => {
  const { name } = useUser();

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader backgroundColor="green.500">
          <Heading as="h2" size="sm" color="white">
            Olá, {name}
          </Heading>
        </DrawerHeader>

        <DrawerBody backgroundColor="green.500">
          <Links onLinkClick={onClose} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
