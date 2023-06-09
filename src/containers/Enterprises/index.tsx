import { Button, Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppTable } from "@components/AppTable";
import { IPaginateEnterpriseFilter } from "@models/IPaginateEnterpriseFilter";
import { IPaginationRequest } from "@models/pagination.models";
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
import { useAuthContext } from "@hooks/useAuthContext";
import { usePaginateEnterprisesQuery } from "@hooks/fetch/usePaginateEnterprisesQuery";

const Enterprises = () => {
  const { isMobile } = useResponsive();

  const navigate = useNavigate();

  const { isAdmin } = useAuthContext();

  const [filter, setFilter] = useState<
    IPaginationRequest & Partial<IPaginateEnterpriseFilter>
  >({
    page: 0,
    size: 10,
  } as IPaginationRequest & Partial<IPaginateEnterpriseFilter>);

  const { data } = usePaginateEnterprisesQuery(filter);

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
      id: "isDisabled",
      label: "Está desabilitada",
    },
    {
      id: "id",
      label: "Ações",
      accessor: ({ id, openOrdersCount }) => (
        <AppTableActions
          actions={
            isAdmin
              ? [
                  {
                    id,
                    title: "Pedidos",
                    icon: HiShoppingCartRef,
                    badgeText: openOrdersCount,
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
                ]
              : [
                  {
                    id,
                    title: "Pedidos",
                    icon: HiShoppingCartRef,
                    onClick: () => goToOrders(id),
                  },
                ]
          }
        />
      ),
    },
  ];

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
        {isAdmin && (
          <Button onClick={goToAdd} colorScheme="green" marginBottom={[4, 0]}>
            Adicionar
          </Button>
        )}
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
