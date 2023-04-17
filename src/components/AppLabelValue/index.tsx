import { Flex, Text } from "@chakra-ui/react";

interface IAppLabelValueProps {
  label: string;
  value: string | number;
}

export const AppLabelValue = ({ label, value }: IAppLabelValueProps) => {
  return (
    <Flex
      flexDir="row"
      align="center"
      justify="space-between"
      borderBottom="thin dotted"
      borderBottomColor="gray.600"
      marginBottom={2}
    >
      <Text fontWeight="600">{label}</Text>
      <Text>{value}</Text>
    </Flex>
  );
};
