import type { CardProps } from '@mui/material/Card';
import type { Document } from 'src/types';

import { toast } from 'sonner';
import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import { Stack, Button } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';

import { fDate } from 'src/utils/format-time';

import { quizzesAPI, documentsAPI } from 'src/lib/axios';

import { Iconify } from 'src/components/iconify';
import { FileThumbnail } from 'src/components/file-thumbnail';

// ----------------------------------------------------------------------

type Props = CardProps & {
  document: Document;
  loadDocuments: () => Promise<void>;
};

export function DocumentItem({ document, sx, loadDocuments, ...other }: Props) {
  const navigate = useNavigate();

  const handleGenerateFlashcards = async () => {
    await documentsAPI.generateFlashcard(document._id);
    loadDocuments();
  };

  // const handleGenerateQuiz = async () => {
  //   const res = await
  // };

  const onGenerateQuiz = () => {
    toast.promise(quizzesAPI.generateQuiz.bind(null, document._id), {
      loading: 'Generating quiz...',
      success: (res) => {
        navigate(`/app/quiz/${res.quizId}`);
        return 'Quiz generated !!';
      },
      error: (err) => `${err.message}`,
      closeButton: false,
    });
  };

  const onGenerateFlashcards = () => {
    toast.promise(handleGenerateFlashcards, {
      loading: 'Generating flashcards...',
      success: 'Flashcards generated !!',
      error: (err) => `${err.message}`,
      closeButton: false,
    });
  };

  return (
    <Card sx={sx} {...other}>
      <Stack height="100%">
        <Box sx={{ p: 3, pb: 2, flex: 1 }}>
          <FileThumbnail file={document.originalName} />
          <ListItemText
            sx={{ mb: 1 }}
            primary={document.title}
            secondary={`Uploaded date: ${fDate(document.createdAt)}`}
            slotProps={{
              primary: { sx: { typography: 'subtitle1' } },
              secondary: { sx: { mt: 1, typography: 'caption', color: 'text.disabled' } },
            }}
          />

          <Box
            sx={{
              gap: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'primary.main',
              typography: 'caption',
            }}
          >
            <Iconify width={16} icon="solar:smartphone-2-bold" />
            {document.flashcards ?? 0} Flashcards
          </Box>
          <Box
            sx={{
              gap: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'primary.main',
              typography: 'caption',
            }}
          >
            <Iconify width={16} icon="ic:round-view-list" />
            {document.quizzes ?? 0} Quizzes
          </Box>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />
        <Stack
          p={2}
          direction={{ xs: 'column', lg: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
        >
          {!document.flashCardStatus ? (
            <Button variant="contained" size="small" onClick={onGenerateFlashcards} fullWidth>
              Get Flashcards
            </Button>
          ) : null}
          <Button
            variant="contained"
            size="small"
            onClick={onGenerateQuiz}
            fullWidth
            // fullWidth={document.flashCardStatus}
          >
            Generate Quiz
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
