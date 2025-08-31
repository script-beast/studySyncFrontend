import type { RouteObject } from 'react-router';

import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';

import { CONFIG } from 'src/global-config';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

import { usePathname } from '../hooks';

// ----------------------------------------------------------------------

const MainDashboard = lazy(() => import('src/pages/dashboard/main'));

const MyDocuments = lazy(() => import('src/pages/documents/MyDocuments'));
const Flashcards = lazy(() => import('src/pages/documents/Flashcards'));
const QuizPage = lazy(() => import('src/pages/documents/QuizPage'));
const QuizList = lazy(() => import('src/pages/documents/QuizList'));
const QuizAnsPage = lazy(() => import('src/pages/documents/QuizAnsPage'));
// ----------------------------------------------------------------------

function SuspenseOutlet() {
  const pathname = usePathname();
  return (
    <Suspense key={pathname} fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  );
}

const dashboardLayout = () => (
  <DashboardLayout>
    <SuspenseOutlet />
  </DashboardLayout>
);

export const mainRoutes: RouteObject[] = [
  {
    path: 'app',
    element: CONFIG.auth.skip ? dashboardLayout() : <AuthGuard>{dashboardLayout()}</AuthGuard>,
    children: [
      { element: <MainDashboard />, index: true },
      { element: <MyDocuments />, path: 'documents' },
      { element: <Flashcards />, path: 'flashcards' },
      { element: <QuizList />, path: 'quiz' },
      { element: <QuizPage />, path: 'quiz/:id' },
      { element: <QuizAnsPage />, path: 'attempt/:id' },
    ],
  },
];
