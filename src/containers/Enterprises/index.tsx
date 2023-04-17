import { Button, Flex, Heading, IconButton } from "@chakra-ui/react";
import { forwardRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiPencil } from "react-icons/hi";

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

const HiPencilRef = forwardRef((props, ref) => <HiPencil {...props} />);

const Enterprises = () => {
  const enterpriseService = EnterpriseService.getInstance();

  const { isMobile } = useResponsive();

  const navigate = useNavigate();

  const { setIsLoading } = useAppContext();

  const [data, setData] =
    useState<IPaginationResponse<IFormatPaginateEnterprise>>();
  const [filter, setFilter] = useState<
    IPaginationRequest & IPaginateEnterpriseFilter
  >({
    page: 0,
    size: 10,
  } as IPaginationRequest & IPaginateEnterpriseFilter);

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

  useEffect(() => {
    paginateEnterprises();
  }, [filter]);

  return (
    <>
      <Flex flexDir="row" justify="space-between">
        <Heading marginBottom={8} size="lg">
          Listagem de empresas
        </Heading>
        <Button onClick={goToAdd} colorScheme="green">
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
            <EnterpriseCard goToEdit={goToEdit} />
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
