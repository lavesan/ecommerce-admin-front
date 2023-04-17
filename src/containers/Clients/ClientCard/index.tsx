import { Card, Flex, IconButton } from "@chakra-ui/react";
import { AppLabelValue } from "@components/AppLabelValue";
import { HiPencilRef, HiShoppingCartRef } from "@components/RefIcons";
import { IFormatPaginateClient } from "@models/IFormatPaginateClient";

interface ICategoryCardProps extends IFormatPaginateClient {
  goToEdit: (categoryId: string) => void;
  goToOrders: (categoryId: string) => void;
}

export const ClientCard = ({
  goToEdit,
  goToOrders,
  id,
  name,
  email,
  cpf,
  points,
  created_at,
}: ICategoryCardProps) => {
  return (
    <Card padding={4} marginBottom={4}>
      <Flex flexDir="row" align="center" justify="center" marginBottom={2}>
        <IconButton
          as={HiShoppingCartRef}
          aria-label={`Pedidos-${id}`}
          onClick={() => goToOrders(id)}
          cursor="pointer"
          background="none"
          size="md"
          color="green.700"
          borderRadius="50%"
          title="Pedidos"
          padding={2}
        />
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
      <AppLabelValue label="Email" value={email} />
      <AppLabelValue label="CPF" value={cpf} />
      <AppLabelValue label="Pontos" value={points} />
      <AppLabelValue label="Data de criação" value={created_at} />
    </Card>
  );
};
