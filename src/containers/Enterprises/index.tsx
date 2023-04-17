import { Button, Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppTable } from "@components/AppTable";
import { maskDate } from "@helpers/date.helper";
import { maskCnpj } from "@helpers/format.helper";
import { useAppContext } from "@hooks/useAppContext";
import { IFormatPaginateEnterprise } from "@models/IFormatPaginateEnterprise";
import { IPaginateEnterpriseFilter } from "@models/IPaginateEnterpriseFilter";
import {
  IPaginationRequest,
  IPaginationResponse,
} from "@models/pagination.models";
import { EnterpriseService } from "@services/enterprise.service";
import { AppTableActions } from "@components/AppTableActions";
import { useResponsive } from "@hooks/useResponsive";
import { AppResponsiveTable } from "@components/AppResponsiveTable";
import { ITableColumn } from "@models/components/ITableColumn";
import { EnterpriseCard } from "./EnterpriseCard";
import { FilterForm } from "./FilterForm";
import {
  HiGiftRef,
  HiPencilRef,
  HiServerRef,
  HiShoppingCartRef,
} from "@components/RefIcons";

const Enterprises = () => {
  const enterpriseService = EnterpriseService.getInstance();

  const { isMobile } = useResponsive();

  const navigate = useNavigate();

  const { setIsLoading } = useAppContext();

  const [data, setData] =
    useState<IPaginationResponse<IFormatPaginateEnterprise>>();
  const [filter, setFilter] = useState<
    IPaginationRequest & Partial<IPaginateEnterpriseFilter>
  >({
    page: 0,
    size: 10,
  } as IPaginationRequest & Partial<IPaginateEnterpriseFilter>);

  const columns: ITableColumn[] = [
    {
      id: "email",
      label: "Email",
    },
    {
      id: "name",
      label: "Nome",
    },
    {
      id: "cnpj",
      label: "CNPJ",
    },
    {
      id: "created_at",
      label: "Data de criação",
    },
    {
      id: "id",
      label: "Ações",
      accessor: ({ id }) => (
        <AppTableActions
          actions={[
            {
              id,
              title: "Pedidos",
              icon: HiShoppingCartRef,
              onClick: () => goToOrders(id),
            },
            {
              id,
              title: "Categorias",
              icon: HiServerRef,
              onClick: () => goToCategories(id),
            },
            {
              id,
              title: "Promoções",
              icon: HiGiftRef,
              onClick: () => goToPromotions(id),
            },
            {
              id,
              title: "Editar",
              icon: HiPencilRef,
              onClick: () => goToEdit(id),
            },
          ]}
        />
      ),
    },
  ];

  const paginateEnterprises = async () => {
    const result = await enterpriseService
      .paginate(filter)
      .finally(() => setIsLoading(false));

    const mappedResult = {
      ...result,
      data: result.data.map(({ created_at, cnpj, ...elem }) => ({
        ...elem,
        cnpj: maskCnpj(cnpj),
        created_at: maskDate(created_at),
      })),
    };

    setData(mappedResult);
  };

  const onFilter = (filter: IPaginateEnterpriseFilter) => {
    setFilter({
      page: 0,
      size: 10,
      ...filter,
    });
  };

  const onPageChange = (newPage: number) => {
    setFilter((actual) => ({
      ...actual,
      page: newPage,
    }));
  };

  const goToAdd = () => {
    navigate("/empresas/criar");
  };

  const goToEdit = (id: string) => {
    navigate(`/empresas/${id}`);
  };

  const goToCategories = (id: string) => {
    navigate(`/empresas/${id}/categorias`);
  };

  const goToOrders = (id: string) => {
    navigate(`/empresas/${id}/pedidos`);
  };

  const goToPromotions = (id: string) => {
    navigate(`/empresas/${id}/promocoes`);
  };

  useEffect(() => {
    paginateEnterprises();
  }, [filter]);

  return (
    <>
      <Heading marginBottom={8} size="lg">
        Listagem de empresas
      </Heading>
      <Flex
        flexDir={["column-reverse", "row"]}
        justify="space-between"
        marginBottom={8}
      >
        <FilterForm onFilter={onFilter} />
        <Button onClick={goToAdd} colorScheme="green" marginBottom={[4, 0]}>
          Adicionar
        </Button>
      </Flex>
      {data &&
        (isMobile ? (
          <AppResponsiveTable
            rows={data.data}
            count={data.count}
            size={data.size}
            page={data.page + 1}
            onPageChange={onPageChange}
          >
            {/* @ts-ignore */}
            <EnterpriseCard
              goToEdit={goToEdit}
              goToCategories={goToCategories}
              goToOrders={goToOrders}
              goToPromotions={goToPromotions}
            />
          </AppResponsiveTable>
        ) : (
          <AppTable
            caption="Listagem de empresas"
            columns={columns}
            rows={data.data}
            count={data.count}
            size={data.size}
            page={data.page + 1}
            onPageChange={onPageChange}
          />
        ))}
    </>
  );
};

export default Enterprises;
