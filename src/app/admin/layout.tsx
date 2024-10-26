import type { Metadata } from 'next';
import Breadcrumb from '@/components/Layout/admin/Breadcrumb';
import TopBar from '@/components/Layout/admin/TopBar';
import Footer from '@/components/Layout/admin/Footer';
import withAuth from '@/components/WithAuth';
import SubscriptionAlert from '@/components/Alert/SubscriptionAlert';
import React from 'react';

export const metadata: Metadata = {
   title: 'CoachApp - Tableau de bord',
   description: '-',
   keywords: '-',
};

function Layout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <div className="min-h-full">
         <TopBar />
         <Breadcrumb />
         <SubscriptionAlert />
         <main className="main-wrapper flex-1 relative overflow-hidden">{children}</main>
         <Footer />
      </div>
   );
}
export default Layout; //withAuth(Layout);
