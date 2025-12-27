import { extendTheme } from '@chakra-ui/react';
import { themeConfig, semanticColors, components } from './config';

const theme = extendTheme({
  config: themeConfig,
  semanticTokens: {
    colors: semanticColors,
  },
  components,
});

export default theme;
