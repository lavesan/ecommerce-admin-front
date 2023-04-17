import {
  Table,
  TableCaption,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

import { ITableColumn } from "@models/components/ITableColumn";
import { AppPagination } from "@components/AppPagination";

interface IAppTableProps {
  caption: string;
  rows: { [key: string]: any }[];
  columns: ITableColumn[];
  count: number;
  size: number;
  page: number;
  onPageChange: (page: number) => void;
}

export const AppTable = ({
  caption,
  rows,
  columns,
  count,
  size,
  page,
  onPageChange,
}: IAppTableProps) => {
  return (
    <>
      <TableContainer w="100%">
        <Table w="100%" variant="simple">
          <TableCaption>{caption}</TableCaption>
          <Thead>
            <Tr>
              {columns.map(({ label, id }) => (
                <Th key={`column_${id}`}>{label}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {rows.map((elem, index) => (
              <Tr key={`row_${index}`}>
                {columns.map(({ id, accessor: Accessor }) => (
                  <Td key={`body_${id}`}>
                    {Accessor ? <Accessor {...elem} /> : elem[id]}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
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
