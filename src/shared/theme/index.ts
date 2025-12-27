import { extendTheme } from '@chakra-ui/react';
import { themeConfig, colors } from './config';

const theme = extendTheme({
  config: themeConfig,
  semanticTokens: {
    colors,
  },
});

export default theme;
