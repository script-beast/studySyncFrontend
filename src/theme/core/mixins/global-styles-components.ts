import type { Theme, CSSObject } from '@mui/material/styles';
import type { PaletteColorKey } from '../palette';

import { varAlpha } from 'minimal-shared/utils';

import { dividerClasses } from '@mui/material/Divider';
import { checkboxClasses } from '@mui/material/Checkbox';
import { menuItemClasses } from '@mui/material/MenuItem';
import { autocompleteClasses } from '@mui/material/Autocomplete';

// ----------------------------------------------------------------------

/**
 * Generates styles for menu item components.
 *
 * @param theme - The MUI theme object.
 * @returns A CSS object with styles.
 *
 * @example
 * ...theme.mixins.menuItemStyles(theme)
 */

export function menuItemStyles(theme: Theme): CSSObject {
  return {
    ...theme.typography.body2,
    padding: theme.spacing(0.75, 1),
    borderRadius: theme.shape.borderRadius * 0.75,
    '&:not(:last-of-type)': {
      marginBottom: 4,
    },
    [`&.${menuItemClasses.selected}`]: {
      fontWeight: theme.typography.fontWeightSemiBold,
      backgroundColor: theme.vars.palette.action.selected,
      '&:hover': { backgroundColor: theme.vars.palette.action.hover },
    },
    [`& .${checkboxClasses.root}`]: {
      padding: theme.spacing(0.5),
      marginLeft: theme.spacing(-0.5),
      marginRight: theme.spacing(0.5),
    },
    [`&.${autocompleteClasses.option}[aria-selected="true"]`]: {
      backgroundColor: theme.vars.palette.action.selected,
      '&:hover': { backgroundColor: theme.vars.palette.action.hover },
    },
    [`&+.${dividerClasses.root}`]: {
      margin: theme.spacing(0.5, 0),
    },
  };
}

// ----------------------------------------------------------------------

/**
 * Generates styles for paper components.
 *
 * @param theme - The MUI theme object.
 * @param options.blur - (Optional) Blur intensity in pixels. Defaults to 20.
 * @param options.color - (Optional) Background color. Defaults to semi-transparent paper color.
 * @param options.dropdown - (Optional) If true, applies padding, box-shadow, and border-radius for dropdowns.
 * @returns A CSS object with styles.
 *
 * @example
 * // Paper with default styles
 * ...theme.mixins.paperStyles(theme);
 *
 * @example
 * // Paper with dropdown styles and custom blur
 * ...theme.mixins.paperStyles(theme, {
 *   blur: 10,
 *   color: varAlpha(theme.vars.palette.background.defaultChannel, 0.9),
 *   dropdown: true
 * })
 */

export type PaperStyleOptions = {
  blur?: number;
  color?: string;
  dropdown?: boolean;
};

/**
 * Tools for creating image base64
 * https://www.fffuel.co/eeencode/
 */
const cyanShape =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfNDQ2NF81NTMzOCkiIGZpbGwtb3BhY2l0eT0iMC4xIi8+CjxkZWZzPgo8cmFkaWFsR3JhZGllbnQgaWQ9InBhaW50MF9yYWRpYWxfNDQ2NF81NTMzOCIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgxMjAgMS44MTgxMmUtMDUpIHJvdGF0ZSgtNDUpIHNjYWxlKDEyMy4yNSkiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBCOEQ5Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwQjhEOSIgc3RvcC1vcGFjaXR5PSIwIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==';

const redShape =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfNDQ2NF81NTMzNykiIGZpbGwtb3BhY2l0eT0iMC4xIi8+CjxkZWZzPgo8cmFkaWFsR3JhZGllbnQgaWQ9InBhaW50MF9yYWRpYWxfNDQ2NF81NTMzNyIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgwIDEyMCkgcm90YXRlKDEzNSkgc2NhbGUoMTIzLjI1KSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGRjU2MzAiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkY1NjMwIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9yYWRpYWxHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K';

export function paperStyles(theme: Theme, options?: PaperStyleOptions): CSSObject {
  const { blur = 20, color, dropdown } = options ?? {};
  return {
    ...theme.mixins.bgGradient({
      images: [`url(${cyanShape})`, `url(${redShape})`],
      sizes: ['50%', '50%'],
      positions:
        theme.direction === 'rtl' ? ['top left', 'right bottom'] : ['top right', 'left bottom'],
    }),
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    backgroundColor: color ?? varAlpha(theme.vars.palette.background.paperChannel, 0.9),
    ...(dropdown && {
      padding: theme.spacing(0.5),
      boxShadow: theme.vars.customShadows.dropdown,
      borderRadius: `${theme.shape.borderRadius * 1.25}px`,
    }),
  };
}

// ----------------------------------------------------------------------

/**
 * Generate style variant for components like Button or Chip
 *
 * @param theme - The MUI theme object.
 * @param colorKey - 'default', 'inherit', or a palette color key like 'primary', 'secondary', etc.
 * @param options.hover - (Optional) Enable hover styles or provide custom hover styles.
 * @returns A CSS object with styles.
 *
 * @example
 * // Filled styles
 * ...theme.mixins.filledStyles(theme, 'inherit', { hover: true })
 * ...theme.mixins.filledStyles(theme, 'inherit', { hover: { boxShadow: theme.vars.customShadows.z8 }, })
 *
 * // Soft styles
 * ...theme.mixins.softStyles(theme, 'inherit')
 * ...theme.mixins.softStyles(theme, 'primary', { hover: true })
 */

export type StyleOptions = {
  hover?: boolean | CSSObject;
};

export function filledStyles(
  theme: Theme,
  colorKey: 'default' | 'inherit' | PaletteColorKey,
  options?: StyleOptions
): CSSObject {
  if (colorKey === 'default') {
    return {
      color: theme.vars.palette.grey[800],
      backgroundColor: theme.vars.palette.grey[300],
      ...(!!options?.hover && {
        '&:hover': {
          backgroundColor: theme.vars.palette.grey[400],
          ...(typeof options.hover === 'object' ? options.hover : {}),
        },
      }),
    };
  }

  if (colorKey === 'inherit') {
    return {
      color: theme.vars.palette.common.white,
      backgroundColor: theme.vars.palette.grey[800],
      ...theme.applyStyles('dark', {
        color: theme.vars.palette.grey[800],
        backgroundColor: theme.vars.palette.common.white,
      }),
      ...(!!options?.hover && {
        '&:hover': {
          backgroundColor: theme.vars.palette.grey[700],
          ...theme.applyStyles('dark', {
            backgroundColor: theme.vars.palette.grey[400],
          }),
          ...(typeof options.hover === 'object' ? options.hover : {}),
        },
      }),
    };
  }

  return {};
}

export function softStyles(
  theme: Theme,
  colorKey: 'default' | 'inherit' | PaletteColorKey,
  options?: StyleOptions
): CSSObject {
  if (colorKey === 'default') {
    return filledStyles(theme, 'default', options);
  }

  if (colorKey === 'inherit') {
    return {
      backgroundColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.16),
      ...(!!options?.hover && {
        '&:hover': {
          backgroundColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.32),
          ...(typeof options.hover === 'object' ? options.hover : {}),
        },
      }),
    };
  }

  return {
    color: theme.vars.palette[colorKey].dark,
    backgroundColor: varAlpha(theme.vars.palette[colorKey].mainChannel, 0.16),
    ...theme.applyStyles('dark', {
      color: theme.vars.palette[colorKey].light,
    }),
    ...(!!options?.hover && {
      '&:hover': {
        backgroundColor: varAlpha(theme.vars.palette[colorKey].mainChannel, 0.32),
        ...(typeof options.hover === 'object' ? options.hover : {}),
      },
    }),
  };
}
