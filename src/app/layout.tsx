import { ColorModeScript } from '@chakra-ui/react';
import { themeConfig } from '@/shared/theme/config';
import Providers from './providers';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <ColorModeScript initialColorMode={themeConfig.initialColorMode} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
