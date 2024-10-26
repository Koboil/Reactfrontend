'use client';
import { retrieveAuthTokenName } from '@/utils/index';
import { AuthToken } from '@/utils/authToken';
import { Pages } from '@/config';

export const authenticationCheck = () => {
   if (typeof window === 'undefined') {
      return false;
   }
   const token = retrieveAuthTokenName('access');
   const auth = new AuthToken(token);

   if (!token || !auth.isAuthenticated) {
      return false;
   }
   return true;
};
