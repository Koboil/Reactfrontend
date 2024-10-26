'use client';
import { Pages } from '@/config/constant';

interface FooterProps {
   isLogoClickable?: boolean;
   showCopyRight?: boolean;
}

const Footer = ({ isLogoClickable = true }: FooterProps) => {
   return (
      <>
         <footer className="section-footer bg-gray-800">
            <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
               <nav
                  className="-mx-5 -my-2 flex flex-wrap justify-center"
                  aria-label="Footer"
               >
                  <div className="px-5 py-2">
                     <a href="#" className="text-base text-gray-300 hover:text-white">
                        A PROPOS
                     </a>
                  </div>
                  <div className="px-5 py-2">
                     <a href="#" className="text-base text-gray-300 hover:text-white">
                        SERVICES
                     </a>
                  </div>
                  <div className="px-5 py-2">
                     <a href="#" className="text-base text-gray-300 hover:text-white">
                        CONTACTS
                     </a>
                  </div>
                  <div className="px-5 py-2">
                     <a href="#" className="text-base text-gray-300 hover:text-white">
                        CONFIDENTIALITÉS
                     </a>
                  </div>
               </nav>
               <div className="mt-8 flex justify-center space-x-6">
                  <a
                     href="https://twitter.com"
                     className="text-gray-400 hover:text-white"
                  >
                     <span className="sr-only">Twitter</span>
                     <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                     >
                        <path d="M24 4.56c-.89.39-1.84.65-2.84.77a4.93 4.93 0 002.16-2.72 9.79 9.79 0 01-3.1 1.19A4.91 4.91 0 0016.75 3c-2.7 0-4.9 2.2-4.9 4.91 0 .38.04.75.12 1.11-4.08-.2-7.7-2.16-10.12-5.13a4.9 4.9 0 00-.66 2.47c0 1.7.87 3.2 2.2 4.07-.8-.02-1.55-.25-2.21-.61v.06c0 2.37 1.68 4.34 3.91 4.79a4.93 4.93 0 01-2.2.08c.62 1.93 2.42 3.34 4.56 3.38a9.87 9.87 0 01-6.1 2.1c-.39 0-.78-.02-1.16-.07A13.94 13.94 0 007.68 21c9.06 0 14-7.51 14-14.02 0-.21 0-.42-.02-.62A9.99 9.99 0 0024 4.56z" />
                     </svg>
                  </a>
                  <a
                     href="https://facebook.com"
                     className="text-gray-400 hover:text-white"
                  >
                     <span className="sr-only">Facebook</span>
                     <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                     >
                        <path d="M22.67 0H1.33C.6 0 0 .6 0 1.33v21.34C0 23.4.6 24 1.33 24H12.8v-9.31H9.68V11.4h3.12V8.74c0-3.1 1.87-4.79 4.6-4.79 1.31 0 2.43.1 2.75.15v3.19h-1.89c-1.48 0-1.76.7-1.76 1.72v2.25h3.53l-.46 3.3h-3.07V24h6.02c.73 0 1.33-.6 1.33-1.33V1.33C24 .6 23.4 0 22.67 0z" />
                     </svg>
                  </a>
               </div>
               <p className="mt-8 text-center text-base text-gray-400">
                  &copy; 2024 CoachApp. Tous droits réservés.
               </p>
            </div>
         </footer>
      </>
   );
};

export default Footer;
