import { useActiveOrdersCountQuery } from "./fetch/useActiveOrdersCountQuery";

export const useOrdersContextConfig = () => {
  const { data: countData } = useActiveOrdersCountQuery();

  return {
    count: countData?.count || 0,
  };
};
