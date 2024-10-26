'use client';
import withAuth from '@/components/WithAuth';
import { useCallback, useEffect, useState } from 'react';
import { Dropdown, MenuProps, Table, Tag } from 'antd';
import { User } from '@/models/User.model';
import { Service } from '@/models/Service.model';
import { Reservation } from '@/models';
import { ReservationStatus as ReservationStatusModel } from '@/models/Reservation.model';
import {
   formatDate,
   getErrorMessage,
   getReservationStatusLabel,
   truncate,
} from '@/utils';
import { ReservationStatus } from '@/config';

import Link from 'next/link';
import { Pages } from '@/config';
import { message } from 'antd/lib';
import { useDeleteServiceMutation, useServicesJsonLdQuery } from '@/services/serviceApi';
import {
   useDeleteReservationMutation,
   useReservationsJsonLdQuery,
   useReservationStatusesQuery,
} from '@/services/reservationApi';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

function Reservations() {
   const [reservations, setReservations] = useState<Array<Reservation>>([]);

   const { data: reservationsRaw } = useReservationsJsonLdQuery({ pagination: false });
   const { data: reservationsConfirmedRaw } = useReservationsJsonLdQuery({
      pagination: false,
      'status.name': ReservationStatus.CONFIRMED,
   });
   const { data: reservationsCanceledRaw } = useReservationsJsonLdQuery({
      pagination: false,
      'status.name': ReservationStatus.CANCELED,
   });
   const { data: reservationsCompletedRaw } = useReservationsJsonLdQuery({
      pagination: false,
      'status.name': ReservationStatus.COMPLETED,
   });

   const [deleteItem] = useDeleteReservationMutation();
   const [stats, setStats] = useState([
      { name: 'Réservations', value: 0, color: 'bg-indigo-600' },
      { name: 'Réservations en cours', value: 0, color: 'bg-green-600' },
      { name: 'Réservations terminées', value: 0, color: 'bg-yellow-600' },
      { name: 'Réservations annulées', value: 0, color: 'bg-red-600' },
   ]);

   const updateStat = (name: string, newValue: number) => {
      setStats((prevStats) =>
         prevStats.map((stat) =>
            stat.name === name ? { ...stat, value: newValue } : stat,
         ),
      );
   };

   useEffect(() => {
      if (reservationsRaw) {
         setReservations(
            reservationsRaw['hydra:member' as unknown as keyof typeof reservationsRaw],
         );
         updateStat(
            'Réservations',
            Number(
               reservationsRaw[
                  'hydra:totalItems' as unknown as keyof typeof reservationsRaw
               ],
            ),
         );
      }
   }, [reservationsRaw]);

   useEffect(() => {
      if (reservationsConfirmedRaw) {
         updateStat(
            'Réservations en cours',
            Number(
               reservationsConfirmedRaw[
                  'hydra:totalItems' as unknown as keyof typeof reservationsConfirmedRaw
               ],
            ),
         );
      }
   }, [reservationsConfirmedRaw]);

   useEffect(() => {
      if (reservationsCanceledRaw) {
         updateStat(
            'Réservations annulées',
            Number(
               reservationsCanceledRaw[
                  'hydra:totalItems' as unknown as keyof typeof reservationsCanceledRaw
               ],
            ),
         );
      }
   }, [reservationsCanceledRaw]);

   useEffect(() => {
      if (reservationsCompletedRaw) {
         updateStat(
            'Réservations terminées',
            Number(
               reservationsCompletedRaw[
                  'hydra:totalItems' as unknown as keyof typeof reservationsCompletedRaw
               ],
            ),
         );
      }
   }, [reservationsCompletedRaw]);

   const handleDelete = useCallback(
      async (id: any) => {
         if (window.confirm('Etes-vous sûr')) {
            try {
               await deleteItem(id).unwrap();
               messageApi.success('Elément supprimé');
            } catch (err) {
               const { detail } = getErrorMessage(err);
               messageApi.error(detail);
            }
         }
      },
      [deleteItem],
   );

   const columns = [
      {
         title: 'Client',
         dataIndex: 'customer',
         key: 'customer',
         render: (customer: User) => customer?.lastName,
      },
      {
         title: 'Service',
         dataIndex: 'service',
         key: 'service',
         render: (service: Service) => service?.name,
      },
      {
         title: 'Date début',
         dataIndex: 'startAt',
         key: 'startAt',
         render: (startAt: string) => formatDate(startAt),
      },
      {
         title: 'Note',
         dataIndex: 'note',
         key: 'note',
         render: (note: string) => truncate(note, 50) || '-',
      },
      {
         title: 'Statut',
         dataIndex: 'status',
         key: 'status',
         render: (status: ReservationStatusModel) => {
            return (
               <Tag color={status?.color}>{getReservationStatusLabel(status?.name)}</Tag>
            );
         },
      },
      {
         title: 'Action',
         key: 'action',
         fixed: 'right',
         width: 100,
         render: (_, record: Reservation) => {
            const items: MenuProps['items'] = [
               {
                  label: (
                     <Link className="details" href={`${Pages.SERVICES}/${record.id}`}>
                        Voir Détails
                     </Link>
                  ),
                  key: '0',
               },
               {
                  label: 'Modifier',
                  key: '1',
               },
               {
                  label: (
                     <span className="details" onClick={() => handleDelete(record.id)}>
                        Supprimer
                     </span>
                  ),
                  key: '2',
               },
            ];
            return (
               <>
                  <Dropdown
                     className="cursor-pointer flex items-center justify-center"
                     menu={{ items }}
                  >
                     <div>
                        <EllipsisVerticalIcon className="h-4 w-4" />
                     </div>
                  </Dropdown>
               </>
            );
         },
      },
   ];
   return (
      <>
         <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="page-wrapper relative z-[1] bg-white">
               <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {stats.map((stat) => (
                     <div
                        key={stat.name}
                        className={`${stat.color} text-white shadow-lg rounded-lg p-6`}
                     >
                        <div className="text-xl font-semibold">{stat.value}</div>
                        <div className="text-sm">{stat.name}</div>
                     </div>
                  ))}
               </div>

               <div className="overflow-hidden bg-white shadow rounded-lg">
                  <div className="px-6 py-4">
                     <h2 className="text-xl font-semibold text-gray-800">
                        Toutes les réservations
                     </h2>
                  </div>
                  <Table dataSource={reservations} columns={columns} />
               </div>
            </div>
         </div>
      </>
   );
}

export default withAuth(Reservations);
