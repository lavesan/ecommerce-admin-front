import { Flex } from "@chakra-ui/react";
import { AppPagination } from "@components/AppPagination";
import React, { ReactElement, cloneElement } from "react";

interface IAppResponsiveTableProps {
  rows: { [key: string]: any }[];
  count: number;
  size: number;
  page: number;
  children: ReactElement;
  onPageChange: (page: number) => void;
}

export const AppResponsiveTable = ({
  rows,
  count,
  size,
  page,
  children,
  onPageChange,
}: IAppResponsiveTableProps) => {
  return (
    <>
      <Flex flexDir="column">
        {rows.map((row) => (
          <React.Fragment key={row.id}>
            {cloneElement(children, row)}
          </React.Fragment>
        ))}
      </Flex>
      <AppPagination
        count={count}
        size={size}
        page={page}
        pageRecords={rows.length}
        onPageChange={onPageChange}
      />
    </>
  );
};
