import type { Quiz } from 'src/types';
import type { TableHeadCellProps } from 'src/components/table';

import React from 'react';

import { Card, Table, TableBody, Typography } from '@mui/material';

import { quizzesAPI } from 'src/lib/axios';
import { DashboardContent } from 'src/layouts/dashboard';

import { Scrollbar } from 'src/components/scrollbar';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/table';

import { QuizTableRow } from 'src/sections/documents/quiz-table-row';

const QuizList = () => {
  const table = useTable();

  const [tableData, setTableData] = React.useState<Quiz[]>([]);
  const [total, setTotal] = React.useState(0);

  const loadData = async () => {
    try {
      const res = await quizzesAPI.getAll(table.page + 1, table.rowsPerPage);
      setTableData(res.data);
      setTotal(res.pagination.total);
    } catch (error) {
      console.error(error);
    }
  };

  const TABLE_HEAD: TableHeadCellProps[] = [
    { id: 'fileName', label: 'File Name', sx: { minWidth: 200 } },
    { id: 'items', label: 'Questions', width: 150 },
    { id: 'duration', label: 'Duration', width: 150 },
    { id: 'score', label: 'Score', width: 150 },
    { id: 'attempts', label: 'Attempt Date', width: 220 },
    { id: '', width: 88 },
  ];

  React.useEffect(() => {
    loadData();
  }, [table.page, table.rowsPerPage]);

  return (
    <DashboardContent>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Quiz List
      </Typography>
      <Card>
        <Scrollbar>
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
            <TableHeadCustom
              order={table.order}
              orderBy={table.orderBy}
              headCells={TABLE_HEAD}
              rowCount={[].length}
            />

            <TableBody>
              {tableData.map((row) => (
                <QuizTableRow key={row._id} row={row} />
              ))}

              <TableEmptyRows
                height={table.dense ? 56 : 56 + 20}
                emptyRows={emptyRows(table.page, table.rowsPerPage, [].length)}
              />

              <TableNoData notFound={!tableData.length} />
            </TableBody>
          </Table>
        </Scrollbar>

        <TablePaginationCustom
          page={table.page}
          dense={table.dense}
          count={total}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onChangeDense={table.onChangeDense}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </DashboardContent>
  );
};

export default QuizList;
