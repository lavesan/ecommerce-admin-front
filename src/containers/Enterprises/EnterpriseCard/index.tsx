import { Card, Flex, IconButton, Text } from "@chakra-ui/react";
import { AppLabelValue } from "@components/AppLabelValue";
import { IFormatPaginateEnterprise } from "@models/IFormatPaginateEnterprise";
import { forwardRef } from "react";
import { HiPencil } from "react-icons/hi";

const HiPencilRef = forwardRef((props, ref) => <HiPencil {...props} />);

interface IEnterpriseCard extends IFormatPaginateEnterprise {
  goToEdit: (id: string) => void;
}

export const EnterpriseCard = ({
  id,
  cnpj,
  name,
  created_at,
  goToEdit,
}: IEnterpriseCard) => {
  return (
    <Card padding={4} marginBottom={4}>
      <Flex justify="center" marginBottom={2}>
        <IconButton
          key={`Editar-${id}`}
          as={HiPencilRef}
          aria-label={`Editar-${id}`}
          onClick={() => goToEdit(id)}
          cursor="pointer"
          background="none"
          size="md"
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
