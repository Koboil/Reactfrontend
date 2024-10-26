'use client';
import { AVATAR_DEFAULT, Pages } from '@/config/constant';
import { usePathname } from 'next/navigation';
import {
   Disclosure,
   DisclosureButton,
   DisclosurePanel,
   Menu,
   MenuButton,
   MenuItem,
   MenuItems,
} from '@headlessui/react';
import { BellIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout, selectCurrentUser } from '@/features/authSlice';
import { useUserQuery } from '@/services/userApi';

const navigation = [
   { name: 'Tableau de bord', href: Pages.ADMIN_DASHBOARD },
   { name: 'Services', href: Pages.ADMIN_SERVICES },
   { name: 'Clients', href: Pages.ADMIN_CLIENTS },
   { name: 'Réservations', href: Pages.ADMIN_RESERVATIONS },
];

function classNames(...classes: any[]) {
   return classes.filter(Boolean).join(' ');
}

const TopBar = () => {
   const currentUser = useAppSelector(selectCurrentUser);
   const dispatch = useAppDispatch();
   const { data: user } = useUserQuery(currentUser?.id!, {
      skip: currentUser?.id ? false : true,
   });
   const pathname = usePathname();

   const userNavigation = [
      { name: 'Mon profil', href: Pages.ADMIN_PROFILES },
      { name: 'Entreprises', href: Pages.ADMIN_COMPANIES },
      { name: 'Avis', href: Pages.ADMIN_REVIEWS },
      { name: 'Paramètres', href: Pages.ADMIN_SETTINGS },
      {
         name: 'Déconnexion',
         href: Pages.LOGOUT,
         action: (e: any) => {
            e.preventDefault();
            dispatch(logout());
         },
      },
   ];
   return (
      <>
         <Disclosure as="nav" className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
               <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                     <div className="flex-shrink-0">
                        <Link href={Pages.ADMIN_DASHBOARD}>
                           <Image
                              src="/assets/img/CoachApp.png"
                              width={170}
                              height={100}
                              alt="CoachApp"
                              className="rounded"
                           />
                        </Link>
                     </div>
                     <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                           {navigation.map((item) => (
                              <Link
                                 key={item.name}
                                 href={item.href}
                                 aria-current={
                                    item.href === pathname ? 'page' : undefined
                                 }
                                 className={classNames(
                                    item.href === pathname
                                       ? 'bg-gray-900 text-white'
                                       : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'rounded-md px-3 py-2 text-sm font-medium',
                                 )}
                              >
                                 {item.name}
                              </Link>
                           ))}
                        </div>
                     </div>
                  </div>
                  <div className="hidden md:block">
                     <div className="ml-4 flex items-center md:ml-6">
                        <button
                           type="button"
                           className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                           <span className="absolute -inset-1.5" />
                           <span className="sr-only">Notifications</span>
                           <BellIcon aria-hidden="true" className="h-6 w-6" />
                        </button>

                        <Menu as="div" className="relative ml-3">
                           <div>
                              <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                 <span className="absolute -inset-1.5" />
                                 <span className="sr-only">MENU USER</span>
                                 <Image
                                    alt=""
                                    src={user?.avatar ?? AVATAR_DEFAULT}
                                    className="h-8 w-8 rounded-full"
                                    width={32}
                                    height={32}
                                 />
                              </MenuButton>
                           </div>
                           <MenuItems
                              transition
                              className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                           >
                              {userNavigation.map((item) => (
                                 <MenuItem key={item.name}>
                                    <Link
                                       href={item.href}
                                       className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                                    >
                                       {item.name}
                                    </Link>
                                 </MenuItem>
                              ))}
                           </MenuItems>
                        </Menu>
                     </div>
                  </div>

                  <div className="-mr-2 flex md:hidden">
                     <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">MAIN MENU</span>
                        <Bars3Icon
                           aria-hidden="true"
                           className="block h-6 w-6 group-data-[open]:hidden"
                        />
                        <XMarkIcon
                           aria-hidden="true"
                           className="hidden h-6 w-6 group-data-[open]:block"
                        />
                     </DisclosureButton>
                  </div>
               </div>
            </div>

            <DisclosurePanel className="md:hidden">
               <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                     <DisclosureButton
                        key={item.name}
                        as="link"
                        href={item.href}
                        aria-current={item.href === pathname ? 'page' : undefined}
                        className={classNames(
                           item.href === pathname
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                           'block rounded-md px-3 py-2 text-base font-medium',
                        )}
                     >
                        {item.name}
                     </DisclosureButton>
                  ))}
               </div>

               <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                     <div className="flex-shrink-0">
                        <Image
                           alt=""
                           src={user?.avatar ?? AVATAR_DEFAULT}
                           className="h-10 w-10 rounded-full"
                           width={40}
                           height={40}
                        />
                     </div>
                     <div className="ml-3 mb-2">
                        <div className="text-base font-medium leading-none text-white">
                           {user?.fullName}
                        </div>
                        <div className="text-sm font-medium leading-none text-gray-400">
                           {user?.email}
                        </div>
                     </div>
                     <button
                        type="button"
                        className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                     >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">NOTIFICATIONS</span>
                        <BellIcon aria-hidden="true" className="h-6 w-6" />
                     </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                     {userNavigation.map((item) => (
                        <DisclosureButton
                           key={item.name}
                           as="link"
                           href={item.href}
                           {...(item?.action && { onClick: item?.action })}
                           className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                           {item.name}
                        </DisclosureButton>
                     ))}
                  </div>
               </div>
            </DisclosurePanel>
         </Disclosure>
      </>
   );
};
export default TopBar;
