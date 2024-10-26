import Cookie from 'js-cookie';
import { retrieveAuthTokenName } from '@/utils';

export type DecodedToken = {
   readonly exp: number;
};

export const getAccessToken = () => {
   return Cookie.get(retrieveAuthTokenName('access')) || '';
};
export class AuthToken {
   readonly decoded;
   constructor(readonly token: string = getAccessToken()) {
      this.decoded = {
         exp: 0,
      };

      if (token) this.decoded = '';
   }

   get isAuthenticated(): boolean {
      return this.token ? true : false;
   }

   get bearerString() {
      return `JWT ${this.token}`;
   }
}
