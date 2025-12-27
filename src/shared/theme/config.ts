import type { ThemeConfig } from '@chakra-ui/react';

export const colors = {
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
      default: 'white',
      _dark: 'whiteAlpha.900',
    },
    primaryText: {
      default: 'blue.700',
      _dark: 'blue.800',
    },
  },
};

export const themeConfig: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};
