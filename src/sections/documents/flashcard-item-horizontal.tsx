import type { CardProps } from '@mui/material/Card';
import type { Flashcard } from 'src/types';

import React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';

import { Label } from 'src/components/label';
import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';

import { FlashcardViewDialog } from 'src/sections/documents/flashcard-view-dialog';

// ----------------------------------------------------------------------

type Props = CardProps & {
  flashcard: Flashcard;
};

export function FlashcardItemHorizontal({ sx, flashcard, ...other }: Props) {
  const [openViewDialog, setOpenViewDialog] = React.useState(false);

  return (
    <>
      <Card sx={[{ display: 'flex' }, ...(Array.isArray(sx) ? sx : [sx])]} {...other}>
        <Stack spacing={1} sx={[(theme) => ({ flexGrow: 1, p: theme.spacing(3, 3, 2, 3) })]}>
          <Box
            sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
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

            <Box component="span" sx={{ typography: 'caption', color: 'text.disabled' }}>
              {fDate(flashcard.createdAt)}
            </Box>
          </Box>

          <Stack spacing={1} sx={{ flexGrow: 1 }}>
            <Typography
              variant="subtitle2"
              sx={[(theme) => ({ ...theme.mixins.maxLine({ line: 2 }) })]}
            >
              {flashcard.question}
            </Typography>

            <Typography
              variant="body2"
              sx={[(theme) => ({ ...theme.mixins.maxLine({ line: 2 }), color: 'text.secondary' })]}
            >
              {flashcard.answer}
            </Typography>
          </Stack>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={() => setOpenViewDialog(true)} size="small" color="default">
              <Iconify icon="solar:eye-bold" />
            </IconButton>
          </Box>
        </Stack>

        <Box
          sx={{
            p: 1,
            width: 180,
            height: 240,
            flexShrink: 0,
            position: 'relative',
            display: { xs: 'none', sm: 'block' },
          }}
        >
          <Image alt={flashcard._id} src={flashcard.image} sx={{ height: 1, borderRadius: 1.5 }} />
        </Box>
      </Card>
      {openViewDialog ? (
        <FlashcardViewDialog
          open={openViewDialog}
          title="Flashcard Details"
          flashcard={flashcard}
          onClose={() => setOpenViewDialog(false)}
        />
      ) : null}
    </>
  );
}
