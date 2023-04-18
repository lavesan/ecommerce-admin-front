import { Card, Flex, IconButton, Text } from "@chakra-ui/react";
import { AppLabelValue } from "@components/AppLabelValue";
import { HiPencilRef } from "@components/RefIcons";
import { IFormatPaginatePromotion } from "@models/IFormatPaginatePromotion";

interface IEnterpriseCard extends IFormatPaginatePromotion {
  goToEdit: (id: string) => void;
}

export const PromotionCard = ({
  id,
  weekDay,
  name,
  created_at,
  goToEdit,
}: IEnterpriseCard) => {
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
      <Text fontWeight="bold" fontSize="md" textAlign="center" marginBottom={2}>
        {id}
      </Text>
      <AppLabelValue label="Dia da semana" value={weekDay} />
      <AppLabelValue label="Nome" value={name} />
      <AppLabelValue label="Data de criação" value={created_at} />
    </Card>
  );
};
