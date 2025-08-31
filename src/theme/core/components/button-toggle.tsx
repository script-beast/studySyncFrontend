import type { Theme, Components, ComponentsVariants } from '@mui/material/styles';

import { varAlpha } from 'minimal-shared/utils';

import { toggleButtonClasses } from '@mui/material/ToggleButton';

// ----------------------------------------------------------------------

const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'] as const;

/* **********************************************************************
 * 🗳️ Variants
 * **********************************************************************/
const colorVariants = [
  ...(COLORS.map((colorKey) => ({
    props: (props) => props.color === colorKey,
    style: ({ theme }) => ({
      '&:hover': {
        borderColor: varAlpha(theme.vars.palette[colorKey].mainChannel, 0.48),
        backgroundColor: varAlpha(
          theme.vars.palette[colorKey].mainChannel,
          theme.vars.palette.action.hoverOpacity
        ),
      },
    }),
  })) satisfies ComponentsVariants<Theme>['MuiToggleButton']),
] satisfies ComponentsVariants<Theme>['MuiToggleButton'];

const selectedVariants = [
  {
    props: (props) => !!props.selected,
    style: ({ theme }) => ({
      borderColor: 'currentColor',
      boxShadow: '0 0 0 0.75px currentColor',
      [`&.${toggleButtonClasses.disabled}`]: {
        color: theme.vars.palette.action.disabled,
        backgroundColor: theme.vars.palette.action.selected,
        borderColor: theme.vars.palette.action.disabledBackground,
      },
    }),
  },
] satisfies ComponentsVariants<Theme>['MuiToggleButton'];

/* **********************************************************************
 * 🧩 Components
 * **********************************************************************/
const MuiToggleButton: Components<Theme>['MuiToggleButton'] = {
  // ▼▼▼▼▼▼▼▼ 🎨 STYLE ▼▼▼▼▼▼▼▼
  styleOverrides: {
    root: ({ theme }) => ({
      fontWeight: theme.typography.fontWeightSemiBold,
      variants: [...colorVariants, ...selectedVariants],
    }),
  },
};

const MuiToggleButtonGroup: Components<Theme>['MuiToggleButtonGroup'] = {
  // ▼▼▼▼▼▼▼▼ 🎨 STYLE ▼▼▼▼▼▼▼▼
  styleOverrides: {
    root: ({ theme }) => ({
      gap: 4,
      padding: 4,
      border: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
    }),
    grouped: {
      border: 'none',
      boxShadow: 'none',
      borderRadius: 'inherit',
    },
  },
};

/* **********************************************************************
 * 🚀 Export
 * **********************************************************************/
export const toggleButton: Components<Theme> = {
  MuiToggleButton,
  MuiToggleButtonGroup,
};
