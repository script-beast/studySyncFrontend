import type { DialogProps } from '@mui/material';
import type { Flashcard } from 'src/types';

import React from 'react';

import {
  Stack,
  Dialog,
  Typography,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@mui/material';

import { fDate } from 'src/utils/format-time';

import { Label } from 'src/components/label';

type flashcardViewDialogProps = DialogProps & {
  title: string;
  flashcard: Flashcard;
  open?: boolean;
  onClose: () => void;
};

export function FlashcardViewDialog({
  title,
  onClose,
  flashcard,
  open = true,
  ...other
}: flashcardViewDialogProps) {
  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={[(theme) => ({ p: theme.spacing(3, 3, 2, 3) })]}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={3}>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
          <Label
            variant="soft"
            color={
              flashcard.difficulty === 'easy'
                ? 'success'
                : flashcard.difficulty === 'medium'
                  ? 'warning'
                  : 'error'
            }
            sx={{ textTransform: 'capitalize' }}
          >
            {flashcard.difficulty}
          </Label>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ py: 3 }}>
        <Typography variant="h6" gutterBottom>
          {flashcard.question}
        </Typography>
        <DialogContentText sx={{ mb: 3 }}>{flashcard.answer}</DialogContentText>

        {flashcard.tags && flashcard.tags.length > 0 ? (
          <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap' }}>
            {flashcard.tags.map((tag) => (
              <Label key={tag} variant="soft" color="info">
                {tag}
              </Label>
            ))}
          </Stack>
        ) : null}

        <Typography variant="caption" gutterBottom>
          Document Name:{' '}
          {typeof flashcard.document === 'string' ? 'N/A' : flashcard.document?.title || 'N/A'}
        </Typography>
        <Typography variant="caption" gutterBottom sx={{ display: 'block' }}>
          Created At: {fDate(flashcard.createdAt)}
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
