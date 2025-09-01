import type { QuizResult } from 'src/types';

import { Box, Radio, Stack, TextField, Typography, FormControlLabel } from '@mui/material';

import { Scrollbar } from 'src/components/scrollbar';

export interface QuizQuestionProps {
  question: QuizResult;
  handleAnswer: (answer: string) => void;
  isResult?: boolean;
}

export function QuizQuestion({ question, handleAnswer, isResult }: QuizQuestionProps) {
  return (
    <Scrollbar sx={{ px: 2.5, py: 3 }}>
      <Stack spacing={3}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          {question.prompt}
        </Typography>
        {question.kind === 'fill_blank' ? (
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your answer here..."
            value={question.answer || ''}
            onChange={(e) => handleAnswer(e.target.value)}
            disabled={isResult}
          />
        ) : question.kind === 'mcq' ? (
          <Stack spacing={1}>
            {question.options?.map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Radio
                    checked={option === question.answer}
                    onClick={() => handleAnswer(option)}
                    slotProps={{ input: { id: `${option}-radio` } }}
                  />
                }
                label={option}
                sx={{ ...(option === 'all' && { textTransform: 'capitalize' }) }}
                disabled={isResult}
              />
            ))}
          </Stack>
        ) : (
          <Stack spacing={1}>
            <FormControlLabel
              control={
                <Radio
                  checked={question.answer === 'True'}
                  onClick={() => handleAnswer('True')}
                  slotProps={{ input: { id: 'true-radio' } }}
                />
              }
              label="True"
              disabled={isResult}
            />
            <FormControlLabel
              control={
                <Radio
                  checked={question.answer === 'False'}
                  onClick={() => handleAnswer('False')}
                  slotProps={{ input: { id: 'false-radio' } }}
                />
              }
              label="False"
              disabled={isResult}
            />
          </Stack>
        )}
        {isResult && (
          <Stack spacing={1}>
            <Typography
              variant="subtitle1"
              color={question.isCorrect ? 'success.main' : 'error.main'}
            >
              Correct Answer: {question.correctAnswer}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Explanation: {question.explanation}
            </Typography>
          </Stack>
        )}
      </Stack>
    </Scrollbar>
  );
}
