'use client';
import { Pages } from '@/config/constant';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import environment from '@/config/environment';

import { ArrowLongRightIcon } from '@heroicons/react/24/outline';

type HeaderProps = {
   showButtons?: boolean;
   isLogoClickable?: boolean;
};
const Header = ({ showButtons = false, isLogoClickable = false }: HeaderProps) => {
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
                  {/* <div className="hidden sm:ml-6 sm:flex sm:items-center">
                     <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                        <a
                           href={Pages.HOME}
                           className="text-gray-900 inline-flex items-center px-1 text-sm font-medium">
                           DEVENIR PRESTATAIRE
                        </a>
                     </div>
                  </div> */}
                  <div className="hidden sm:ml-6 sm:flex sm:items-center">
                     <Link
                        href={Pages.RESERVATIONS}
                        className="text-gray-900 inline-flex items-center px-4 text-sm font-medium"
                     >
                        MES RÉSERVATIONS
                     </Link>
                     <Link
                        href={Pages.LOGIN}
                        className="text-gray-900 inline-flex items-center px-4 text-sm font-medium"
                     >
                        CONNEXION
                     </Link>
                     <Link
                        href={Pages.REGISTER}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                     >
                        DEVENIR PRESTATAIRE
                     </Link>
                  </div>
               </div>
            </div>
         </header>
      </>
   );
};
export default Header;
