'use client';
import { useCallback, useEffect, useState } from 'react';
import withAuth from '@/components/WithAuth';
import Link from 'next/link';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/outline';
import { Pages } from '@/config/constant';
import { Dropdown, MenuProps, Table, Tag } from 'antd';
import { Company, Reservation, ReservationStatus, Service } from '@/models';
import { useDeleteServiceMutation, useServicesJsonLdQuery } from '@/services/serviceApi';
import { useDeleteReservationMutation } from '@/services/reservationApi';
import { message } from 'antd/lib';
import { getErrorMessage } from '@/utils';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

function Services() {
   const [services, setServices] = useState<Array<Service>>([]);
   const [messageApi, contextHolder] = message.useMessage();
   const { data: servicesRaw } = useServicesJsonLdQuery({ pagination: false });
   const [deleteItem] = useDeleteServiceMutation();

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
      [deleteItem, messageApi],
   );
   useEffect(() => {
      if (servicesRaw) {
         setServices(servicesRaw['hydra:member' as unknown as keyof typeof servicesRaw]);
      }
   }, [servicesRaw]);

   const columns = [
      {
         title: 'Entreprise',
         dataIndex: 'company',
         key: 'company',
         render: (company: Company) => company?.name,
      },
      {
         title: 'Ajouté',
         dataIndex: 'createdAtAgo',
         key: 'createdAt',
      },
      {
         title: 'Statut',
         dataIndex: 'isActive',
         key: 'isActive',
         render: (isActive: boolean) => {
            return (
               <Tag color={isActive ? 'blue' : 'red'}>
                  {isActive ? 'Actif' : 'Désactivé'}
               </Tag>
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
         {contextHolder}
         <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="overflow-hidden bg-white shadow rounded-lg">
               <div className="flex justify-between items-center px-6 py-4 pb-2 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                     Liste des services
                  </h2>
                  <Link href={Pages.ADMIN_SERVICES_EDIT}>
                     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Ajouter un service
                     </button>
                  </Link>
               </div>
               <Table dataSource={services} columns={columns} />
            </div>
         </div>
      </>
   );
}

export default withAuth(Services);
