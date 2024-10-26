'use client';
import React, { useCallback } from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Badge, Card, Dropdown, Space } from 'antd';

import Image from 'next/image';
import withAuth from '@/components/WithAuth';
import {
   useReservationQuery,
   useReservationsQuery,
   useReservationStatusesQuery,
   useReservationStatusQuery,
   useUpdateReservationMutation,
} from '@/services/reservationApi';
import { useAppSelector } from '@/store/hooks';
import { selectCurrentUser } from '@/features/authSlice';
import { useUserQuery } from '@/services/userApi';
import { ReservationStatus } from '@/config';
import Ribbon from 'antd/es/badge/Ribbon';
import { formatDate, getErrorMessage } from '@/utils';
import Link from 'next/link';
import { message } from 'antd/lib';
import { Reservation } from '@/models';

const items: MenuProps['items'] = [
   {
      key: '1',
      label: (
         <Link target="_blank" rel="noopener noreferrer" href="#">
            Annuler
         </Link>
      ),
      danger: true,
   },
];

const Reservations: React.FC = () => {
   const currentUser = useAppSelector(selectCurrentUser);
   const [messageApi, contextHolder] = message.useMessage();
   const { data: reservationStatusConfirmed } = useReservationStatusesQuery({
      status: ReservationStatus.CONFIRMED,
   });
   const { data: reservationStatusCanceled } = useReservationStatusesQuery({
      status: ReservationStatus.CANCELED,
   });
   const { data: user } = useUserQuery(currentUser?.id as string, {
      skip: currentUser?.id ? false : true,
   });
   const { data: reservations } = useReservationsQuery(
      { pagination: false, customer: currentUser?.id },
      {
         skip: currentUser?.id ? false : true,
      },
   );
   const [updateItem] = useUpdateReservationMutation();

   const handleCancel = useCallback(
      async (reservation: Reservation) => {
         if (window.confirm('Etes-vous sûr')) {
            try {
               await updateItem({
                  id: reservation?.id,
                  status: reservationStatusCanceled?.[0]?.id as unknown as string,
               }).unwrap();
               messageApi.success('Elément supprimé');
            } catch (err) {
               const { detail } = getErrorMessage(err);
               messageApi.error(detail);
            }
         }
      },
      [updateItem, reservationStatusCanceled],
   );

   return (
      <>
         {contextHolder}
         <div className="container max-w-6xl mx-auto p-10 my-10 border-2 border-gray-50 rounded-lg">
            <Space direction="vertical" className="w-full" size="middle">
               {reservations &&
                  reservations?.length > 0 &&
                  "Vous n'avez aucun rendez-vous"}

               {reservations?.map((reservation) => (
                  <Ribbon text="A venir" key={reservation.id}>
                     <Card
                        title={
                           <strong>
                              {<a href="#">{reservation?.provider?.fullName}</a>} -{' '}
                              {<span>24 Oct. 2024 à 10h00 AM</span>}{' '}
                           </strong>
                        }
                        size="default"
                        className="hover:cursor-pointer hover:shadow"
                        type="inner"
                     >
                        <div className="flex flex-row justify-between items-center">
                           <div className="details border-l-4 border-slate-200 pl-4">
                              <h3 className="text-lg font-medium mb-2">
                                 <Link
                                    href="#"
                                    className="text-slate-800 hover:text-slate-900"
                                 >
                                    {reservation?.note}
                                 </Link>
                              </h3>
                              <table>
                                 <tbody>
                                    <tr>
                                       <td className="text-muted text-slate-500 w-1/2">
                                          Date
                                       </td>
                                       <td className="text-right text-slate-800 font-medium">
                                          {formatDate(reservation?.startAt)}
                                       </td>
                                    </tr>
                                    <tr>
                                       <td className="text-muted text-slate-500">Avec</td>
                                       <td>{reservation?.provider?.fullName}</td>
                                    </tr>
                                 </tbody>
                              </table>
                           </div>
                           <div className="image">
                              <Link href="#">
                                 <Image
                                    src="/assets/img/service-1.jpg"
                                    alt="Logo"
                                    width={120}
                                    height={120}
                                    className="rounded-lg"
                                 />
                              </Link>
                           </div>
                        </div>

                        <div className="flex flex-row justify-end items-center pt-4">
                           <Dropdown menu={{ items }}>
                              <Link href="#" onClick={(e) => handleCancel(reservation)}>
                                 <Space>
                                    Actions
                                    <DownOutlined />
                                 </Space>
                              </Link>
                           </Dropdown>
                        </div>
                     </Card>
                  </Ribbon>
               ))}
            </Space>
         </div>
      </>
   );
};

export default withAuth(Reservations);
