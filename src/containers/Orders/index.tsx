import { Badge, Heading } from "@chakra-ui/react";
import { AppTableActions } from "@components/AppTableActions";
import { HiEyeRef } from "@components/RefIcons";
import { useAppContext } from "@hooks/useAppContext";
import { useResponsive } from "@hooks/useResponsive";
import { IPaginateOrderFilter } from "@models/IPaginateOrderFilter";
import { ITableColumn } from "@models/components/ITableColumn";
import {
  IPaginationRequest,
  IPaginationResponse,
} from "@models/pagination.models";
import { OrderService } from "@services/order.service";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FilterForm } from "./FilterForm";
import { AppResponsiveTable } from "@components/AppResponsiveTable";
import {
  maskMoney,
  maskPhone,
  translateOrderStatus,
  translatePaymentType,
} from "@helpers/format.helper";
import { IFormatPaginateOrder } from "@models/IFormatPaginateOrder";
import { maskDateTime } from "@helpers/date.helper";
import { AppTable } from "@components/AppTable";
import { OrderCard } from "./OrderCard";

const Orders = () => {
  const orderService = OrderService.getInstance();

  const { enterpriseId, clientId } = useParams();

  const { isMobile } = useResponsive();

  const navigate = useNavigate();

  const { setIsLoading } = useAppContext();

  const [data, setData] = useState<IPaginationResponse<IFormatPaginateOrder>>();
  const [filter, setFilter] = useState<
    IPaginationRequest & Partial<IPaginateOrderFilter>
  >({
    page: 0,
    size: 10,
  } as IPaginationRequest & Partial<IPaginateOrderFilter>);

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

  const paginateOrders = async () => {
    const result = await orderService
      .paginate({
        enterpriseId,
        clientId,
        ...filter,
      })
      .finally(() => setIsLoading(false));

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

    setData(mappedResult);
  };

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

  useEffect(() => {
    paginateOrders();
  }, [filter]);

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
