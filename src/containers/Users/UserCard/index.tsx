import { Card, Flex, IconButton } from "@chakra-ui/react";
import { AppLabelValue } from "@components/AppLabelValue";
import { HiPencilRef } from "@components/RefIcons";
import { IFormatPaginateUser } from "@models/IFormatPaginateUser";

interface IUserCardProps extends IFormatPaginateUser {
  goToEdit: (id: string) => void;
}

export const UserCard = ({
  goToEdit,
  id,
  name,
  email,
  isAdmin,
  created_at,
}: IUserCardProps) => {
  return (
    <Card padding={4} marginBottom={4}>
      <Flex flexDir="row" align="center" justify="center" marginBottom={2}>
        <IconButton
          as={HiPencilRef}
          aria-label={`Editar-${id}`}
          onClick={() => goToEdit(id)}
          cursor="pointer"
          background="none"
          size="md"
          color="green.700"
          borderRadius="50%"
          title="Editar"
          padding={2}
        />
      </Flex>
      <AppLabelValue label="Nome" value={name} />
      <AppLabelValue label="email" value={email} />
      <AppLabelValue label="É admin" value={isAdmin} />
      <AppLabelValue label="Data de criação" value={created_at} />
    </Card>
  );
};
