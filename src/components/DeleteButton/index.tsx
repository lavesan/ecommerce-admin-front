import { IconButton } from "@chakra-ui/react";
import { HiOutlineTrashRef } from "@components/RefIcons";

import { useAppContext } from "@hooks/useAppContext";

interface IDeleteButtonProps {
  dialogTitle: string;
  dialogDescription: string;
  onDelete: VoidFunction;
}

export const DeleteButton = ({
  dialogTitle,
  dialogDescription,
  onDelete,
}: IDeleteButtonProps) => {
  const { showDialog } = useAppContext();

  const onShowDialog = () => {
    showDialog({
      title: dialogTitle,
      description: dialogDescription,
      okText: "Excluir",
      onConfirm: onDelete,
    });
  };

  return (
    <IconButton
      as={HiOutlineTrashRef}
      aria-label="remove"
      onClick={onShowDialog}
      title="Remover"
      colorScheme="red"
    />
  );
};
