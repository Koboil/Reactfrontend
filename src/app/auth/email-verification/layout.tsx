import type { Metadata } from 'next';
import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';

export const metadata: Metadata = {
   title: 'CoachApp - Confirmez votre adresse email',
   description: '-',
   keywords: '-',
};

export default function Layout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <div className="page-wrapper relative z-[1] bg-white">
         <Header />
         <main className="main-wrapper relative overflow-hidden">{children}</main>
         <Footer />
      </div>
   );
}
