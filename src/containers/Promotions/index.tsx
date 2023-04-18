import { Button, Flex, Heading } from "@chakra-ui/react";
import { AppResponsiveTable } from "@components/AppResponsiveTable";
import { AppTable } from "@components/AppTable";
import { AppTableActions } from "@components/AppTableActions";
import { HiPencilRef } from "@components/RefIcons";
import { maskDate } from "@helpers/date.helper";
import { translateWeekDay } from "@helpers/format.helper";
import { useAppContext } from "@hooks/useAppContext";
import { useResponsive } from "@hooks/useResponsive";
import { IFormatPaginatePromotion } from "@models/IFormatPaginatePromotion";
import { IPaginatePromotionfilter } from "@models/IPaginatePromotionFilter";
import { ITableColumn } from "@models/components/ITableColumn";
import {
  IPaginationRequest,
  IPaginationResponse,
} from "@models/pagination.models";
import { PromotionService } from "@services/promotion.service";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FilterForm } from "./FilterForm";
import { PromotionCard } from "./PromotionCard";

const Promotions = () => {
  const promotionService = PromotionService.getInstance();

  const { id } = useParams();

  const { isMobile } = useResponsive();

  const navigate = useNavigate();

  const { setIsLoading } = useAppContext();

  const [data, setData] =
    useState<IPaginationResponse<IFormatPaginatePromotion>>();
  const [filter, setFilter] = useState<
    IPaginationRequest & Partial<IPaginatePromotionfilter>
  >({
    page: 0,
    size: 10,
  } as IPaginationRequest & Partial<IPaginatePromotionfilter>);

  const columns: ITableColumn[] = [
    {
      id: "weekDay",
      label: "Dia da semana",
    },
    {
      id: "name",
      label: "Nome",
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

  const paginatePromotions = async () => {
    const result = await promotionService
      .paginate({ enterpriseId: id, ...filter })
      .finally(() => setIsLoading(false));

    const mappedResult = {
      ...result,
      data: result.data.map(({ created_at, weekDay, ...elem }) => ({
        ...elem,
        weekDay: translateWeekDay(weekDay),
        created_at: maskDate(created_at),
      })),
    };

    setData(mappedResult);
  };

  const onFilter = (filter: IPaginatePromotionfilter) => {
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
    navigate(`/empresas/${id}/promocoes/criar`);
  };

  const goToEdit = (promotionId: string) => {
    navigate(`/empresas/${id}/promocoes/${promotionId}`);
  };

  useEffect(() => {
    paginatePromotions();
  }, [filter]);

  return (
    <>
      <Heading marginBottom={8} size="lg">
        Listagem de promoções
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
            <PromotionCard goToEdit={goToEdit} />
          </AppResponsiveTable>
        ) : (
          <AppTable
            caption="Listagem de promoções"
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

export default Promotions;
