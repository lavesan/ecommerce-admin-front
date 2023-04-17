import { Card, Flex, IconButton } from "@chakra-ui/react";
import { AppLabelValue } from "@components/AppLabelValue";
import { HiPencilRef, HiShoppingBagRef } from "@components/RefIcons";
import { IFormatPaginateProduct } from "@models/IFormatPaginateProduct";

interface ICategoryCardProps extends IFormatPaginateProduct {
  goToEdit: (id: string) => void;
}

export const ProductCard = ({
  goToEdit,
  id,
  name,
  created_at,
  isDisabled,
  value,
  givenPoints,
  sellPoints,
}: ICategoryCardProps) => {
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
      <AppLabelValue label="Está desabilitada" value={isDisabled} />
      <AppLabelValue label="Valor" value={value} />
      <AppLabelValue label="Pontos que dá" value={givenPoints} />
      <AppLabelValue label="Pontos que é vendido" value={sellPoints} />
      <AppLabelValue label="Data de criação" value={created_at} />
    </Card>
  );
};
