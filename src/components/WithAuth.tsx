'use client';
import React, { useEffect } from 'react';
import { Pages } from '@/config';
import { redirect } from 'next/navigation';
import { authenticationCheck } from '@/utils/authenticationCheck';
import { useGetUserByToken } from '@/utils';

export default function withAuth<T>(Component: React.ComponentType<T>) {
   return function WithAuth(props: any) {
      const user = useGetUserByToken();
      useEffect(() => {
         if (!user) {
            redirect(Pages.LOGIN);
         }
      }, []);

      if (!user) {
         return;
      }
      return <Component {...props} />;
   };
}
