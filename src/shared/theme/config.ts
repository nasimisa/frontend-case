import type { ThemeConfig } from '@chakra-ui/react';

export const semanticColors = {
  surface: {
    header: {
      default: 'linear-gradient(135deg, #1e40af, #0891b2)',
      _dark: 'linear-gradient(135deg, #0f172a, #155e75)',
    },
    elevated: {
      default: 'white',
      _dark: 'whiteAlpha.900',
    },
    hover: {
      default: 'whiteAlpha.200',
      _dark: 'whiteAlpha.300',
    },
  },

  /* TEXT */
  text: {
    primary: {
      default: 'white',
      _dark: 'whiteAlpha.900',
    },
    secondary: {
      default: 'whiteAlpha.800',
      _dark: 'whiteAlpha.700',
    },
    accent: {
      default: 'blue.700',
      _dark: 'blue.800',
    },
  },

  /* ACTIONS */
  action: {
    primaryBg: {
      default: 'orange.400',
      _dark: 'orange.400',
    },
    primaryHoverBg: {
      default: 'orange.500',
      _dark: 'orange.300',
    },
    primaryActiveBg: {
      default: 'orange.600',
      _dark: 'orange.500',
    },
    primaryDisabledBg: {
      default: 'orange.200',
      _dark: 'orange.800',
    },
    primaryText: {
      default: 'white',
      _dark: 'gray.900',
    },
    disabledText: {
      default: 'gray.400',
      _dark: 'gray.500',
    },
  },
};

export const components = {
  Button: {
    baseStyle: {
      fontWeight: 'semibold',
      borderRadius: 'md',
    },
    variants: {
      solid: {
        bg: 'action.primaryBg',
        color: 'action.primaryText',

        _hover: {
          bg: 'action.primaryHoverBg',
        },

        _active: {
          bg: 'action.primaryActiveBg',
        },

        _disabled: {
          bg: 'action.primaryDisabledBg',
          cursor: 'not-allowed',
          opacity: 1,
        },

        _loading: {
          bg: 'action.primaryBg',
          color: 'action.primaryText',
          _hover: {
            bg: 'action.primaryBg',
          },
        },
      },

      outline: {
        bg: 'transparent',
        color: 'action.primaryBg',
        border: '1px solid',
        borderColor: 'action.primaryBg',

        _hover: {
          bg: 'action.primaryBg',
          color: 'action.primaryText',
        },

        _active: {
          bg: 'action.primaryActiveBg',
          borderColor: 'action.primaryActiveBg',
        },

        _disabled: {
          color: 'action.primaryDisabledBg',
          borderColor: 'action.primaryDisabledBg',
          cursor: 'not-allowed',
          opacity: 1,

          _hover: {
            bg: 'transparent',
            color: 'action.disabledText',
            borderColor: 'action.disabledText',
          },
        },
      },
    },
  },
};

export const themeConfig: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};
