import type { Metadata } from 'next';
import Footer from '@/components/Layout/Footer';
import HeaderConnected from '@/components/Layout/HeaderConnected';

export const metadata: Metadata = {
   title: 'CoachApp - Réservez votre meilleur prestataire',
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
         <HeaderConnected />
         <main className="main-wrapper relative overflow-hidden">{children}</main>
         <Footer />

         {/* <HeaderConnected />
         <main className="main-wrapper relative overflow-hidden">{children}</main>
         <Footer /> */}
      </div>
   );
}
