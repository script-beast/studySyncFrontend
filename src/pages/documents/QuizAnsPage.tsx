import type { QuizResult, QuizAttempt } from 'src/types';

import React from 'react';
import { useParams, useNavigate } from 'react-router';

import { Button, Chip, Stack, Typography } from '@mui/material';

import { fDate } from 'src/utils/format-time';

import { quizzesAPI } from 'src/lib/axios';
import { DashboardContent } from 'src/layouts/dashboard';

import { toast } from 'src/components/snackbar';
import { EmptyContent } from 'src/components/empty-content';
import { LoadingScreen } from 'src/components/loading-screen';

import { QuizNav } from 'src/sections/documents/quiz-nav';
import { QuizLayout } from 'src/sections/documents/quiz-layout';
import { QuizQuestion } from 'src/sections/documents/quiz-question';
import { useCollapseNav } from 'src/sections/documents/hooks/use-collapse-nav';

const QuizAnsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const questionsNav = useCollapseNav();

  const [details, setDetails] = React.useState<QuizAttempt | null>(null);
  const [quizQuestions, setQuizQuestions] = React.useState<QuizResult[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(-1);

  const loadData = async () => {
    setLoading(true);
    try {
      if (!id) {
        navigate('/app/documents');
        return;
      }
      const res = await quizzesAPI.getAttempt(id);

      if (res.quiz) {
        const quiz = res.quiz;
        const items =
          quiz.items?.map((e) => ({
            ...e,
            answer: e.userAnswer || '',
          })) || [];
        setQuizQuestions(items);
        delete quiz.items;
        setDetails(quiz);
        setSelectedIndex(-1);
        toast.success('Quiz loaded successfully!');
      } else {
        // navigate('/app/documents');
      }
    } catch (error) {
      console.error('Error loading quiz:', error);
      // navigate('/app/documents');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (!id) return;
    loadData();
  }, [id]);

  const handleChangeQuestion = (index: number) => setSelectedIndex(index);

  const handleSubmitAnswer = (answer: string) =>
    setQuizQuestions((p) => p.map((q, idx) => (idx === selectedIndex ? { ...q, answer } : q)));

  if (!id) {
    navigate('/app/documents');
    return null;
  }

  return (
    <DashboardContent>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Quiz Result
      </Typography>
      {loading && <LoadingScreen sx={{ pb: 7 }} />}

      {details ? (
        <>
          <Typography variant="h6" align="center">
            {details.title}
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary">
            Created at: {fDate(details.createdAt)} | Attempted at: {fDate(details.attemptedDate)}
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: { xs: 3, md: 5 } }}
            align="center"
            color="text.secondary"
          >
            Duration {details.duration} seconds | Score: {details.score}%
          </Typography>
          <QuizLayout
            slots={{
              header:
                selectedIndex !== -1 ? (
                  <Stack direction="row" spacing={2} alignItems="center">
                    {quizQuestions[selectedIndex]?.tags.map((tag, idx) => (
                      <Chip
                        variant="soft"
                        key={idx}
                        label={tag}
                        size="small"
                        sx={{ textTransform: 'capitalize' }}
                      />
                    ))}
                  </Stack>
                ) : (
                  <Typography variant="subtitle1">Select a question to view result</Typography>
                ),
              nav: (
                <QuizNav
                  selectedId={selectedIndex}
                  collapseNav={questionsNav}
                  quiz={quizQuestions}
                  handleChangeQuestion={handleChangeQuestion}
                  isResult
                />
              ),
              main: (
                <>
                  {selectedIndex !== -1 ? (
                    <QuizQuestion
                      question={quizQuestions[selectedIndex]}
                      handleAnswer={handleSubmitAnswer}
                      isResult
                    />
                  ) : (
                    <EmptyContent
                      title="Let's view a quiz!"
                      description="Select a question to view the result."
                      imgUrl="/assets/icons/empty/ic-content.svg"
                    />
                  )}
                </>
              ),
              details: null,
            }}
          />
          <Stack
            spacing={2}
            direction={{ xs: 'column-reverse', md: 'row' }}
            justifyContent="space-between"
            sx={{ my: 1 }}
          >
            <Stack spacing={1}>
              <Button variant="soft" onClick={() => navigate('/app/documents')}>
                Back to Documents
              </Button>
            </Stack>
            <Stack spacing={1} alignItems="flex-end" direction="row">
              <Button
                variant="outlined"
                onClick={() => selectedIndex > 0 && handleChangeQuestion(selectedIndex - 1)}
                disabled={selectedIndex <= 0}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                onClick={() =>
                  selectedIndex < quizQuestions.length - 1 &&
                  handleChangeQuestion(selectedIndex + 1)
                }
                disabled={selectedIndex === quizQuestions.length - 1}
              >
                Next
              </Button>
            </Stack>
          </Stack>
        </>
      ) : null}
    </DashboardContent>
  );
};

export default QuizAnsPage;
