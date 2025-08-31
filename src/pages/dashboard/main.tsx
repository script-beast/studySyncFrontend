import type { dashboardProps } from 'src/types';

import React from 'react';

import { Box, Grid, Button } from '@mui/material';

import { dashboardAPI } from 'src/lib/axios';
import { DashboardContent } from 'src/layouts/dashboard';
import { appFeaturedList } from 'src/constants/appFeatured';
import {
  SeoIllustration,
  CheckoutIllustration,
  MotivationIllustration,
  ServerErrorIllustration,
} from 'src/assets/illustrations';

import { AppWelcome } from 'src/sections/app/app-welcome';
import { StatsBoxes } from 'src/sections/app/stats-boxes';
import { AppFeatured } from 'src/sections/app/app-featured';
import { FillerImage } from 'src/sections/app/filler-image';
import { AvgStatsData } from 'src/sections/app/avg-stats-data';
import { FlashcardTags } from 'src/sections/app/flashcard-tags';
import { QuizDifficulty } from 'src/sections/app/quiz-difficulty';
import { DeveloperLinks } from 'src/sections/app/developer-links';
import { AttemptedQuizzes } from 'src/sections/app/attempted-quizzes';
import { DocumentFlashcard } from 'src/sections/app/document-flashcard';

import { useAuthContext } from 'src/auth/hooks';

export default function Page() {
  const { user } = useAuthContext();

  const [data, setData] = React.useState<dashboardProps>({
    totalDoc: 0,
    totalFlashcard: 0,
    totalQuiz: 0,
    quizList: [],
    documentGenerated: 0,
    documentWaiting: 0,
    easyQuiz: 0,
    mediumQuiz: 0,
    hardQuiz: 0,
    totalQues: 0,
    avgDuration: 0,
    percentAvgDuration: 0,
    avgScore: 0,
    percentAvgScore: 0,
    totalFlashcardTags: 0,
    flashCardsTags: [],
  });

  const loadData = async () => {
    try {
      const response = await dashboardAPI.getStats();
      setData(response);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  React.useEffect(() => {
    loadData();
  }, []);

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <AppWelcome
            title={`Welcome back 👋 \n ${user?.name}`}
            description="Explore my new product for you to create your own AI flashcards and quizzes."
            img={<CheckoutIllustration sx={{ width: '190px' }} />}
            action={
              <Button variant="contained" color="primary" href="/app/documents">
                Get Started
              </Button>
            }
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <AppFeatured list={appFeaturedList} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <StatsBoxes
            title="Total Documents"
            total={data.totalDoc}
            icon={<ServerErrorIllustration hideBackground />}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <StatsBoxes
            title="Total Flashcards"
            total={data.totalFlashcard}
            icon={<MotivationIllustration hideBackground />}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <StatsBoxes
            title="Total Quizzes"
            total={data.totalQuiz}
            icon={<SeoIllustration hideBackground />}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <AttemptedQuizzes
            sx={{ height: '100%' }}
            title="Attempted Quizzes"
            list={data.quizList}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <DocumentFlashcard
            title="Document for Flashcard"
            chart={{
              series: [
                { label: 'Flashcard Generated', value: data.documentGenerated },
                { label: 'Waiting to Generate ', value: data.documentWaiting },
              ],
            }}
            sx={{ height: '100%' }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Box
            sx={{
              mb: 3,
              p: { md: 1 },
              display: 'flex',
              gap: { xs: 3, md: 1 },
              borderRadius: { md: 2 },
              flexDirection: 'column',
              bgcolor: { md: 'background.neutral' },
            }}
          >
            <Box
              sx={{
                p: { md: 1 },
                display: 'grid',
                gap: { xs: 3, md: 0 },
                borderRadius: { md: 2 },
                bgcolor: { md: 'background.paper' },
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
              }}
            >
              <FillerImage />

              <QuizDifficulty
                title="Quiz Difficulty Progress"
                data={[
                  {
                    status: 'Easy',
                    value:
                      data.totalQuiz === 0 ? 0 : Math.round((data.easyQuiz / data.totalQues) * 100),
                    quantity: data.easyQuiz,
                  },
                  {
                    status: 'Medium',
                    value:
                      data.totalQuiz === 0
                        ? 0
                        : Math.round((data.mediumQuiz / data.totalQues) * 100),
                    quantity: data.mediumQuiz,
                  },
                  {
                    status: 'Hard',
                    value:
                      data.totalQuiz === 0 ? 0 : Math.round((data.hardQuiz / data.totalQues) * 100),
                    quantity: data.hardQuiz,
                  },
                ]}
                sx={{ boxShadow: { md: 'none' } }}
              />
            </Box>

            <AvgStatsData
              chart={{
                series: [
                  {
                    label: 'Avg. Quiz Duration',
                    percent: data.percentAvgDuration,
                    total: data.avgDuration,
                  },
                  { label: 'Avg. Quiz Score', percent: data.percentAvgScore, total: data.avgScore },
                ],
              }}
              sx={{ boxShadow: { md: 'none' } }}
            />
          </Box>
          <DeveloperLinks
            title="Find the Developer"
            subheader="Connect with me on these platforms"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <FlashcardTags
            title="Flashcard Tags"
            totalCat={data.totalFlashcardTags}
            avgFlashcardPerCat={
              data.totalFlashcardTags
                ? parseFloat((data.totalFlashcard / data.totalFlashcardTags).toFixed(3))
                : 0
            }
            chart={{ series: data.flashCardsTags }}
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
