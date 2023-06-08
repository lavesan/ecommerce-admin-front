import { useQuery } from "@tanstack/react-query";

import { useAppContext } from "../useAppContext";
import { OrderService } from "@services/order.service";
import { IActiveOrdersCountResponse } from "@models/IActiveOrdersCountResponse";

export const usePaginateOrdersQuery = (page: number) => {
  const orderService = OrderService.getInstance();

  const { setIsLoading } = useAppContext();

  const fetchOrdersPagination =
    async (): Promise<IActiveOrdersCountResponse> => {
      return orderService.paginate({ page });
    };

  return useQuery({
    queryKey: ["orders", page],
    queryFn: fetchOrdersPagination,
    onSettled() {
      setIsLoading(false);
    },
    refetchInterval: 1 * 60000,
  });
};
