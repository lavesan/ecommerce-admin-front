import { useMediaQuery } from "@chakra-ui/react";

export const useResponsive = () => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 880px)");

  return {
    isMobile: !isLargerThan1280,
  };
};
