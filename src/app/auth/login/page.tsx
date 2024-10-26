'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useLoginMutation } from '@/services/userApi';
import { useAppDispatch } from '@/store/hooks';
import useNavigate from '@/hooks/useNavigate';
import { setUser, setCredentials } from '@/features/authSlice';
import { Pages } from '@/config/constant';
import { getErrorMessage } from '@/utils';
import { Alert } from 'antd';

const form = {
   email: '',
   password: '',
};
const Login = () => {
   const [formValue, setFormValue] = useState(form);
   const { email, password } = formValue;
   //eslint-disable-next-line
   const [errorMessage, setErrorMessage] = useState<any>(null);
   const [login] = useLoginMutation();
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const setFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setErrorMessage('');
      setFormValue((prevState) => ({ ...prevState, [name]: value }));
   };
   const handleSubmit = async (e: any) => {
      e.preventDefault();
      setErrorMessage(null);
      try {
         const res = await login({
            email,
            password,
         }).unwrap();
         if (
            res?.user &&
            (res.user?.roles?.includes('ROLE_ADMIN') ||
               res.user?.roles?.includes('ROLE_USER'))
         ) {
            dispatch(setUser({ user: res.user }));
            dispatch(
               setCredentials({
                  token: res?.token,
                  refresh_token: res?.refresh_token,
               }),
            );
            navigate(Pages.ADMIN_DASHBOARD);
         } else {
            setErrorMessage("Vous n'êtes pas autorisé à accéder à cette page");
         }
      } catch (err) {
         const { detail } = getErrorMessage(err);
         setErrorMessage(detail);
      }
   };
   return (
      <div className="page-wrapper relative z-[1] bg-ColorOffWhite">
         <main className="main-wrapper relative overflow-hidden">
            <section className="section-signin">
               <div className="py-40">
                  <div className="container-default">
                     <div className="mx-auto max-w-[536px]">
                        <div className="flex flex-col items-center justify-center text-center">
                           <div>
                              <h2 className="mb-[10px] text-2xl font-bold">Connexion</h2>
                              <p className="text-ColorBlack/80">
                                 Entrez vos identifiants ci-dessous pour vous connecter
                              </p>
                           </div>
                        </div>
                        <div className="jos xm:p-10 mt-10 rounded-[10px] border-2 border-ColorBlack bg-white p-[30px] lg:mt-[40px]">
                           {errorMessage && (
                              <Alert
                                 message="Connexion échouée"
                                 description={errorMessage}
                                 type="error"
                                 showIcon
                                 closable
                              />
                           )}
                           <form onSubmit={handleSubmit} className="pt-5">
                              <div className="flex flex-col gap-6">
                                 <div>
                                    <label
                                       htmlFor="email"
                                       className="mb-[10px] block text-left font-semibold text-ColorBlack"
                                    >
                                       Adresse email *
                                    </label>
                                    <input
                                       type="email"
                                       name="email"
                                       value={email}
                                       onChange={setFormChange}
                                       placeholder="Entrez votre adresse email"
                                       className="w-full rounded-[10px] border border-ColorBlack/50 px-[30px] py-[15px] outline-none transition-all duration-300 placeholder:text-ColorBlack/50 focus:border-ColorBlue"
                                       required
                                    />
                                 </div>

                                 <div>
                                    <label
                                       htmlFor="password"
                                       className="mb-[10px] block text-left font-semibold text-ColorBlack"
                                    >
                                       Mot de passe*
                                    </label>
                                    <input
                                       type="password"
                                       name="password"
                                       value={password}
                                       onChange={setFormChange}
                                       placeholder="**********"
                                       className="w-full rounded-[10px] border border-ColorBlack/50 px-[30px] py-[15px] outline-none transition-all duration-300 placeholder:text-ColorBlack/50 focus:border-ColorBlue"
                                       required
                                    />
                                    {/* <div className="mt-1 mr-5 text-red-500">
                                       <span>Mot de passe incorrect</span>
                                    </div> */}
                                 </div>
                              </div>

                              <div className="mt-5 flex justify-center w-full">
                                 <button
                                    type="submit"
                                    className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                                 >
                                    Se Connecter
                                 </button>
                              </div>
                           </form>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </main>
      </div>
   );
};
export default Login;
