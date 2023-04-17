import { Flex, IconButton } from "@chakra-ui/react";

interface IAppTableActionsProps {
  actions: {
    id: string;
    icon: any;
    title: string;
    onClick: (params: any) => void;
  }[];
}

export const AppTableActions = ({ actions }: IAppTableActionsProps) => {
  return (
    <Flex flexDir="row" justify="space-around">
      {actions.map(({ icon: Icon, id, title, onClick }) => (
        <IconButton
          key={`action-${title}-${id}`}
          as={Icon}
          aria-label={`action-${title}-${id}`}
          onClick={onClick}
          cursor="pointer"
          background="none"
          color="green.700"
          size="md"
          borderRadius="50%"
          title={title}
          padding={2}
        />
      ))}
    </Flex>
  );
};
