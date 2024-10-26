import Image from 'next/image';
import { Pages } from '@/config/constant';
const EmailVerification = () => {
   return (
      <div className="page-wrapper relative z-[1] bg-ColorOffWhite">
         <main className="main-wrapper relative overflow-hidden">
            <section className="section-signin">
               <div className="py-20">
                  <div className="container-default">
                     <div className="mx-auto max-w-[536px]">
                        <div className="jos xm:p-10 mt-10 rounded-[10px] border-2 border-ColorBlack bg-white p-[30px] lg:mt-[40px]">
                           <div className="mx-auto max-w-2xl text-center">
                              <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                                 Vérifez vos mails
                              </h2>
                              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
                                 Nous vous avons envoyé un mail de vérification à
                                 l'adresse email que vous avez fourni.
                              </p>
                              <div className="mt-10 flex items-center justify-center gap-x-6">
                                 <a
                                    href="#"
                                    className="text-base font-semibold leading-7 text-gray-900"
                                 >
                                    Renvoyer le mail
                                 </a>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </main>
      </div>
   );
};
export default EmailVerification;
