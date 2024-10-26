import Link from 'next/link';
import { headers } from 'next/headers';
import Image from 'next/image';
import { Pages } from '@/config/constant';

export default async function NotFound() {
   const headersList = await headers();
   const domain = headersList.get('host');
   return (
      <div className="text-center h-[calc(50vh-100px)]">
         <p className="text-base font-semibold text-indigo-600">404</p>
         <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page non trouvée
         </h1>
         <p className="mt-6 text-base leading-7 text-gray-600">
            Désolé, nous n'avons pas trouvé la page que vous recherchez.
         </p>
         <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
               href={Pages.HOME}
               className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
               Retour à l'accueil
            </Link>
            {/* <a href="#" className="text-sm font-semibold text-gray-900">
               Contactez le support <span aria-hidden="true">&rarr;</span>
            </a> */}
         </div>
      </div>
   );
}
