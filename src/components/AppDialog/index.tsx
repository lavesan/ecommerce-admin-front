import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  Button,
} from "@chakra-ui/react";

export interface IAppDialogProps {
  isOpen: boolean;
  onClose: VoidFunction;
  onConfirm: (params?: any) => void;
  title: string;
  description: string;
  confirmBody?: any;
  cancelText?: string;
  okText?: string;
}

export const AppDialog = ({
  isOpen,
  title,
  description,
  cancelText = "Voltar",
  okText = "Deletar",
  confirmBody,
  onClose,
  onConfirm,
}: IAppDialogProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  const confirmed = () => {
    onClose();
    onConfirm(confirmBody);
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{description}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {cancelText}
            </Button>
            <Button colorScheme="red" onClick={confirmed} ml={3}>
              {okText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
