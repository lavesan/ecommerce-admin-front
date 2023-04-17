import { Button, Flex, Heading } from "@chakra-ui/react";
import { AppTableActions } from "@components/AppTableActions";
import { HiPencilRef, HiShoppingCartRef } from "@components/RefIcons";
import { maskDate } from "@helpers/date.helper";
import { useAppContext } from "@hooks/useAppContext";
import { useResponsive } from "@hooks/useResponsive";
import { IFormatPaginateClient } from "@models/IFormatPaginateClient";
import { IPaginateClientRequest } from "@models/IPaginateClientRequest";
import { ITableColumn } from "@models/components/ITableColumn";
import {
  IPaginationRequest,
  IPaginationResponse,
} from "@models/pagination.models";
import { ClientService } from "@services/client.service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FilterForm } from "./FilterForm";
import { AppResponsiveTable } from "@components/AppResponsiveTable";
import { AppTable } from "@components/AppTable";
import { maskCpf } from "@helpers/format.helper";
import { ClientCard } from "./ClientCard";

const Clients = () => {
  const clientService = ClientService.getInstance();

  const { isMobile } = useResponsive();

  const navigate = useNavigate();

  const { setIsLoading } = useAppContext();

  const [data, setData] =
    useState<IPaginationResponse<IFormatPaginateClient>>();
  const [filter, setFilter] = useState<
    IPaginationRequest & Partial<IPaginateClientRequest>
  >({
    page: 0,
    size: 10,
  } as IPaginationRequest & Partial<IPaginateClientRequest>);

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
      id: "cpf",
      label: "CPF",
    },
    {
      id: "points",
      label: "Pontos",
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
    const result = await clientService
      .paginate(filter)
      .finally(() => setIsLoading(false));

    const mappedResult = {
      ...result,
      data: result.data.map(({ created_at, cpf, ...elem }) => ({
        ...elem,
        cpf: maskCpf(cpf),
        created_at: maskDate(created_at),
      })),
    };

    setData(mappedResult);
  };

  const onFilter = (filter: IPaginateClientRequest) => {
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
    navigate("/clientes/criar");
  };

  const goToEdit = (id: string) => {
    navigate(`/clientes/${id}`);
  };

  const goToOrders = (id: string) => {
    navigate(`/clientes/${id}/pedidos`);
  };

  useEffect(() => {
    paginateEnterprises();
  }, [filter]);

  return (
    <>
      <Heading marginBottom={8} size="lg">
        Listagem de clientes
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
            <ClientCard goToEdit={goToEdit} goToOrders={goToOrders} />
          </AppResponsiveTable>
        ) : (
          <AppTable
            caption="Listagem de clientes"
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

export default Clients;
