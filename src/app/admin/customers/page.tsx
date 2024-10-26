'use client';
import { useEffect, useState } from 'react';
import withAuth from '@/components/WithAuth';
import Link from 'next/link';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/outline';
import { Pages } from '@/config/constant';
import { Table } from 'antd';
import { User } from '@/models/User.model';
import { useUsersJsonLdQuery } from '@/services/userApi';

const columns = [
   {
      title: 'Nom complet',
      dataIndex: 'fullName',
      key: 'fullName',
   },
   {
      title: 'Adresse email',
      dataIndex: 'email',
      key: 'email',
   },
   {
      title: 'A rejoint',
      dataIndex: 'createdAtAgo',
      key: 'createdAtAgo',
   },
];

function Customers() {
   const [users, setUsers] = useState<Array<User>>([]);
   // const { data: servicesRaw } = useServicesJsonLdQuery({});
   // useEffect(() => {
   //    if (servicesRaw) {
   //       setServices(servicesRaw);
   //    }
   // }, [servicesRaw]);

   return (
      <>
         <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="overflow-hidden bg-white shadow rounded-lg">
               <div className="flex justify-between items-center px-6 py-4 pb-2 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                     Liste des clients
                  </h2>
               </div>
               <Table dataSource={users} columns={columns} />
            </div>
         </div>
      </>
   );
}

export default withAuth(Customers);
