'use client';
import type { PayloadAction } from '@reduxjs/toolkit';
import Cookie from 'js-cookie';

/* eslint import/no-extraneous-dependencies: off */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '@/models';
import { PartialDeep } from 'type-fest';
import _ from '@/utils/lodash';
import { RootState } from '@/store/store';
import { ApiRoutesWithoutPrefix, Pages } from '@/config/constant';
import { getApiRoutesWithPrefix, retrieveAuthTokenName } from '@/utils';

export interface UserAuth {
   id: string;
   firstName: string;
   lastName: string;
   email: string;
   avatar: string;
   roles: string;
}

export interface UserResponse {
   user: UserAuth;
   token: string;
}

type AuthState = {
   user: UserAuth | null;
   token: string | null;
   refresh_token: string | null;
};

const getToken = () => {
   if (typeof window !== 'undefined') {
      const tokenString = window.localStorage.getItem('token');
      if (tokenString == null) {
         return null;
      }
      return tokenString.replace('"', '');
   }
   return null;
};

const getRefreshToken = () => {
   if (typeof window !== 'undefined') {
      const tokenString = window.localStorage.getItem('refresh_token');
      if (!tokenString) {
         return null;
      }
      return tokenString.replace('"', '');
   }
   return null;
};

const getUserFromLocalStorage = () => {
   // Put the object into storage
   // localStorage.setItem('testObject', JSON.stringify(testObject));
   if (typeof window !== 'undefined') {
      // Retrieve the object from storage
      const user = window.localStorage.getItem('user');
      if (user) {
         return JSON.parse(user);
      }
   }
   return null;
};

const initialState: AuthState = {
   user: getUserFromLocalStorage(),
   token: getToken(),
   refresh_token: getRefreshToken(),
};
export const authSlice = createSlice({
   name: 'auth',
   initialState: initialState,

   reducers: {
      loginReducer: (state, action) => {
         state.user = action.payload;
      },
      setUser: (state, { payload: { user } }: PayloadAction<{ user: UserAuth }>) => {
         state.user = user;
         if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(user));
         }
      },
      setCredentials: (
         state,
         {
            payload: { token, refresh_token },
         }: PayloadAction<{ token: string | null; refresh_token: string | null }>,
      ) => {
         if (token && refresh_token) {
            state.token = token;
            state.refresh_token = refresh_token;
            if (typeof window !== 'undefined') {
               localStorage.setItem('token', token);
               localStorage.setItem('refresh_token', refresh_token);

               Cookie.set(retrieveAuthTokenName('access'), token, {
                  secure: process.env.NODE_ENV === 'production',
                  sameSite: 'Strict',
               });
               Cookie.set(retrieveAuthTokenName('refresh'), refresh_token, {
                  secure: process.env.NODE_ENV === 'production',
                  sameSite: 'Strict',
               });
            }
         }
      },
      logout: (state) => {
         fetch(getApiRoutesWithPrefix(ApiRoutesWithoutPrefix.LOGOUT), {
            //credentials: 'include',
         })
            //.then((response) => console.log(response))
            //.catch((err) => console.log(err))
            .finally(() => {
               if (typeof window !== 'undefined') {
                  localStorage.clear();
                  sessionStorage.clear();
                  Cookie.remove(retrieveAuthTokenName('refresh'));
                  Cookie.remove(retrieveAuthTokenName('access'));
                  state = initialState;
                  window.location.replace(Pages.HOME);
               }
            });
      },
      /**
       * Updates the user object in the Redux store.
       */
      updateUser: (state, action) => {
         const oldState = _.cloneDeep(state.user);
         const user = action.payload.user as PartialDeep<User>;
         const newUser = _.merge({}, oldState, user);

         if (_.isEqual(oldState, newUser)) {
            return undefined;
         }

         return { ...state, user: newUser as UserAuth };
      },
      userSignOut: () => initialState,
   },
});

export const { loginReducer, userSignOut, updateUser, setUser, setCredentials, logout } =
   authSlice.actions;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;

export const selectUser = (state: RootState) => state?.auth?.user;

export const selectUserId = (state: RootState) => state?.auth?.user?.id;

export const selectUserRole = (state: RootState) => state?.auth?.user?.roles;

export const selectIsUserGuest = (state: RootState) => {
   const userRole = state?.auth?.user?.roles;

   return !userRole || userRole?.length === 0;
};

export type authSliceType = typeof authSlice;

export default authSlice.reducer;
