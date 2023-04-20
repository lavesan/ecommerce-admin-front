import { Flex, StyleProps, Text } from "@chakra-ui/react";

interface IAppLabelValueProps extends StyleProps {
  label: string;
  value?: string | number | JSX.Element;
}

export const AppLabelValue = ({
  label,
  value,
  ...style
}: IAppLabelValueProps) => {
  return (
    <Flex
      flexDir="row"
      align="center"
      justify="space-between"
      borderBottom="thin dotted"
      borderBottomColor="gray.600"
      marginBottom={2}
      {...style}
    >
      <Text fontWeight="600">{label}</Text>
      <Text>{value}</Text>
    </Flex>
  );
};
