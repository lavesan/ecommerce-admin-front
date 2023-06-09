import { Flex, IconButton } from "@chakra-ui/react";
import { IconBadge } from "@components/IconBadge";

interface IAppTableActionsProps {
  actions: {
    id: string;
    icon: any;
    title: string;
    badgeText?: string | number;
    onClick: (params: any) => void;
  }[];
}

export const AppTableActions = ({ actions }: IAppTableActionsProps) => {
  return (
    <Flex flexDir="row" justify="space-around">
      {actions.map(({ icon: Icon, id, title, badgeText = "", onClick }) => (
        <IconBadge text={badgeText}>
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
        </IconBadge>
      ))}
    </Flex>
  );
};
