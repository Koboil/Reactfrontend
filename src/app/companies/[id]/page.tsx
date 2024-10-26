'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Pages } from '@/config';

import {
   StarIcon,
   HomeIcon,
   BuildingOfficeIcon,
   CreditCardIcon,
   UserIcon,
   UsersIcon,
   ChevronRightIcon,
} from '@heroicons/react/20/solid';

const pages = [
   { name: 'Services', href: '#', current: false },
   { name: '1', href: '#', current: true },
];

function classNames(...classes: any[]) {
   return classes.filter(Boolean).join(' ');
}

export default function Service() {
   const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

   const dates = [
      { day: 'Lundi', date: '28/10' },
      { day: 'Mardi', date: '29/10' },
      { day: 'Mercredi', date: '30/10' },
      { day: 'Jeudi', date: '31/10' },
      { day: 'Vendredi', date: '01/11' },
      { day: 'Samedi', date: '02/11' },
   ];

   const slots = [
      '09h00',
      '09h30',
      '10h00',
      '10h30',
      '11h00',
      '11h30',
      '12h00',
      '12h30',
      '13h00',
      '13h30',
      '14h00',
      '14h30',
      '15h00',
      '15h30',
      '16h00',
      '16h30',
      '17h00',
      '17h30',
      '18h00',
      '18h30',
   ];
   return (
      <div className="pb-12">
         <nav className="max-w-7xl mx-auto flex my-5" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-4">
               <li>
                  <div>
                     <a href="#" className="text-gray-400 hover:text-gray-500">
                        <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                        <span className="sr-only">Accueil</span>
                     </a>
                  </div>
               </li>
               <li>
                  <div className="flex items-center">
                     <ChevronRightIcon
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                     />
                     <a
                        href={Pages.COMPANIES}
                        className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                     >
                        Services
                     </a>
                  </div>
               </li>
               {/* {company && (
                  <li>
                     <div className="flex items-center">
                        <ChevronRightIcon
                           className="h-5 w-5 flex-shrink-0 text-gray-400"
                           aria-hidden="true"
                        />
                        <Link
                           href={`${Pages.COMPANIES}/${company.id}`}
                           className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                        >
                           {company?.name}
                        </Link>
                     </div>
                  </li>
               )} */}
            </ol>
         </nav>
         <div className="max-w-7xl bg-gray-100 border-b border-gray-200 mx-auto mb-10 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto flex items-center justify-between">
               <div className="group block flex-shrink-0">
                  <div className="flex items-center">
                     <div className="flex items-center justify-center w-[60px] h-[60px] bg-white rounded-full ring-2 ring-gray-300 overflow-hidden">
                        <Image
                           className="rounded-full object-cover"
                           src="/assets/img/m-logo.jpg"
                           alt=""
                           width={100}
                           height={100}
                        />
                     </div>
                     <div className="ml-3">
                        <h2 className="text-lg font-bold text-gray-700 group-hover:text-gray-900">
                           MCompany LTD
                        </h2>
                        <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                           Marketing & Communication
                        </p>
                     </div>
                  </div>
               </div>
               <span className="flex items-center text-xs font-medium text-gray-500 group-hover:text-gray-700">
                  <span className="text-sm font-bold text-black-800 group-hover:text-gray-700">
                     4 services
                  </span>
               </span>
            </div>
         </div>

         <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
               <h2 className="text-lg font-bold"> Affiche les Services</h2>
            </div>
         </div>
      </div>
   );
}
