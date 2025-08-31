import type { QuizResult } from 'src/types';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import ListItemButton from '@mui/material/ListItemButton';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  collapse: boolean;
  onCloseMobile: () => void;
  quiz: QuizResult;
  idx: number;
  handleChangeQuestion: (index: number) => void;
  isResult?: boolean;
};

export function QuizNavItem({
  selected,
  collapse,
  quiz,
  idx,
  onCloseMobile,
  handleChangeQuestion,
  isResult = false,
}: Props) {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const handleClickQuiz = () => {
    if (!mdUp) onCloseMobile();
    handleChangeQuestion(idx);
  };

  return (
    <Box component="li" sx={{ display: 'flex' }}>
      <ListItemButton
        onClick={handleClickQuiz}
        sx={{ py: 1.5, px: 2.5, gap: 2, ...(selected && { bgcolor: 'action.selected' }) }}
      >
        <Avatar
          color={
            isResult ? (quiz.isCorrect ? 'success' : 'error') : quiz.answer ? 'info' : 'warning'
          }
          sx={{ width: 38, height: 38 }}
        >
          Q{idx + 1}
        </Avatar>

        {!collapse && (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ flexGrow: 1 }}
          >
            <ListItemText
              primary={`Question ${idx + 1}`}
              slotProps={{ primary: { noWrap: true } }}
            />

            <Chip
              variant="soft"
              color={
                quiz.difficulty === 'easy'
                  ? 'success'
                  : quiz.difficulty === 'medium'
                    ? 'warning'
                    : 'error'
              }
              size="small"
              label={quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
            />
          </Stack>
        )}
      </ListItemButton>
    </Box>
  );
}
