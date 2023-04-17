import { Button, Flex, Heading } from "@chakra-ui/react";
import { AppResponsiveTable } from "@components/AppResponsiveTable";
import { AppTable } from "@components/AppTable";
import { FilterForm, IForm } from "./FilterForm";
import { maskDate } from "@helpers/date.helper";
import { useResponsive } from "@hooks/useResponsive";
import { CategoryService } from "@services/category.service";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "@hooks/useAppContext";
import {
  IPaginationRequest,
  IPaginationResponse,
} from "@models/pagination.models";
import { IPaginateCategoryRequest } from "@models/IPaginateCategoryRequest";
import { useEffect, useState } from "react";
import { ITableColumn } from "@models/components/ITableColumn";
import { AppTableActions } from "@components/AppTableActions";
import { HiPencilRef, HiShoppingBagRef } from "@components/RefIcons";
import { IFormatPaginateCategory } from "@models/IFormatPaginateCategory";
import { CategoryCard } from "./CategoryCard";

const Categories = () => {
  const categoryService = CategoryService.getInstance();

  const { id } = useParams();
  const { isMobile } = useResponsive();

  const navigate = useNavigate();

  const { setIsLoading } = useAppContext();

  const [data, setData] =
    useState<IPaginationResponse<IFormatPaginateCategory>>();
  const [filter, setFilter] = useState<
    IPaginationRequest & Partial<IPaginateCategoryRequest>
  >({
    page: 0,
    size: 10,
  } as IPaginationRequest & Partial<IPaginateCategoryRequest>);

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
              title: "Produtos",
              icon: HiShoppingBagRef,
              onClick: () => goToProducts(id),
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

  const paginateCategories = async () => {
    const result = await categoryService
      .paginate({ enterpriseId: id, ...filter })
      .finally(() => setIsLoading(false));

    const mappedResult = {
      ...result,
      data: result.data.map(({ created_at, isDisabled, ...elem }) => ({
        ...elem,
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
    navigate(`/empresas/${id}/categorias/criar`);
  };

  const goToEdit = (categoryId: string) => {
    navigate(`/empresas/${id}/categorias/${categoryId}`);
  };

  const goToProducts = (categoryId: string) => {
    navigate(`/empresas/${id}/categorias/${categoryId}/produtos`);
  };

  useEffect(() => {
    paginateCategories();
  }, [filter, id]);

  return (
    <>
      <Heading marginBottom={8} size="lg">
        Listagem de categorias
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
            <CategoryCard goToEdit={goToEdit} goToProducts={goToProducts} />
          </AppResponsiveTable>
        ) : (
          <AppTable
            caption="Listagem de categorias"
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

export default Categories;
