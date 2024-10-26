'use client';
import {
   BaseQueryApi,
   BaseQueryFn,
   FetchArgs,
   fetchBaseQuery,
   FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { apiUrl } from '@/config/constant';
import { logout, selectCurrentToken } from '@/features/authSlice';
import { selectCurrentLocale } from '@/features/localeSlice';
import { RootState } from '@/store/store';
import { defaultLocale } from '@/config/language';

const REFRESH_URL = '/token/refresh';

/**
 * Save token and Refresh_token in localStorage
 * @param userToken
 */
const saveToken = (userToken: { token: string; refresh_token: string }) => {
   localStorage.setItem('token', userToken.token.replace('"', ''));
   localStorage.setItem('refresh_token', userToken.refresh_token.replace('"', ''));
};

// Create a new mutex
const mutex = new Mutex();
const baseQuery = (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
   const defaultIsJsonContentType = (headers: Headers) =>
      /ion\/((vnd\.api\+)|(merge\-patch\+)|(ld\+))?json/.test(
         headers.get('content-type') || '',
      );
   const currentLocale = selectCurrentLocale(api.getState() as RootState);

   const query = fetchBaseQuery({
      baseUrl: `${apiUrl}/api`,
      // credentials: 'include',
      isJsonContentType: defaultIsJsonContentType,
      prepareHeaders: (headers) => {
         const token = selectCurrentToken(api.getState() as RootState);
         if (token) {
            headers.set('Authorization', 'Bearer ' + token);
         }

         //headers.set('X-LOCALE', currentLocale ?? defaultLocale);
         return headers;
      },
   });

   return query(args, api, extraOptions);
};
const baseQueryWithReauth: BaseQueryFn<
   string | FetchArgs,
   unknown,
   FetchBaseQueryError
> = async (args, api, extraOptions) => {
   // wait until the mutex is available without locking it
   await mutex.waitForUnlock();
   let result = await baseQuery(args, api, extraOptions);

   if (
      (result.error?.data as any)?.message === 'JWT Token not found' ||
      (result.error?.data as any)?.message === 'Expired JWT Token' ||
      (result.error?.data as any)?.message === 'Invalid JWT Token'
   ) {
      if (!mutex.isLocked()) {
         const release = await mutex.acquire();

         try {
            const refreshResult: any = await baseQuery(
               {
                  credentials: 'include',
                  url: REFRESH_URL,
                  method: 'POST',
                  headers: {
                     Accept: 'application/json',
                     'Content-Type': 'application/json',
                  },
               },
               api,
               extraOptions,
            );

            if (refreshResult.data) {
               saveToken({
                  token: refreshResult.data.user?.email,
                  refresh_token: 'refresh_token',
               });
               result = await baseQuery(args, api, extraOptions);
            } else {
               //Clear storage and redirect to login page
               api.dispatch(logout());
            }
         } finally {
            // release must be called once the mutex should be released again.
            release();
         }
      } else {
         // wait until the mutex is available without locking it
         await mutex.waitForUnlock();
         result = await baseQuery(args, api, extraOptions);
      }
   }

   return result;
};
export default baseQueryWithReauth;
