'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import ReservationForm from '@/components/Form/ReservationForm';
import { Avatar, List } from 'antd';

import { StarIcon, HomeIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { Button, Form, message } from 'antd';
import {
   useAddReservationMutation,
   useUpdateReservationMutation,
} from '@/services/reservationApi';
import { cn, generateIRI } from '@/utils';
import { useParams } from 'next/navigation';
import { useServiceQuery } from '@/services/serviceApi';
import { ApiRoutesWithoutPrefix, CompanyRoles, Pages } from '@/config';
import Link from 'next/link';
import dayjs from '@/utils/dayjs';
import { useAddUserMutation, useLazyUsersQuery } from '@/services/userApi';
import { useCompanyUsersQuery } from '@/services/companyUserApi';
import { User } from '@/models';
import useNavigate from '@/hooks/useNavigate';

export default function Service() {
   const { id } = useParams();
   const navigate = useNavigate();
   const [messageApi, contextHolder] = message.useMessage();
   const [addReservation] = useAddReservationMutation();
   const [addUser] = useAddUserMutation();
   const [updateReservation] = useUpdateReservationMutation();
   const [openControlModal, setOpenControlModal] = useState(false);
   const [reservationForm] = Form.useForm();
   const [provider, setProvider] = useState<User | null>(null);

   const { data: service } = useServiceQuery(id! as string, {
      skip: id ? false : true,
   });

   const { data: companyUsers } = useCompanyUsersQuery(
      { company: service?.company?.id },
      {
         skip: service ? false : true,
      },
   );
   /*
   useEffect(() => {
      if(service){
         console.log(service)
      }
   }, [service]);
   */
   useEffect(() => {
      if (companyUsers && companyUsers.length > 0) {
         const field: any = companyUsers?.find(
            (item: any) => item?.role == CompanyRoles.ROLE_ADMIN,
         );
         setProvider(field ?? companyUsers[0]?.user);
      }
   }, [companyUsers]);

   const [currentWeek, setCurrentWeek] = useState(0);
   const [editMode] = useState(false);

   useEffect(() => {
      if (provider) {
         reservationForm.setFieldsValue({
            provider: generateIRI(ApiRoutesWithoutPrefix.USERS, provider?.id as string),
         });
      }
   }, [provider]);

   const [getUsers] = useLazyUsersQuery();
   /*
   const email = Form.useWatch('email', reservationForm);
   const { data: foundUsers } = useUsersQuery(
      { email: email },
      {
         skip: email ? false : true,
      },
   );


  const dates = [
     { day: 'Lundi', date: '28/10' },
     { day: 'Mardi', date: '29/10' },
     { day: 'Mercredi', date: '30/10' },
     { day: 'Jeudi', date: '31/10' },
     { day: 'Vendredi', date: '01/11' },
     { day: 'Samedi', date: '02/11' },
  ];
  */

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

   const onFinishReservationForm = async ({
      email: emailField,
      firstName,
      lastName,
      ...data
   }: any) => {
      let formData = { ...data };
      //let user = foundUsers?.[0] ?? null;

      try {
         const foundUsers = await getUsers({ email: emailField }).unwrap();
         let user = foundUsers?.[0] ?? null;
         if (!user) {
            user = await addUser({
               email: emailField,
               firstName: firstName,
               lastName: lastName,
            }).unwrap();
         }
         formData = {
            ...formData,
            customer: generateIRI(ApiRoutesWithoutPrefix.USERS, user?.id as string),
         };
         if (!editMode) {
            await addReservation(formData).unwrap();
         } else {
            await updateReservation(formData).unwrap();
         }
         messageApi.success('Envoi effectué');
         setOpenControlModal(false);
         reservationForm.resetFields();
         navigate(Pages.HOME);
         //eslint-disable-next-line
      } catch (errors) {
         //const { errors } = getErrorMessage(error);
         /*
         reservationForm.setFields(
             errors?.map((error: any) => ({
                name: error.name,
                errors: error.errors,
             })),
         );

          */
         messageApi.error({
            key: 'review',
            content: "Impossible d'envoyer votre avis",
         });
      }
   };

   // Génère les dates de la semaine en fonction du décalage de semaine (currentWeek)

   // Generate dates for the week based on the current offset
   const generateWeekDates = () => {
      const today = dayjs();
      const startOfWeek = today.add(currentWeek, 'week').startOf('week').add(1, 'day'); // Monday
      const dates = [];
      for (let i = 0; i < 6; i++) {
         const date = startOfWeek.add(i, 'day');
         dates.push({
            day: date.format('dddd'),
            date: date.format('DD/MM'),
            fullDate: date, // Save full Day.js date object for later
         });
      }
      return dates;
   };

   const dates = generateWeekDates();
   const handleSlotSelect = (date: any, slot: any) => {
      //setSelectedDate(date);
      //setSelectedSlot(slot);

      // Parse the selected slot with 'h' separator
      const [hour, minute] = slot.split('h');
      const startAt = dayjs(date.fullDate).hour(hour).minute(minute).utc();
      const endAt = startAt.add(30, 'minutes');

      reservationForm.setFieldsValue({
         startAt: startAt.format(),
         endAt: endAt.format(),
      });

      //      messageApi.success(`Selected slot: ${date.date} at ${slot}`);
   };

   const goToPreviousWeek = () => {
      if (currentWeek > 0) {
         setCurrentWeek(currentWeek - 1);
      }
   };

   const goToNextWeek = () => {
      setCurrentWeek(currentWeek + 1);
   };

   return (
      <>
         {contextHolder}
         <div className="pb-12">
            <nav className="max-w-7xl mx-auto flex my-5" aria-label="Breadcrumb">
               <ol role="list" className="flex items-center space-x-4">
                  <li>
                     <div>
                        <a href="#" className="text-gray-400 hover:text-gray-500">
                           <HomeIcon
                              className="h-5 w-5 flex-shrink-0"
                              aria-hidden="true"
                           />
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
                           href={Pages.SERVICES}
                           className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                        >
                           Services
                        </a>
                     </div>
                  </li>
                  {service && (
                     <li>
                        <div className="flex items-center">
                           <ChevronRightIcon
                              className="h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                           />
                           <Link
                              href={`${Pages.SERVICES}/${service.id}`}
                              className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                           >
                              {service?.name}
                           </Link>
                        </div>
                     </li>
                  )}
               </ol>
            </nav>
            <div className="max-w-7xl bg-gray-50 border-b border-gray-200 mx-auto py-6 px-4 mt-5 sm:px-6 lg:px-8">
               <div className="flex justify-between items-center max-w-3xl mx-auto">
                  <h1 className="text-3xl font-bold text-gray-900">{service?.name}</h1>
                  <Link
                     className="bg-indigo-500 py-2 px-4 rounded-md text-white hover:bg-indigo-600"
                     href="#book"
                  >
                     Réserver
                  </Link>
               </div>

               <div className="text-center mb-5 pt-5">
                  <Image
                     src="/assets/img/service-1.jpg"
                     alt="Image du prestataire"
                     className="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
                     width={600}
                     height={400}
                  />
               </div>
               <div className="max-w-3xl mx-auto flex items-center justify-between">
                  <a
                     href={`${Pages.COMPANIES}/${service?.company?.id}`}
                     className="group block flex-shrink-0"
                  >
                     <div className="flex items-center">
                        <div className="flex items-center justify-center w-[60px] h-[60px] bg-white rounded-full ring-2 ring-gray-300 overflow-hidden">
                           <Image
                              className="rounded-full object-cover"
                              src={service?.image?.contentUrl ?? '/assets/img/m-logo.jpg'}
                              alt=""
                              width={100}
                              height={100}
                           />
                        </div>
                        <div className="ml-3">
                           <h2 className="text-lg font-bold text-gray-700 group-hover:text-gray-900">
                              {service?.company?.name}
                           </h2>
                           <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                              {service?.company?.category?.name}
                           </p>
                        </div>
                     </div>
                  </a>
                  {service?.rating && (
                     <span className="flex items-center text-xs font-medium text-gray-500 group-hover:text-gray-700">
                        <StarIcon
                           className="h-5 w-5 mr-1 flex-shrink-0 text-gray-400"
                           aria-hidden="true"
                        />
                        <span className="text-sm font-bold text-black-800 group-hover:text-gray-700">
                           {service?.rating}
                        </span>
                     </span>
                  )}
               </div>
            </div>
            <ReservationForm
               form={reservationForm}
               onFinish={onFinishReservationForm}
               openControlModal={openControlModal}
               setOpenControlModal={setOpenControlModal}
            />
            <div id="book" className="max-w-3xl mx-auto">
               <div className="mt-8 text-justify border-b border-gray-200 py-8">
                  <h3 className="text-xl font-bold text-gray-900">
                     Description du service
                  </h3>
                  <p className="mt-4 text-base text-gray-500">{service?.description}</p>
               </div>
               <div className="mt-8 text-justify">
                  <h3 className="text-xl font-semibold text-gray-900">
                     Réservez ce service
                  </h3>
                  <div className="mt-4">
                     <div className="bg-white py-10 border border-gray-200 rounded-lg">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                           <h1 className="text-3xl font-bold text-center mb-6">
                              Choisissez votre créneau
                           </h1>

                           <div className="flex justify-between items-center mb-6">
                              <div className="grid grid-cols-6 gap-4 w-full">
                                 {dates.map((date, index) => (
                                    <div
                                       key={index}
                                       className="text-center border-b-2 border-gray-700 pb-1 hover:bg-gray-100"
                                    >
                                       <p className="font-semibold">{date.day}</p>
                                       <p>{date.date}</p>
                                    </div>
                                 ))}
                              </div>
                           </div>

                           <div className="grid grid-cols-6 gap-4 w-full overflow-y-auto max-h-[400px]">
                              {dates.map((date, index) => (
                                 <div
                                    key={index}
                                    className="flex flex-col items-center space-y-2"
                                 >
                                    {slots.map((slot, index) => (
                                       <Button
                                          key={index}
                                          type="primary"
                                          className={cn(
                                             'w-full py-2 border border-blue-500 rounded-lg text-blue-500',
                                          )}
                                          onClick={() => {
                                             handleSlotSelect(date, slot);
                                             setOpenControlModal(true);
                                          }}
                                       >
                                          {slot ? slot : ''}
                                       </Button>
                                    ))}
                                 </div>
                              ))}
                           </div>

                           <div className="flex justify-center mt-8 space-x-4">
                              <button
                                 className="py-2 px-4 bg-blue-500 text-white rounded-md"
                                 onClick={goToPreviousWeek}
                                 disabled={currentWeek === 0}
                              >
                                 Précédent
                              </button>
                              <button
                                 className="py-2 px-4 bg-gray-300 text-gray-500 rounded-md"
                                 onClick={goToNextWeek}
                              >
                                 Suivant
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="mt-8 text-justify border-b border-gray-200 py-8">
                  <h3 className="text-xl font-bold text-gray-900">
                     Commentaires et avis
                  </h3>
                  <div className="mt-4">
                     {service?.comments?.length > 0 ? (
                        service.comments.map((comment: any) => (
                           <List
                              key={comment.id}
                              itemLayout="horizontal"
                              renderItem={() => (
                                 <div className="border p-4 rounded mb-2">
                                    <div className="flex justify-between">
                                       <h4 className="font-bold text-gray-800 flex items-center">
                                          {comment.author}
                                          <span className="ml-2 text-yellow-500 flex items-center">
                                             <StarIcon className="h-4 w-4 mr-1" />
                                             {comment.rating}/5
                                          </span>
                                       </h4>
                                       <span className="text-xs text-slate-500">
                                          {comment.ago}
                                       </span>
                                    </div>
                                    <p className="text-gray-600 pl-4">
                                       {comment.content}
                                    </p>
                                 </div>
                              )}
                           />
                        ))
                     ) : (
                        <p className="text-gray-500 italic">
                           Aucun commentaire pour le moment.
                        </p>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
