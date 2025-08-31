import type { Theme, Components } from '@mui/material/styles';
import type { InputBaseClasses } from '@mui/material/InputBase';
import type { FilledInputClasses } from '@mui/material/FilledInput';
import type { OutlinedInputClasses } from '@mui/material/OutlinedInput';

import { varAlpha } from 'minimal-shared/utils';

import { inputBaseClasses } from '@mui/material/InputBase';
import { filledInputClasses } from '@mui/material/FilledInput';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { inputAdornmentClasses } from '@mui/material/InputAdornment';

// ----------------------------------------------------------------------

/**
 * Shared styles for MUI input components (e.g., MuiPickersInput, MuiPickersOutlinedInput, MuiTextField).
 * @context Applies when `enableAccessibleFieldDOMStructure={true}` (default in MUI v7), enabling a new DOM structure for enhanced accessibility.
 * @see https://mui.com/x/migration/migration-pickers-v7/#new-dom-structure-for-the-field
 * @see ./mui-x-date-picker.tsx for implementation details
 */
export const inputBaseStyles = {
  root: (theme: Theme, classes: Partial<InputBaseClasses>) => ({
    '--disabled-color': theme.vars.palette.action.disabled,
    [`&.${classes.disabled}`]: {
      [`& .${inputAdornmentClasses.root} *`]: { color: 'var(--disabled-color)' },
      [`& .${classes.input}`]: {
        WebkitTextFillColor: 'var(--disabled-color)',
        '& *': { color: 'var(--disabled-color)' },
      },
    },
  }),
  input: (theme: Theme) => ({
    fontSize: theme.typography.pxToRem(15),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(16), // Prevent Safari zoom
    },
  }),
};

export const inputStyles = {
  underline: (theme: Theme) => ({
    '&::before': {
      borderBottomColor: theme.vars.palette.shared.inputUnderline,
    },
    '&::after': {
      borderBottomColor: theme.vars.palette.text.primary,
    },
  }),
};

export const outlinedInputStyles = {
  root: (theme: Theme, classes: Partial<OutlinedInputClasses>) => ({
    [`&.${classes.focused}:not(.${classes.error})`]: {
      [`& .${classes.notchedOutline}`]: {
        borderColor: theme.vars.palette.text.primary,
      },
    },
    [`&.${classes.disabled}`]: {
      [`& .${classes.notchedOutline}`]: {
        borderColor: theme.vars.palette.action.disabledBackground,
      },
    },
  }),
  notchedOutline: (theme: Theme) => ({
    borderColor: theme.vars.palette.shared.inputOutlined,
    transition: theme.transitions.create(['border-color'], {
      duration: theme.transitions.duration.shortest,
    }),
  }),
};

export const filledInputStyles = {
  root: (theme: Theme, classes: Partial<FilledInputClasses>) => ({
    borderRadius: theme.shape.borderRadius,
    backgroundColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
    '&:hover': {
      backgroundColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.16),
    },
    [`&.${classes.focused}`]: {
      backgroundColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.16),
    },
    [`&.${classes.error}`]: {
      backgroundColor: varAlpha(theme.vars.palette.error.mainChannel, 0.08),
      [`&.${classes.focused}`]: {
        backgroundColor: varAlpha(theme.vars.palette.error.mainChannel, 0.16),
      },
    },
    [`&.${classes.disabled}`]: {
      backgroundColor: theme.vars.palette.action.disabledBackground,
    },
  }),
};

/* **********************************************************************
 * 🧩 Components
 * **********************************************************************/
const MuiInputBase: Components<Theme>['MuiInputBase'] = {
  // ▼▼▼▼▼▼▼▼ 🎨 STYLE ▼▼▼▼▼▼▼▼
  styleOverrides: {
    root: ({ theme }) => ({
      ...inputBaseStyles.root(theme, inputBaseClasses),
    }),
    input: ({ theme }) => ({
      ...inputBaseStyles.input(theme),
      '&:focus': { borderRadius: 'inherit' },
      '&::placeholder': { opacity: 1, color: theme.vars.palette.text.disabled },
    }),
  },
};

const MuiInput: Components<Theme>['MuiInput'] = {
  // ▼▼▼▼▼▼▼▼ 🎨 STYLE ▼▼▼▼▼▼▼▼
  styleOverrides: {
    underline: ({ theme }) => inputStyles.underline(theme),
  },
};

const MuiOutlinedInput: Components<Theme>['MuiOutlinedInput'] = {
  // ▼▼▼▼▼▼▼▼ 🎨 STYLE ▼▼▼▼▼▼▼▼
  styleOverrides: {
    root: ({ theme }) => outlinedInputStyles.root(theme, outlinedInputClasses),
    notchedOutline: ({ theme }) => outlinedInputStyles.notchedOutline(theme),
  },
};

const MuiFilledInput: Components<Theme>['MuiFilledInput'] = {
  // ▼▼▼▼▼▼▼▼ ⚙️ PROPS ▼▼▼▼▼▼▼▼
  defaultProps: {
    disableUnderline: true,
  },
  // ▼▼▼▼▼▼▼▼ 🎨 STYLE ▼▼▼▼▼▼▼▼
  styleOverrides: {
    root: ({ theme }) => filledInputStyles.root(theme, filledInputClasses),
  },
};

const MuiTextField: Components<Theme>['MuiTextField'] = {
  // ▼▼▼▼▼▼▼▼ ⚙️ PROPS ▼▼▼▼▼▼▼▼
  defaultProps: {
    variant: 'outlined',
  },
};

/* **********************************************************************
 * 🚀 Export
 * **********************************************************************/
export const textField: Components<Theme> = {
  MuiInput,
  MuiInputBase,
  MuiTextField,
  MuiFilledInput,
  MuiOutlinedInput,
};
