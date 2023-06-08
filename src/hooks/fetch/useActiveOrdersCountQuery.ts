import { UseQueryResult, useQuery } from "@tanstack/react-query";

import { OrderService } from "@services/order.service";
import { IActiveOrdersCountResponse } from "@models/IActiveOrdersCountResponse";

export const useActiveOrdersCountQuery = (): UseQueryResult<
  IActiveOrdersCountResponse,
  unknown
> => {
  const orderService = OrderService.getInstance();

  const query = useQuery({
    queryKey: ["orders-count"],
    queryFn: async (): Promise<IActiveOrdersCountResponse> => {
      return orderService.activeOrdersCount();
    },
    refetchInterval: 0.5 * 60000,
  });

  return query;
};
