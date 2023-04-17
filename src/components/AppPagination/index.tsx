import { Flex, Text, Icon } from "@chakra-ui/react";
import {
  Pagination,
  usePagination,
  PaginationPage,
  PaginationNext,
  PaginationPrevious,
  PaginationPageGroup,
  PaginationContainer,
} from "@ajna/pagination";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { theme } from "theme";

import { useMemo } from "react";

interface IAppPaginationProps {
  count: number;
  size: number;
  page: number;
  pageRecords: number;
  onPageChange: (page: number) => void;
}

export const AppPagination = ({
  count,
  size,
  page,
  pageRecords,
  onPageChange,
}: IAppPaginationProps) => {
  const resultsRecordText = useMemo(
    () =>
      `Mostrando ${pageRecords} de ${count} resultado${count > 1 ? "s" : ""}`,
    [count, pageRecords]
  );

  const { pages, pagesCount } = usePagination({
    total: count,
    limits: {
      outer: 2,
      inner: 2,
    },
    initialState: {
      pageSize: size,
      isDisabled: false,
      currentPage: page,
    },
  });

  const goToNextPage = () => {
    if (page < pagesCount) onPageChange(page);
  };

  const goToClickedPage = (libPage: number) => {
    if (page !== libPage) onPageChange(libPage - 1);
  };

  return (
    <Flex
      flexDir="row"
      justify="space-between"
      align="center"
      paddingInline={4}
    >
      <Text fontSize="small">{resultsRecordText}</Text>
      <Pagination pagesCount={count} currentPage={page} onPageChange={() => {}}>
        <PaginationContainer align="center" justify="space-between">
          <PaginationPrevious onClick={() => onPageChange(page - 2)}>
            <Icon as={HiChevronLeft} color="gray.600" />
          </PaginationPrevious>
          <PaginationPageGroup isInline align="center">
            {pages.map((libPage: number) => (
              <PaginationPage
                w={7}
                key={`pagination_page_${libPage}`}
                page={libPage}
                fontSize="sm"
                padding="0.5rem"
                borderRadius="50%"
                color="gray.600"
                width="1.5rem"
                height="1.5rem"
                transition="0.3s"
                onClick={() => goToClickedPage(libPage)}
                _hover={{
                  bg: theme?.colors?.green["300"] || "green",
                  color: "white",
                }}
                _current={{
                  bg: theme?.colors?.green["500"] || "green",
                  color: "white",
                }}
              />
            ))}
          </PaginationPageGroup>
          <PaginationNext onClick={goToNextPage}>
            <Icon as={HiChevronRight} color="gray.600" />
          </PaginationNext>
        </PaginationContainer>
      </Pagination>
    </Flex>
  );
};
