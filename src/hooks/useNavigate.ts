import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Pages } from '@/config/constant';
import { useCallback } from 'react';

const useNavigate = () => {
   const router = useRouter();
   const pathname = usePathname();
   const searchParams = useSearchParams();
   return useCallback(
      (page: Pages, queries?: Object) => {
         if (!queries) {
            router.push(page);
            return;
         }
         const params = new URLSearchParams(searchParams.toString());
         for (const [key, value] of Object.entries(queries)) {
            params.set(key, value);
         }
         router.push(page + '?' + params.toString());
      },
      [router, searchParams],
   );
};

export default useNavigate;
