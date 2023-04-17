import { Card, Flex, IconButton, Text } from "@chakra-ui/react";
import { AppLabelValue } from "@components/AppLabelValue";
import {
  HiGiftRef,
  HiPencilRef,
  HiServerRef,
  HiShoppingCartRef,
} from "@components/RefIcons";
import { IFormatPaginateEnterprise } from "@models/IFormatPaginateEnterprise";

interface IEnterpriseCard extends IFormatPaginateEnterprise {
  goToEdit: (id: string) => void;
  goToCategories: (id: string) => void;
  goToOrders: (id: string) => void;
  goToPromotions: (id: string) => void;
}

export const EnterpriseCard = ({
  id,
  cnpj,
  name,
  created_at,
  goToEdit,
  goToCategories,
  goToOrders,
  goToPromotions,
}: IEnterpriseCard) => {
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
          as={HiServerRef}
          aria-label={`Categorias-${id}`}
          onClick={() => goToCategories(id)}
          cursor="pointer"
          background="none"
          size="md"
          color="green.700"
          borderRadius="50%"
          title="Categorias"
          padding={2}
        />
        <IconButton
          as={HiGiftRef}
          aria-label={`Promoções-${id}`}
          onClick={() => goToPromotions(id)}
          cursor="pointer"
          background="none"
          size="md"
          color="green.700"
          borderRadius="50%"
          title="Promoções"
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
      <AppLabelValue label="CNPJ" value={cnpj} />
      <AppLabelValue label="Data de criação" value={created_at} />
    </Card>
  );
};
