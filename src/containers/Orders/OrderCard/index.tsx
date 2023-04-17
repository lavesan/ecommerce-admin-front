import { Badge, Card, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { AppLabelValue } from "@components/AppLabelValue";
import { HiEyeRef } from "@components/RefIcons";
import { IFormatPaginateOrder } from "@models/IFormatPaginateOrder";
import { forwardRef } from "react";
import { HiPencil } from "react-icons/hi";

interface IEnterpriseCard extends IFormatPaginateOrder {
  goToView: (id: string) => void;
}

export const OrderCard = ({
  id,
  totalValue,
  paymentType,
  status,
  created_at,
  clientName,
  goToView,
}: IEnterpriseCard) => {
  return (
    <Card padding={4} marginBottom={4}>
      <Flex flexDir="row" align="center" justify="center" marginBottom={2}>
        <IconButton
          as={HiEyeRef}
          aria-label={`Visualizar-${id}`}
          onClick={() => goToView(id)}
          cursor="pointer"
          background="none"
          size="md"
          color="green.700"
          borderRadius="50%"
          title="Visualizar"
          padding={2}
        />
      </Flex>
      <Text fontWeight="bold" fontSize="md" textAlign="center" marginBottom={2}>
        {id}
      </Text>
      <AppLabelValue label="Cliente" value={clientName} />
      <AppLabelValue label="Valor total" value={totalValue} />
      <AppLabelValue label="Tipo de pagamento" value={paymentType} />
      <AppLabelValue
        label="Status"
        value={<Badge colorScheme={status.scheme}>{status.label}</Badge>}
      />
      <AppLabelValue label="Data de criação" value={created_at} />
    </Card>
  );
};
