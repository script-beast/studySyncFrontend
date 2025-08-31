import type { NavSectionProps } from 'src/components/nav-section';

import { paths } from 'src/routes/paths';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  blog: icon('ic-blog'),
  blank: icon('ic-blank'),
  file: icon('ic-file'),
  dashboard: icon('ic-dashboard'),
};

// ----------------------------------------------------------------------

export const navData: NavSectionProps['data'] = [
  {
    subheader: 'Dashboard',
    items: [
      {
        title: 'Dashboard',
        path: paths.main.dashboard,
        icon: ICONS.dashboard,
        caption: 'View your dashboard',
        deepMatch: false,
      },
    ],
  },
  {
    subheader: 'Documents',
    items: [
      {
        title: 'Documents',
        path: paths.main.documents,
        icon: ICONS.file,
        caption: 'Manage your documents',
        deepMatch: false,
      },
      {
        title: 'Quiz',
        path: paths.main.quiz,
        icon: ICONS.blog,
        caption: 'Take quizzes',
        deepMatch: false,
      },
      {
        title: 'Flashcards',
        path: paths.main.flashcards,
        icon: ICONS.blank,
        caption: 'Create and manage flashcards',
        deepMatch: false,
      },
    ],
  },
];
