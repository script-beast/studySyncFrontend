import type {
  Theme,
  CSSObject,
  Components,
  ComponentsVariants,
  ComponentsOverrides,
  ComponentsPropsList,
} from '@mui/material/styles';
import type { SettingsState } from 'src/components/settings';

// ----------------------------------------------------------------------

function getSlotStyles<Name extends keyof ComponentsOverrides<Theme>>(
  slotStyle: NonNullable<ComponentsOverrides<Theme>[Name]>[keyof NonNullable<
    ComponentsOverrides<Theme>[Name]
  >],
  props?: ComponentsPropsList[Name] & { theme: Theme }
): CSSObject & { variants?: ComponentsVariants<Theme>[Name] } {
  if (!slotStyle) {
    return {};
  }

  if (typeof slotStyle === 'function') {
    return props ? slotStyle(props) : slotStyle();
  }

  return slotStyle;
}

// ----------------------------------------------------------------------

export function applySettingsToComponents(
  components?: Components<Theme>,
  settingsState?: SettingsState
): { components: Components<Theme> } {
  const MuiCssBaseline: Components<Theme>['MuiCssBaseline'] = {
    styleOverrides: {
      html: {
        fontSize: settingsState?.fontSize,
      },
    },
  };

  const MuiCard: Components<Theme>['MuiCard'] = {
    styleOverrides: {
      root: (props) => {
        const { theme } = props;

        const rootStyles = getSlotStyles<'MuiCard'>(
          components?.MuiCard?.styleOverrides?.root,
          props
        );

        const contrastStyles: CSSObject =
          settingsState?.contrast === 'hight'
            ? {
                boxShadow: theme.vars.customShadows.z1,
              }
            : {};

        return {
          ...rootStyles,
          ...contrastStyles,
        };
      },
    },
  };

  return {
    components: {
      MuiCssBaseline,
      MuiCard,
    },
  };
}
