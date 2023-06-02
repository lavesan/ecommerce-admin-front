import { useToast } from "@chakra-ui/react";

type ToastStatus = "info" | "warning" | "success" | "error" | "loading";

interface IUseAppToastReturn {
  showToast: (params: {
    title: string;
    description?: string;
    status: ToastStatus;
  }) => void;
}

export const useAppToast = (): IUseAppToastReturn => {
  const toast = useToast();

  return {
    showToast: (params) => {
      toast({
        ...params,
        duration: 4000,
        isClosable: true,
      });
    },
  };
};
