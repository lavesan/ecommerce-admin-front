import { useQuery } from "react-query";

import { useAppContext } from "../useAppContext";
import { OrderService } from "@services/order.service";
import { IActiveOrdersCountResponse } from "@models/IActiveOrdersCountResponse";

export const useActiveOrdersCountQuery = () => {
  const orderService = OrderService.getInstance();

  const { setIsLoading } = useAppContext();

  const fetchActiveOrdersCount =
    async (): Promise<IActiveOrdersCountResponse> => {
      return orderService.activeOrdersCount();
    };

  return useQuery({
    queryKey: ["orders-count"],
    queryFn: fetchActiveOrdersCount,
    onSettled() {
      setIsLoading(false);
    },
    refetchInterval: 0.5 * 60000,
  });
};
