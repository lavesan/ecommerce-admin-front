import { useQuery } from "@tanstack/react-query";

import { IPaginateEnterpriseFilter } from "@models/IPaginateEnterpriseFilter";
import {
  IPaginationRequest,
  IPaginationResponse,
} from "@models/pagination.models";
import { EnterpriseService } from "@services/enterprise.service";
import { useAppContext } from "@hooks/useAppContext";
import { maskCnpj } from "@helpers/format.helper";
import { maskDate } from "@helpers/date.helper";
import { IFormatPaginateEnterprise } from "@models/IFormatPaginateEnterprise";

export const usePaginateEnterprisesQuery = (
  filter: IPaginationRequest & Partial<IPaginateEnterpriseFilter>
) => {
  const enterpriseService = EnterpriseService.getInstance();

  const { setIsLoading } = useAppContext();

  const query = useQuery({
    queryKey: ["orders", filter],
    queryFn: async (): Promise<
      IPaginationResponse<IFormatPaginateEnterprise>
    > => {
      setIsLoading(true);
      const result = await enterpriseService.paginate(filter);

      const mappedResult = {
        ...result,
        data: result.data.map(({ created_at, cnpj, isDisabled, ...elem }) => ({
          ...elem,
          isDisabled: isDisabled ? "Sim" : "Não",
          cnpj: maskCnpj(cnpj),
          created_at: maskDate(created_at),
        })),
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
