import { UseQueryResult, useQuery } from "@tanstack/react-query";

import { useAppContext } from "../useAppContext";
import { OrderService } from "@services/order.service";
import { IOrder } from "@models/entities/IOrder";
import {
  IPaginationRequest,
  IPaginationResponse,
} from "@models/pagination.models";
import { IPaginateOrderFilter } from "@models/IPaginateOrderFilter";
import {
  maskMoney,
  maskPhone,
  translateOrderStatus,
  translatePaymentType,
} from "@helpers/format.helper";
import { maskDateTime } from "@helpers/date.helper";
import { IFormatPaginateOrder } from "@models/IFormatPaginateOrder";

export const usePaginateOrdersQuery = (
  filter: IPaginationRequest & IPaginateOrderFilter
): UseQueryResult<IPaginationResponse<IFormatPaginateOrder>, unknown> => {
  const orderService = OrderService.getInstance();

  const { setIsLoading } = useAppContext();

  const query = useQuery({
    queryKey: ["orders", filter],
    queryFn: async (): Promise<IPaginationResponse<IFormatPaginateOrder>> => {
      setIsLoading(true);
      const result = await orderService.paginate(filter);

      const mappedResult = {
        ...result,
        data: result.data.map(
          ({
            created_at,
            productsValue,
            freightValue,
            status,
            paymentType,
            client,
            ...elem
          }) => ({
            ...elem,
            clientName: client?.name || "",
            phone: maskPhone(client?.phone || ""),
            paymentType: translatePaymentType(paymentType),
            status: translateOrderStatus(status),
            totalValue: maskMoney(freightValue + productsValue),
            productsValue: maskMoney(productsValue),
            freightValue: maskMoney(freightValue),
            created_at: maskDateTime(created_at),
          })
        ),
      };

      return mappedResult;
    },
    onSettled() {
      setIsLoading(false);
    },
    refetchInterval: 0.5 * 60000,
  });

  return query;
};
