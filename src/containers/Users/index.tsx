import { Button, Flex, Heading } from "@chakra-ui/react";
import { AppResponsiveTable } from "@components/AppResponsiveTable";
import { AppTable } from "@components/AppTable";
import { AppTableActions } from "@components/AppTableActions";
import { HiPencilRef } from "@components/RefIcons";
import { maskDate } from "@helpers/date.helper";
import { useAppContext } from "@hooks/useAppContext";
import { useResponsive } from "@hooks/useResponsive";
import { IFormatPaginateUser } from "@models/IFormatPaginateUser";
import { IPaginateUserFilter } from "@models/IPaginateUserFilter";
import { ITableColumn } from "@models/components/ITableColumn";
import {
  IPaginationRequest,
  IPaginationResponse,
} from "@models/pagination.models";
import { UserService } from "@services/user.service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FilterForm } from "./FilterForm";
import { UserCard } from "./UserCard";

const Users = () => {
  const userService = UserService.getInstance();

  const { isMobile } = useResponsive();

  const navigate = useNavigate();

  const { setIsLoading } = useAppContext();

  const [data, setData] = useState<IPaginationResponse<IFormatPaginateUser>>();
  const [filter, setFilter] = useState<
    IPaginationRequest & Partial<IPaginateUserFilter>
  >({
    page: 0,
    size: 10,
  } as IPaginationRequest & Partial<IPaginateUserFilter>);

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
      id: "isAdmin",
      label: "É admin",
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
              title: "Editar",
              icon: HiPencilRef,
              onClick: () => goToEdit(id),
            },
          ]}
        />
      ),
    },
  ];

  const paginateUsers = async () => {
    setIsLoading(true);
    const result = await userService
      .paginate(filter)
      .finally(() => setIsLoading(false));

    const mappedResult = {
      ...result,
      data: result.data.map(({ created_at, isAdmin, ...elem }) => ({
        ...elem,
        isAdmin: isAdmin ? "Sim" : "Não",
        created_at: maskDate(created_at),
      })),
    };

    setData(mappedResult);
  };

  const onFilter = (filter: IPaginateUserFilter) => {
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
    navigate("/usuarios/criar");
  };

  const goToEdit = (id: string) => {
    navigate(`/usuarios/${id}`);
  };

  useEffect(() => {
    paginateUsers();
  }, [filter]);

  return (
    <>
      <Heading marginBottom={8} size="lg">
        Listagem de usuários
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
            <UserCard goToEdit={goToEdit} />
          </AppResponsiveTable>
        ) : (
          <AppTable
            caption="Listagem de usuários"
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

export default Users;
