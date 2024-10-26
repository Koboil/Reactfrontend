'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Col, Row } from 'antd';
import React from 'react';
import { cn } from '@/utils';
import { Pages } from '@/config/constant';
import ServiceCard from '@/components/Service/ServiceCard';
import { useServicesQuery } from '@/services/serviceApi';

export default function Home() {
   const { data: services } = useServicesQuery({ itemsPerPage: 12 });
   return (
      <>
         <section className="relative bg-gray-800 overflow-hidden">
            <div className="absolute inset-0">
               <Image
                  className="w-full h-full object-cover"
                  src="/assets/img/schedule_hero.jpg"
                  alt="Background"
                  width={100}
                  height={100}
               />
               <div
                  className="absolute inset-0 bg-gray-800 mix-blend-multiply"
                  aria-hidden="true"
               ></div>
            </div>
            <div className="relative max-w-7xl mx-auto py-32 px-4 sm:py-48 sm:px-6 lg:px-8">
               <h1 className="text-center text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl leading-loose">
                  Réservez vos rendez-vous <br /> en un seul clic sur CoachApp
               </h1>
               <p className="mt-6 max-w-3xl mx-auto text-center text-xl text-gray-300">
                  Trouvez votre prestataire parfait et réservez votre rendez-vous en un
                  seul clic.
               </p>
               <div className="mt-10 max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
                  <div className="space-x-5 sm:space-y-0 sm:mx-2 sm:inline-flex">
                     <Link
                        href={Pages.COMPANIES}
                        className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                     >
                        Tous les prestataires
                     </Link>
                     <Link
                        href={Pages.SERVICES}
                        className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
                     >
                        Tous les services
                     </Link>
                  </div>
               </div>
            </div>
         </section>

         <section className="bg-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center">
                  <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                     Découvrez les services proposés sur CoachApp
                  </h2>
                  <p className="mt-3 text-lg text-gray-500 sm:mt-4">
                     Trouvez le service qui vous convient et réservez en un seul clic.
                  </p>
               </div>

               <Row gutter={[16, 16]} className={cn('mt-20')}>
                  {services?.map((service, index) => (
                     <Col span={6} key={index}>
                        <ServiceCard data={service} />
                     </Col>
                  ))}
               </Row>

               {/* <div className="mt-10 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
                  <div className="flex flex-col rounded-lg shadow-lg overflow-hidden service-card">
                     <div className="flex-shrink-0">
                        <Link href={Pages.UNIQUE_SERVICE}>
                           <Image
                              className="h-48 w-full object-cover"
                              src="/assets/img/service-1.jpg"
                              width={200}
                              height={48}
                              alt="Service 2"
                           />
                        </Link>
                     </div>
                     <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                        <div className="flex-1">
                           <div className="flex align-center items-center space-x-2">
                              <div className="h-5 w-5 rounded-full object-cover ring-2">
                                 <Link href="">
                                    <Image
                                       className="w-5 h-5 rounded-full object-cover"
                                       src="/assets/img/digital-rit.png"
                                       width={50}
                                       height={50}
                                       alt="Service 2"
                                    />
                                 </Link>
                              </div>
                              <h3 className="text-xl font-semibold text-gray-900">
                                 <Link href="">Digital RIT</Link>
                              </h3>
                           </div>

                           <Link href={Pages.UNIQUE_SERVICE}>
                              <p className="mt-2 text-base text-gray-500 hover:underline hover:underline-offset-1">
                                 Notre agence concevra ou refonte un site internet
                                 d'entreprise de commerce ...
                              </p>
                           </Link>

                           <div className="mt-2 flex items-center text-sm text-gray-500">
                              <StarIcon className="mr-1 h-5 w-5 flex-shrink-0 text-black"></StarIcon>
                              <b className="text-black text-lg">4.5</b>{' '}
                              <span className="ml-1">(230)</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div> */}
            </div>

            <div className="mt-12 text-center">
               <Link
                  href={Pages.SERVICES}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
               >
                  Voir tous les services
               </Link>
            </div>
         </section>
      </>
   );
}
