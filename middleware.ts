import type { NextRequest } from 'next/server';
import { useGetUserByToken } from '@/utils';

export function middleware(request: NextRequest) {
   const currentUser = request.cookies.get('user')?.value;

   if (currentUser && !request.nextUrl.pathname.startsWith('/users')) {
      return Response.redirect(new URL('/users', request.url));
   }

   if (!currentUser && !request.nextUrl.pathname.startsWith('/auth')) {
      return Response.redirect(new URL('/auth', request.url));
   }
}

export const config = {
   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
