import type { Theme, Components, ComponentsVariants } from '@mui/material/styles';

import { varAlpha } from 'minimal-shared/utils';

// ----------------------------------------------------------------------

const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'] as const;

/* **********************************************************************
 * 🗳️ Variants
 * **********************************************************************/
const colorVariants = [
  {
    props: (props) => props.color === 'inherit' && props.variant !== 'buffer',
    style: ({ theme }) => ({
      '&::before': {
        display: 'none',
      },
      backgroundColor: varAlpha(theme.vars.palette.text.primaryChannel, 0.24),
    }),
  },
  ...(COLORS.map((colorKey) => ({
    props: (props) => props.color === colorKey,
    style: ({ theme }) => ({
      backgroundColor: varAlpha(theme.vars.palette[colorKey].mainChannel, 0.24),
    }),
  })) satisfies ComponentsVariants<Theme>['MuiLinearProgress']),
] satisfies ComponentsVariants<Theme>['MuiLinearProgress'];

/* **********************************************************************
 * 🧩 Components
 * **********************************************************************/
const MuiLinearProgress: Components<Theme>['MuiLinearProgress'] = {
  // ▼▼▼▼▼▼▼▼ 🎨 STYLE ▼▼▼▼▼▼▼▼
  styleOverrides: {
    root: {
      borderRadius: 4,
      variants: [...colorVariants],
    },
    bar: {
      borderRadius: 'inherit',
    },
  },
};

/* **********************************************************************
 * 🚀 Export
 * **********************************************************************/
export const progress: Components<Theme> = {
  MuiLinearProgress,
};
