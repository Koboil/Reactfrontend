'use client';
import withAuth from '@/components/WithAuth';
import { useCallback, useEffect, useState } from 'react';
import { Table, Tag, Dropdown, MenuProps, notification } from 'antd';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import {
   useDeleteReservationMutation,
   useReservationsJsonLdQuery,
} from '@/services/reservationApi';
import { Pages } from '@/config';
import Link from 'next/link';
import { useUsersJsonLdQuery } from '@/services/userApi';
import { useServicesJsonLdQuery } from '@/services/serviceApi';
import { Reservation } from '@/models';
import { User } from '@/models/User.model';
import { Service } from '@/models/Service.model';
import { ReservationStatus } from '@/models/Reservation.model';
import {
   formatDate,
   getErrorMessage,
   getReservationStatusLabel,
   truncate,
} from '@/utils';
import { message } from 'antd/lib';

function Dashboard() {
   const [reservations, setReservations] = useState<Array<Reservation>>([]);

   const { data: customers } = useUsersJsonLdQuery();
   const { data: services } = useServicesJsonLdQuery({});
   const { data: users } = useUsersJsonLdQuery({});
   const { data: reservationsRaw } = useReservationsJsonLdQuery({ pagination: false });
   const [deleteItem] = useDeleteReservationMutation();

   const [stats, setStats] = useState([
      { name: 'Services', value: 0 },
      { name: 'Prestataires', value: 0 },
      { name: 'Utilisateurs', value: 0 },
      { name: 'Réservés', value: 0 },
   ]);

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
         render: (status: ReservationStatus) => {
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
                     <Link
                        className="details"
                        href={`${Pages.RESERVATIONS}/${record.id}`}
                     >
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

   const updateStat = (name: string, newValue: number) => {
      setStats((prevStats) =>
         prevStats.map((stat) =>
            stat.name === name ? { ...stat, value: newValue } : stat,
         ),
      );
   };

   useEffect(() => {
      if (customers) {
         updateStat(
            'Clients  Inscrits',
            Number(customers['hydra:totalItems' as unknown as keyof typeof customers]),
         );
      }
   }, [customers]);

   useEffect(() => {
      if (services) {
         updateStat(
            'Services',
            Number(services['hydra:totalItems' as unknown as keyof typeof services]),
         );
      }
   }, [services]);

   useEffect(() => {
      if (reservationsRaw) {
         setReservations(
            reservationsRaw['hydra:member' as unknown as keyof typeof reservationsRaw],
         );
         updateStat(
            'Réservés',
            Number(
               reservationsRaw[
                  'hydra:totalItems' as unknown as keyof typeof reservationsRaw
               ],
            ),
         );
      }
   }, [reservationsRaw]);
   useEffect(() => {
      if (users) {
         updateStat(
            'Utilisateurs',
            Number(users['hydra:totalItems' as unknown as keyof typeof users]),
         );
      }
   }, [users]);

   return (
      <>
         <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="page-wrapper relative z-[1] bg-white">
               <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {stats.map((stat, index) => (
                     <div
                        key={index}
                        className="bg-indigo-600 text-white shadow-lg rounded-lg p-6"
                     >
                        <div className="text-xl font-semibold">{stat.value}</div>
                        <div className="text-sm">{stat.name}</div>
                     </div>
                  ))}
               </div>

               {/* <div className="mb-4">
                  <input
                     type="text"
                     placeholder="Rechercher par client, service ou email"
                     className="w-full px-4 py-2 border border-gray-300 rounded-md"
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                  />
               </div> */}

               <div className="overflow-hidden bg-white shadow rounded-lg">
                  <div className="px-6 py-4">
                     <h2 className="text-xl font-semibold text-gray-800">
                        Liste des réservations en cours
                     </h2>
                  </div>
                  <Table dataSource={reservations} columns={columns} />
               </div>
            </div>
         </div>
      </>
   );
}

export default withAuth(Dashboard);
