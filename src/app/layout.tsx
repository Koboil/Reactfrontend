import { inter, plus_jakarta_sans } from '@/styles/fonts';
import '@/styles/globals.scss';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import frFR from 'antd/locale/fr_FR';
import { ConfigProvider } from 'antd';
import StyledComponentsRegistry from '@/lib/registry';
import StoreProvider from '@/app/StoreProvider';

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="fr">
         <StoreProvider>
            <body className={`${inter.className} ${plus_jakarta_sans.className}`}>
               <AntdRegistry>
                  <ConfigProvider locale={frFR}>
                     <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
                  </ConfigProvider>
               </AntdRegistry>
            </body>
         </StoreProvider>
      </html>
   );
}
