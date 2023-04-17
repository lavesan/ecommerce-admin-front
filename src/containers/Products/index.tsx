import { Button, Flex, Heading } from "@chakra-ui/react";
import { AppTableActions } from "@components/AppTableActions";
import { HiPencilRef } from "@components/RefIcons";
import { maskDate } from "@helpers/date.helper";
import { useAppContext } from "@hooks/useAppContext";
import { useResponsive } from "@hooks/useResponsive";
import { ITableColumn } from "@models/components/ITableColumn";
import {
  IPaginationRequest,
  IPaginationResponse,
} from "@models/pagination.models";
import { ProductService } from "@services/product.service";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FilterForm, IForm } from "./FilterForm";
import { AppResponsiveTable } from "@components/AppResponsiveTable";
import { AppTable } from "@components/AppTable";
import { ProductCard } from "./ProductCard";
import { IPaginateProductFilter } from "@models/IPaginateProductFilter";
import { IFormatPaginateProduct } from "@models/IFormatPaginateProduct";
import { maskMoney } from "@helpers/format.helper";

const Products = () => {
  const productService = ProductService.getInstance();

  const { id, categoryId } = useParams();
  const { isMobile } = useResponsive();

  const navigate = useNavigate();

  const { setIsLoading } = useAppContext();

  const [data, setData] =
    useState<IPaginationResponse<IFormatPaginateProduct>>();
  const [filter, setFilter] = useState<
    IPaginationRequest & Partial<IPaginateProductFilter>
  >({
    page: 0,
    size: 10,
  } as IPaginationRequest & Partial<IPaginateProductFilter>);

  const columns: ITableColumn[] = [
    {
      id: "name",
      label: "Nome",
    },
    {
      id: "isDisabled",
      label: "Está desabilitada",
    },
    {
      id: "value",
      label: "Valor",
    },
    {
      id: "givenPoints",
      label: "Pontos que dá",
    },
    {
      id: "sellPoints",
      label: "Pontos que é vendido",
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

  const paginateProducts = async () => {
    const result = await productService
      .paginate({ categoryId, ...filter })
      .finally(() => setIsLoading(false));

    const mappedResult = {
      ...result,
      data: result.data.map(({ created_at, isDisabled, value, ...elem }) => ({
        ...elem,
        value: maskMoney(value),
        isDisabled: isDisabled ? "Sim" : "Não",
        created_at: maskDate(created_at),
      })),
    };

    setData(mappedResult);
  };

  const onFilter = (filter: IForm) => {
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
    navigate(`/empresas/${id}/categorias/${categoryId}/produtos/criar`);
  };

  const goToEdit = (productId: string) => {
    navigate(`/empresas/${id}/categorias/${categoryId}/produtos/${productId}`);
  };

  useEffect(() => {
    paginateProducts();
  }, [filter, id]);

  return (
    <>
      <Heading marginBottom={8} size="lg">
        Listagem de produtos
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
            <ProductCard goToEdit={goToEdit} />
          </AppResponsiveTable>
        ) : (
          <AppTable
            caption="Listagem de produtos"
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

export default Products;
