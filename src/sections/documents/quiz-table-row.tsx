import type { Quiz } from 'src/types';

import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { fDate } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  row: Quiz;
};

export function QuizTableRow({ row }: Props) {
  return (
    <TableRow hover tabIndex={-1}>
      <TableCell>
        <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
          <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
            {row.title}
            <Box component="span" sx={{ color: 'text.disabled' }}>
              Created : {fDate(row.createdAt)}
            </Box>
          </Stack>
        </Box>
      </TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.items?.length}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.duration}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.score}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>
        {row.attempted ? fDate(row.attemptedDate) : 'Not Attempted'}
      </TableCell>

      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {!row.attempted ? (
            <Tooltip title="Attempt Quiz" placement="top" arrow>
              <IconButton color="info" href={`/app/quiz/${row._id}`}>
                <Iconify icon="solar:pen-bold" width={20} height={20} />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Review Result" placement="top" arrow>
              <IconButton color="success" href={`/app/attempt/${row._id}`}>
                <Iconify icon="solar:document-bold" width={20} height={20} />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </TableCell>
    </TableRow>
  );
}
