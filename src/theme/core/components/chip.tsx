import type { SvgIconProps } from '@mui/material/SvgIcon';
import type { Theme, Components, ComponentsVariants } from '@mui/material/styles';

import SvgIcon from '@mui/material/SvgIcon';
import { chipClasses } from '@mui/material/Chip';

// ----------------------------------------------------------------------

/**
 * TypeScript extension for MUI theme augmentation.
 * @to {@link file://./../../extend-theme-types.d.ts}
 */

export type ChipExtendVariant = {
  soft: true;
};

const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'] as const;

/* **********************************************************************
 * ♉️ Custom icons
 * **********************************************************************/
const DeleteIcon = (props: SvgIconProps) => (
  // https://icon-sets.iconify.design/solar/close-circle-bold/
  <SvgIcon {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10M8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 0 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 0 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06"
      clipRule="evenodd"
    />
  </SvgIcon>
);

/* **********************************************************************
 * 🗳️ Variants
 * **********************************************************************/
const filledVariants = [
  {
    props: (props) => props.variant === 'filled' && props.color === 'default',
    style: ({ theme }) => ({
      ...theme.mixins.filledStyles(theme, 'inherit', { hover: true }),
    }),
  },
] satisfies ComponentsVariants<Theme>['MuiChip'];

const outlinedVariants = [
  {
    props: (props) => props.variant === 'outlined' && props.color === 'default',
    style: ({ theme }) => ({
      borderColor: theme.vars.palette.shared.buttonOutlined,
    }),
  },
] satisfies ComponentsVariants<Theme>['MuiChip'];

const softVariants = [
  {
    props: (props) => props.variant === 'soft' && props.color === 'default',
    style: ({ theme }) => ({
      ...theme.mixins.softStyles(theme, 'inherit', { hover: true }),
    }),
  },
  ...(COLORS.map((colorKey) => ({
    props: (props) => props.variant === 'soft' && props.color === colorKey,
    style: ({ theme }) => ({
      ...theme.mixins.softStyles(theme, colorKey, { hover: true }),
    }),
  })) satisfies ComponentsVariants<Theme>['MuiChip']),
] satisfies ComponentsVariants<Theme>['MuiChip'];

const avatarVariants = [
  ...(COLORS.map((colorKey) => ({
    props: (props) => props.color === colorKey,
    style: ({ theme }) => ({
      color: theme.vars.palette[colorKey].lighter,
      backgroundColor: theme.vars.palette[colorKey].dark,
    }),
  })) satisfies ComponentsVariants<Theme>['MuiChip']),
] satisfies ComponentsVariants<Theme>['MuiChip'];

const sizeVariants = [
  {
    props: (props) => props.size === 'small',
    style: ({ theme }) => ({
      borderRadius: theme.shape.borderRadius,
    }),
  },
  {
    props: (props) => props.size === 'medium',
    style: ({ theme }) => ({
      borderRadius: theme.shape.borderRadius * 1.25,
    }),
  },
] satisfies ComponentsVariants<Theme>['MuiChip'];

const disabledVariants = [
  {
    props: (props) => !!props.disabled,
    style: ({ theme }) => ({
      [`&.${chipClasses.disabled}`]: {
        color: theme.vars.palette.action.disabled,
        opacity: 1,
        [`&:not(.${chipClasses.outlined})`]: {
          backgroundColor: theme.vars.palette.action.disabledBackground,
        },
        [`&.${chipClasses.outlined}`]: {
          borderColor: theme.vars.palette.action.disabledBackground,
        },
        [`& .${chipClasses.avatar}`]: {
          color: theme.vars.palette.action.disabled,
          backgroundColor: theme.vars.palette.action.disabledBackground,
        },
      },
    }),
  },
] satisfies ComponentsVariants<Theme>['MuiChip'];

/* **********************************************************************
 * 🧩 Components
 * **********************************************************************/
const MuiChip: Components<Theme>['MuiChip'] = {
  // ▼▼▼▼▼▼▼▼ ⚙️ PROPS ▼▼▼▼▼▼▼▼
  defaultProps: {
    deleteIcon: <DeleteIcon />,
  },
  // ▼▼▼▼▼▼▼▼ 🎨 STYLE ▼▼▼▼▼▼▼▼
  styleOverrides: {
    root: {
      variants: [
        ...filledVariants,
        ...outlinedVariants,
        ...softVariants,
        ...sizeVariants,
        ...disabledVariants,
      ],
    },
    label: ({ theme }) => ({
      fontWeight: theme.typography.fontWeightMedium,
    }),
    avatar: {
      variants: [...avatarVariants],
    },
    icon: {
      color: 'currentColor',
    },
    deleteIcon: {
      opacity: 0.48,
      color: 'currentColor',
      '&:hover': { opacity: 1, color: 'currentColor' },
    },
  },
};

/* **********************************************************************
 * 🚀 Export
 * **********************************************************************/
export const chip: Components<Theme> = {
  MuiChip,
};
