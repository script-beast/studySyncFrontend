import type { Quiz, QuizResult } from 'src/types';

import React from 'react';
import { useParams, useNavigate } from 'react-router';

import { Box, Chip, Stack, Button, Typography } from '@mui/material';

import { useQuizTimer } from 'src/hooks/use-quiz-timer';

import { fDate } from 'src/utils/format-time';

import { quizzesAPI } from 'src/lib/axios';
import { DashboardContent } from 'src/layouts/dashboard';

import { toast } from 'src/components/snackbar';
import { QuizTimer } from 'src/components/timer';
import { EmptyContent } from 'src/components/empty-content';
import { LoadingScreen } from 'src/components/loading-screen';

import { QuizNav } from 'src/sections/documents/quiz-nav';
import { QuizLayout } from 'src/sections/documents/quiz-layout';
import { QuizQuestion } from 'src/sections/documents/quiz-question';
import { useCollapseNav } from 'src/sections/documents/hooks/use-collapse-nav';

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const questionsNav = useCollapseNav();

  const [details, setDetails] = React.useState<Quiz | null>(null);
  const [quizQuestions, setQuizQuestions] = React.useState<QuizResult[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(-1);
  const [quizStarted, setQuizStarted] = React.useState(false);

  // Quiz timer hook - auto-start when quiz begins
  const timer = useQuizTimer({
    autoStart: false,
    onTick: (elapsed) => {
      // Optional: Auto-save progress every 30 seconds
      if (elapsed % 30 === 0 && elapsed > 0 && quizStarted) {
        // Could implement auto-save functionality here
      }
    },
  });

  const loadData = React.useCallback(async () => {
    setLoading(true);
    try {
      if (!id) {
        navigate('/app/documents');
        return;
      }
      const res = await quizzesAPI.getById(id);

      if (res.quiz) {
        const quiz = res.quiz;
        setQuizQuestions((quiz.items as QuizResult[]) ?? []);
        delete quiz.items;
        setDetails(quiz);
        setSelectedIndex(-1);
        toast.success('Quiz loaded successfully!');
      } else {
        navigate('/app/documents');
      }
    } catch (error) {
      console.error('Error loading quiz:', error);
      navigate('/app/documents');
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  React.useEffect(() => {
    if (!id) return;
    loadData();
  }, [id, loadData]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    timer.start();
    if (quizQuestions.length > 0) {
      setSelectedIndex(0);
    }
  };

  const handleChangeQuestion = (index: number) => {
    if (!quizStarted) {
      handleStartQuiz();
    }
    setSelectedIndex(index);
  };

  const handleSubmitAnswer = (answer: string) =>
    setQuizQuestions((p) => p.map((q, idx) => (idx === selectedIndex ? { ...q, answer } : q)));

  const handleSubmit = async () => {
    setLoading(true);
    timer.pause(); // Pause timer when submitting

    const answers = quizQuestions.map((q, indx) => ({
      questionIndex: indx,
      userAnswer: q.answer || '',
    }));

    try {
      await quizzesAPI.submitAttempt(id!, {
        answers,
        duration: timer.elapsedSeconds,
      });
      navigate('/app/documents');
      toast.success('Quiz submitted successfully!');
    } catch (error) {
      console.error('Error submitting quiz:', error);
      timer.resume(); // Resume timer if submission fails
    } finally {
      setLoading(false);
    }
  };

  if (!id) {
    navigate('/app/documents');
    return null;
  }

  return (
    <DashboardContent>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
        <Typography variant="h4">Quiz</Typography>
      </Stack>

      {loading && <LoadingScreen sx={{ pb: 7 }} />}

      {details ? (
        <>
          <Typography variant="h6" align="center">
            {details.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: { xs: 3, md: 2 } }}
            align="center"
            color="text.secondary"
          >
            Created at: {fDate(details.createdAt)}
          </Typography>

          {!quizStarted ? (
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Ready to start the quiz? Click &quot;Start Quiz&quot; or select any question to
                begin.
              </Typography>
              <Button variant="contained" onClick={handleStartQuiz} size="large">
                Start Quiz
              </Button>
            </Box>
          ) : (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
              mb={2}
            >
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

              <QuizTimer
                elapsedSeconds={timer.elapsedSeconds}
                isRunning={timer.isRunning}
                variant="elapsed"
              />
            </Stack>
          )}

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
                  <Typography variant="subtitle1">
                    {quizStarted ? 'Select a question to continue' : 'Select a question to start'}
                  </Typography>
                ),
              nav: (
                <QuizNav
                  selectedId={selectedIndex}
                  collapseNav={questionsNav}
                  quiz={quizQuestions}
                  handleChangeQuestion={handleChangeQuestion}
                />
              ),
              main: (
                <>
                  {selectedIndex !== -1 ? (
                    <QuizQuestion
                      question={quizQuestions[selectedIndex]}
                      handleAnswer={handleSubmitAnswer}
                    />
                  ) : (
                    <EmptyContent
                      title={quizStarted ? 'Continue with your quiz!' : "Let's start a quiz!"}
                      description={
                        quizStarted
                          ? 'Select a question from the sidebar to continue.'
                          : 'Select a question to solve the quiz.'
                      }
                      imgUrl="/assets/icons/empty/ic-content.svg"
                    />
                  )}
                </>
              ),
              details: null,
            }}
            sx={{ minHeight: 400 }}
          />
          <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2}>
            <Stack direction="row" spacing={2}>
              <Button variant="soft" onClick={() => navigate('/app/documents')}>
                Back to Documents
              </Button>
            </Stack>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!quizStarted}
              color={quizStarted ? 'primary' : 'inherit'}
            >
              Submit Quiz
            </Button>
          </Stack>
        </>
      ) : null}
    </DashboardContent>
  );
};

export default QuizPage;
