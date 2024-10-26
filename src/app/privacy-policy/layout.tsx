import type { Metadata } from 'next';
import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';

export const metadata: Metadata = {
   title: 'Politique de confidentialité',
   description: 'Politique de confidentialité',
};

export default function Layout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <div className="page-wrapper relative z-[1] bg-white">
         <Header showButtons={true} isLogoClickable={true} />
         <main className="main-wrapper relative overflow-hidden">{children}</main>
         <Footer showContent={true} />
      </div>
   );
}
