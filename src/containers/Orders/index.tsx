import { Badge, Heading } from "@chakra-ui/react";
import { AppTableActions } from "@components/AppTableActions";
import { HiEyeRef } from "@components/RefIcons";
import { useResponsive } from "@hooks/useResponsive";
import { IPaginateOrderFilter } from "@models/IPaginateOrderFilter";
import { ITableColumn } from "@models/components/ITableColumn";
import { IPaginationRequest } from "@models/pagination.models";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FilterForm } from "./FilterForm";
import { AppResponsiveTable } from "@components/AppResponsiveTable";
import { AppTable } from "@components/AppTable";
import { OrderCard } from "./OrderCard";
import { usePaginateOrdersQuery } from "@hooks/fetch/usePaginateOrdersQuery";

const Orders = () => {
  const { enterpriseId, clientId } = useParams();

  const { isMobile } = useResponsive();

  const navigate = useNavigate();

  const [filter, setFilter] = useState<
    IPaginationRequest & Partial<IPaginateOrderFilter>
  >({
    page: 0,
    size: 10,
  } as IPaginationRequest & Partial<IPaginateOrderFilter>);

  const { data } = usePaginateOrdersQuery({
    enterpriseId,
    clientId,
    ...filter,
  });

  const columns: ITableColumn[] = [
    {
      id: "clientName",
      label: "Cliente",
    },
    {
      id: "phone",
      label: "Telefone",
    },
    {
      id: "paymentType",
      label: "Tipo de pagamento",
      accessor: ({ paymentType }) => (
        <Badge colorScheme="green">{paymentType}</Badge>
      ),
    },
    {
      id: "status",
      label: "Status",
      accessor: ({ status }) => (
        <Badge colorScheme={status.scheme}>{status.label}</Badge>
      ),
    },
    {
      id: "totalValue",
      label: "Valor total",
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
              title: "Visualizar",
              icon: HiEyeRef,
              onClick: () => goToView(id),
            },
          ]}
        />
      ),
    },
  ];

  const onFilter = (filter: IPaginateOrderFilter) => {
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

  const goToView = (orderId: string) => {
    if (enterpriseId) navigate(`/empresas/${enterpriseId}/pedidos/${orderId}`);
    if (clientId) navigate(`/clientes/${clientId}/pedidos/${orderId}`);
  };

  return (
    <>
      <Heading marginBottom={8} size="lg">
        Listagem de pedidos
      </Heading>
      <FilterForm onFilter={onFilter} marginBottom={8} />
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
            <OrderCard goToView={goToView} />
          </AppResponsiveTable>
        ) : (
          <AppTable
            caption="Listagem de pedidos"
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

export default Orders;
