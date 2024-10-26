import _ from '@/utils/lodash';
import { PartialDeep } from 'type-fest';

export interface User {
   id: string;
   email: string;
   password: string;
   roles: string[];
   firstName: string;
   fullName: string;
   lastName: string;
   createdAt: string;
   createdAtAgo: string;
   updatedAt: string;
   updatedAtAgo: string;
   avatar: any;
   isCompany?: boolean;
   vatNumber?: string;
   fiscalCode?: string;
   name?: string;
   line1: string;
   country: string;
   city?: string;
   postalCode?: string;
   state?: string;
   recipientCode?: string;
   social?: {
      facebook: string;
      linkedin: string;
      instagram: string;
      twitter: string;
   };
}

export type UserEditWithoutId = Pick<
   User,
   | 'firstName'
   | 'lastName'
   | 'roles'
   | 'email'
   | 'password'
   | 'isCompany'
   | 'vatNumber'
   | 'social'
   | 'name'
   | 'recipientCode'
>;

export type UserEdit = UserEditWithoutId & { id: number };

export type AvatarEdit = Pick<User, 'avatar'> & { id: string };
export type UserChangePaswword = {
   oldPassword: string;
   password: string;
   confirmPassword: string;
   id: string;
};
export type UserWithoutPassword = Pick<
   User,
   | 'id'
   | 'firstName'
   | 'lastName'
   | 'email'
   | 'roles'
   | 'avatar'
   | 'createdAt'
   | 'updatedAt'
>;

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
   refresh_token: string;
}

export type UserRegistration = Pick<
   UserEdit,
   'firstName' | 'lastName' | 'email' | 'password'
>;

export interface LoginRequest {
   email: string;
   password: string;
}

export interface UserTotalComparedToLastWeek {
   total: number;
   fromLastWeek: string;
}

/**
 * Creates a new user object with the specified data.
 */
export function userModel(data: PartialDeep<User>): User {
   data = data || {};

   return _.defaults(data, {
      id: '',
      role: null, // guest
      data: {
         displayName: 'Guest User',
         photoURL: '',
         email: '',
         shortcuts: [],
         settings: {},
      },
   });
}
