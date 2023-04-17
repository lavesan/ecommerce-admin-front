import { Card, Flex, IconButton } from "@chakra-ui/react";
import { AppLabelValue } from "@components/AppLabelValue";
import { HiPencilRef, HiShoppingBagRef } from "@components/RefIcons";
import { IFormatPaginateCategory } from "@models/IFormatPaginateCategory";

interface ICategoryCardProps extends IFormatPaginateCategory {
  goToEdit: (categoryId: string) => void;
  goToProducts: (categoryId: string) => void;
}

export const CategoryCard = ({
  goToEdit,
  goToProducts,
  id,
  name,
  created_at,
  isDisabled,
}: ICategoryCardProps) => {
  return (
    <Card padding={4} marginBottom={4}>
      <Flex flexDir="row" align="center" justify="center" marginBottom={2}>
        <IconButton
          as={HiShoppingBagRef}
          aria-label={`Produtos-${id}`}
          onClick={() => goToProducts(id)}
          cursor="pointer"
          background="none"
          size="md"
          color="green.700"
          borderRadius="50%"
          title="Produtos"
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
      <AppLabelValue label="Está desabilitada" value={isDisabled} />
      <AppLabelValue label="Data de criação" value={created_at} />
    </Card>
  );
};
