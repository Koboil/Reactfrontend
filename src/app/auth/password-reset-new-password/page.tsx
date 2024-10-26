import Image from 'next/image';
import { Pages } from '@/config/constant';
const PasswordResetNewPassword = () => {
   return (
      <div className="page-wrapper relative z-[1] bg-ColorOffWhite">
         <main className="main-wrapper relative overflow-hidden">
            <section className="section-signin">
               <div className="py-20">
                  <div className="container-default">
                     <div className="mx-auto max-w-[536px]">
                        <div className="flex flex-col items-center justify-center text-center">
                           <div>
                              <h2 className="mb-[10px] text-2xl font-bold">
                                 Réinitialiser votre mot de passe
                              </h2>
                              <p className="text-ColorBlack/80">
                                 Entrez votre nouveau mot de passe ci-dessous
                              </p>
                           </div>
                        </div>

                        <div className="jos xm:p-10 mt-10 rounded-[10px] border-2 border-ColorBlack bg-white p-[30px] lg:mt-[40px]">
                           <form action="#" method="post">
                              <div className="flex flex-col gap-6">
                                 <div>
                                    <label
                                       htmlFor="password"
                                       className="mb-[10px] block text-left font-semibold text-ColorBlack"
                                    >
                                       Nouveau mot de passe *
                                    </label>
                                    <input
                                       type="password"
                                       name="password"
                                       id="password"
                                       placeholder="**********"
                                       className="w-full rounded-[10px] border border-ColorBlack/50 px-[30px] py-[15px] outline-none transition-all duration-300 placeholder:text-ColorBlack/50 focus:border-ColorBlue"
                                       required
                                    />
                                 </div>

                                 <div>
                                    <label
                                       htmlFor="confirmPassword"
                                       className="mb-[10px] block text-left font-semibold text-ColorBlack"
                                    >
                                       Confirmer le mot de passe *
                                    </label>
                                    <input
                                       type="password"
                                       name="confirmPassword"
                                       id="confirmPassword"
                                       placeholder="**********"
                                       className="w-full rounded-[10px] border border-ColorBlack/50 px-[30px] py-[15px] outline-none transition-all duration-300 placeholder:text-ColorBlack/50 focus:border-ColorBlue"
                                       required
                                    />
                                 </div>
                              </div>

                              <div className="mt-5 flex justify-center w-full">
                                 <button
                                    type="submit"
                                    className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                                 >
                                    Réinitialiser le mot de passe
                                 </button>
                              </div>
                           </form>
                           {/*

                           <p className="mt-[15px] text-center text-base text-ColorBlack/80">
                              Don’t have an account?
                              <a
                                 href="signup.html"
                                 className="font-semibold text-ColorBlue/80 hover:text-ColorBlue"
                              >
                                 Create an account
                              </a>
                           </p>
                           */}
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </main>
      </div>
   );
};
export default PasswordResetNewPassword;
