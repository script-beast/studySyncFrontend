import type { Flashcard } from 'src/types';

import React from 'react';

import { Tab, Tabs, Typography } from '@mui/material';

import { _mock } from 'src/_mock';
import { flashcardsAPI } from 'src/lib/axios';
import { DashboardContent } from 'src/layouts/dashboard';

import { EmptyContent } from 'src/components/empty-content';

import { FlashcardList } from 'src/sections/documents/flashcard-list-horizontal';

const Flashcards = () => {
  const [allFlashcards, setAllFlashcards] = React.useState<Flashcard[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState('all');
  const [pageNumber, setPageNumber] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [totalCount, setTotalCount] = React.useState(0);

  const loadData = React.useCallback(async () => {
    setLoading(true);
    setAllFlashcards([]);
    try {
      const res = await flashcardsAPI.getAll(pageNumber + 1, pageSize, {
        difficulty: filter === 'all' ? undefined : filter,
      });
      setAllFlashcards(
        res.data.map((item) => ({
          ...item,
          image: _mock.image.cover(Math.floor(Math.random() * 23) + 1),
        }))
      );
      setPageNumber(res.pagination.current - 1);
      setTotalCount(res.pagination.total);
    } catch (error) {
      console.error('Error loading flashcards:', error);
    } finally {
      setLoading(false);
    }
  }, [filter, pageNumber, pageSize]);

  React.useEffect(() => {
    loadData();
  }, [filter, pageNumber, loadData, pageSize]);

  return (
    <DashboardContent>
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        My Flashcards
      </Typography>
      <Tabs value={filter} onChange={(e, v) => setFilter(v)} sx={{ mb: { xs: 3, md: 5 } }}>
        {['all', 'easy', 'medium', 'hard'].map((tab) => (
          <Tab key={tab} value={tab} label={tab} sx={{ textTransform: 'capitalize' }} />
        ))}
      </Tabs>

      {!allFlashcards.length && !loading ? <EmptyContent filled sx={{ py: 10 }} /> : null}
      {!!allFlashcards.length || loading ? (
        <FlashcardList
          flashcards={allFlashcards}
          loading={loading}
          page={pageNumber}
          rowsPerPage={pageSize}
          onPageChange={(_e, page) => setPageNumber(page)}
          onRowsPerPageChange={(e) => setPageSize(parseInt(e.target.value))}
          totalCount={totalCount}
        />
      ) : null}
    </DashboardContent>
  );
};

export default Flashcards;
