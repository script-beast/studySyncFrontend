import type { Flashcard } from 'src/types';

import React from 'react';

import Box from '@mui/material/Box';

import { TablePaginationCustom } from 'src/components/table';

import { FlashcardItemSkeleton } from './flashcard-skeleton';
import { FlashcardItemHorizontal } from './flashcard-item-horizontal';

// ----------------------------------------------------------------------

type Props = {
  flashcards: Flashcard[];
  loading?: boolean;
  page?: number;
  rowsPerPage?: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
  onRowsPerPageChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  totalCount?: number;
};

export function FlashcardList({
  flashcards,
  loading,
  page = 1,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
  totalCount = 0,
}: Props) {
  const renderLoading = () => <FlashcardItemSkeleton variant="horizontal" />;

  const renderList = () =>
    flashcards.map((ele) => <FlashcardItemHorizontal key={ele._id} flashcard={ele} />);

  return (
    <>
      <Box
        sx={{
          gap: 3,
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
        }}
      >
        {loading ? renderLoading() : renderList()}
      </Box>

      <TablePaginationCustom
        page={page}
        count={totalCount}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </>
  );
}
