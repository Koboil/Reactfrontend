import type { NextAuthConfig } from 'next-auth';
import { Pages } from '@/config/constant';

export const authConfig = {
   pages: {
      signIn: Pages.LOGIN,
   },
   callbacks: {
      authorized({ auth, request: { nextUrl } }) {
         const isLoggedIn = !!auth?.user;
         const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
         if (isOnDashboard) {
            if (isLoggedIn) return true;
            return false; // Redirect unauthenticated users to login page
         } else if (isLoggedIn) {
            return Response.redirect(new URL(Pages.ADMIN, nextUrl));
         }
         return true;
      },
   },
   providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
