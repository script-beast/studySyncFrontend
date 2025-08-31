import type { AvatarGroupClassKey } from '@mui/material/AvatarGroup';
import type { Theme, Components, ComponentsVariants } from '@mui/material/styles';

import { parseCssVar } from 'minimal-shared/utils';

import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

/**
 * TypeScript extension for MUI theme augmentation.
 * @to {@link file://./../../extend-theme-types.d.ts}
 */

export type AvatarGroupExtendVariant = {
  compact: true;
};

export type AvatarExtendColor = {
  color?:
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'default'
    | 'inherit';
};

const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'] as const;

export function getAvatarColor(
  inputValue?: string,
  fallback: AvatarExtendColor['color'] = 'default'
): string {
  const avatarColors = [...COLORS, 'inherit', 'default'];

  if (!inputValue?.trim()) {
    return fallback;
  }

  const firstChar = inputValue.trim()[0].toLowerCase();

  // Only handle alphabet characters a-z
  if (!/[a-z]/.test(firstChar)) {
    return fallback;
  }

  const alphabetIndex = firstChar.charCodeAt(0) - 'a'.charCodeAt(0); // 0 for 'a', 25 for 'z'
  const colorIndex = alphabetIndex % avatarColors.length;

  return avatarColors[colorIndex] || fallback;
}

const customRenderSurplus = (surplus: number) => (
  <Box
    component="span"
    sx={[
      (theme) => ({
        width: 1,
        height: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        color: theme.vars.palette.primary.dark,
        backgroundColor: theme.vars.palette.primary.lighter,
        fontSize: {
          '@': theme.typography.pxToRem(12),
          '@32': theme.typography.pxToRem(14),
          '@40': theme.typography.pxToRem(16),
          '@64': theme.typography.pxToRem(18),
        },
      }),
    ]}
  >
    +{surplus}
  </Box>
);

/* **********************************************************************
 * 🗳️ Variants
 * **********************************************************************/
const colorVariants = [
  {
    props: {}, // Default color
    style: ({ theme }) => ({
      color: theme.vars.palette.action.active,
      [parseCssVar(theme.vars.palette.Avatar.defaultBg)]: theme.vars.palette.grey[300],
      ...theme.applyStyles('dark', {
        [parseCssVar(theme.vars.palette.Avatar.defaultBg)]: theme.vars.palette.grey[700],
      }),
    }),
  },
  {
    props: (props) =>
      props.color === 'inherit' || (!!props.alt && getAvatarColor(props.alt) === 'inherit'),
    style: ({ theme }) => ({
      ...theme.mixins.filledStyles(theme, 'inherit'),
    }),
  },
  ...(COLORS.map((colorKey) => ({
    props: (props) =>
      props.color === colorKey || (!!props.alt && getAvatarColor(props.alt) === colorKey),
    style: ({ theme }) => ({
      color: theme.vars.palette[colorKey].contrastText,
      backgroundColor: theme.vars.palette[colorKey].main,
    }),
  })) satisfies ComponentsVariants<Theme>['MuiAvatar']),
] satisfies ComponentsVariants<Theme>['MuiAvatar'];

const avatarGroupVariants = {
  root: [
    {
      props: (props) => props.variant === 'compact',
      style: {
        width: 40,
        height: 40,
        position: 'relative',
      },
    },
  ],
  avatar: [
    {
      props: (props) => props.variant === 'compact',
      style: {
        margin: 0,
        width: 28,
        height: 28,
        position: 'absolute',
        '&:first-of-type': { left: 0, bottom: 0, zIndex: 9 },
        '&:last-of-type': { top: 0, right: 0 },
      },
    },
  ],
} satisfies Record<AvatarGroupClassKey, ComponentsVariants<Theme>['MuiAvatarGroup']>;

/* **********************************************************************
 * 🧩 Components
 * **********************************************************************/
const MuiAvatar: Components<Theme>['MuiAvatar'] = {
  // ▼▼▼▼▼▼▼▼ 🎨 STYLE ▼▼▼▼▼▼▼▼
  styleOverrides: {
    root: ({ theme }) => ({
      containerType: 'inline-size',
      fontSize: theme.typography.pxToRem(18),
      fontWeight: theme.typography.fontWeightMedium,
    }),
    colorDefault: {
      variants: [...colorVariants],
    },
    rounded: ({ theme }) => ({
      borderRadius: theme.shape.borderRadius * 1.5,
    }),
  },
};

const MuiAvatarGroup: Components<Theme>['MuiAvatarGroup'] = {
  // ▼▼▼▼▼▼▼▼ ⚙️ PROPS ▼▼▼▼▼▼▼▼
  defaultProps: {
    max: 4,
    renderSurplus: (surplus: number) => customRenderSurplus(surplus),
  },
  // ▼▼▼▼▼▼▼▼ 🎨 STYLE ▼▼▼▼▼▼▼▼
  styleOverrides: {
    root: {
      justifyContent: 'flex-end',
      variants: [...avatarGroupVariants.root],
    },
    avatar: {
      variants: [...avatarGroupVariants.avatar],
    },
  },
};

/* **********************************************************************
 * 🚀 Export
 * **********************************************************************/
export const avatar: Components<Theme> = {
  MuiAvatar,
  MuiAvatarGroup,
};
