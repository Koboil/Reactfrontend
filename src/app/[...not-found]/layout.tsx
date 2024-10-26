import type { Metadata } from 'next';
import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';

export const metadata: Metadata = {
   title: 'CoachApp - Réservez votre meilleur prestataire',
   description: '-',
};

export default function Layout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <div className="page-wrapper relative z-[1] bg-white">
         <Header />
         <main className="main-wrapper relative overflow-hidden grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
            {children}
         </main>
         <Footer />
      </div>
   );
}
