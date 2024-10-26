'use client';
import { Pages } from '@/config/constant';
import Link from 'next/link';
import Image from 'next/image';

type HeaderProps = {
   showButtons?: boolean;
   isLogoClickable?: boolean;
};
const HeaderConnected = ({
   showButtons = false,
   isLogoClickable = false,
}: HeaderProps) => {
   return (
      <>
         <header className="section-header bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex justify-between h-16">
                  <div className="flex items-center justify-between">
                     <div className="flex-shrink-0">
                        <Link href={Pages.HOME}>
                           <Image
                              src="/assets/img/CoachApp.png"
                              width={170}
                              height={100}
                              alt="CoachApp"
                           />
                           {/* <span className="text-2xl font-bold">CoachApp.</span> */}
                        </Link>
                     </div>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:items-center">
                     <Link
                        href={Pages.ADMIN_DASHBOARD}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                     >
                        MON COMPTE
                     </Link>

                     <Link
                        href={Pages.LOGOUT}
                        className="text-red-900 inline-flex items-center px-4 text-sm font-medium"
                     >
                        DÉCONNEXION
                     </Link>
                  </div>
               </div>
            </div>
         </header>

         <section className="border-b border-gray-200 bg-gray-100">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
               <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  Vos réservations
               </h1>
            </div>
         </section>
      </>
   );
};
export default HeaderConnected;
