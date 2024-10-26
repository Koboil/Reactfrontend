'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserRegistration } from '@/models';
import { useAddUserMutation } from '@/services/userApi';
import useNavigate from '@/hooks/useNavigate';
import { Pages } from '@/config';
import { getErrorMessage } from '@/utils';
import { message } from 'antd';

type RegisterFormData = UserRegistration & { confirmPassword: string };

const schema = z
   .object({
      firstName: z
         .string()
         .min(1, { message: 'Veuillez entrer votre prénom' })
         .max(255, { message: 'Le prénom doit contenir au moins 4 caractères' }),
      lastName: z
         .string()
         .min(1, { message: 'Veuillez entrer votre nom' })
         .max(255, { message: 'Le nom doit contenir au moins 4 caractères' }),
      email: z
         .string()
         .email({ message: 'Veuillez entrer une adresse e-mail' })
         .min(1)
         .max(255),
      password: z
         .string()
         .min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' })
         .refine((password) => /[A-Z]/.test(password), {
            message: 'Le mot de passe doit contenir une majuscule',
         })
         .refine((password) => /[a-z]/.test(password), {
            message: 'Le mot de passe doit contenir une lettre minuscule',
         })
         .refine((password) => /[0-9]/.test(password), {
            message: 'Le mot de passe doit contenir au moins un chiffre',
         })
         .refine((password) => /[!@#$%^&*_]/.test(password), {
            message: 'Le mot de passe doit contenir un caractère spécial parmi !@#$%^&*_',
         }),
      confirmPassword: z
         .string()
         .min(1, { message: 'Veuillez confirmer votre mot de passe' })
         .max(30),
   })
   .superRefine(
      (
         { confirmPassword, password }: { confirmPassword: any; password: any },
         ctx: any,
      ) => {
         if (confirmPassword !== password) {
            ctx.addIssue({
               code: 'custom',
               message: 'Les mots de passe de correspondent pas',
               path: ['confirmPassword'],
            });
         }
      },
   );
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const Register = () => {
   const [addUser] = useAddUserMutation();
   const navigate = useNavigate();
   const [messageApi, contextHolder] = message.useMessage();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<RegisterFormData>({
      mode: 'onChange',
      resolver: zodResolver(schema),
   });

   const onSubmit = async (data: RegisterFormData) => {
      try {
         await addUser({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
         }).unwrap();
         navigate(Pages.LOGIN);
         messageApi.success('Votre compte est créé.');
      } catch (err) {
         const { detail } = getErrorMessage(err);
         if (detail) {
            messageApi.error(detail);
         }
      }
   };
   return (
      <>
         {contextHolder}
         <div className="page-wrapper relative z-[1] bg-ColorOffWhite">
            <main className="main-wrapper relative overflow-hidden">
               <section className="section-signin">
                  <div className="py-40">
                     <div className="container-default">
                        <div className="mx-auto max-w-[536px]">
                           <div className="flex flex-col items-center justify-center text-center">
                              <div>
                                 <h2 className="mb-[10px] text-2xl font-bold">
                                    Devenir un prestataire
                                 </h2>
                                 <p className="text-ColorBlack/80">
                                    Entrez vos identifiants ci-dessous pour créer un
                                    compte
                                 </p>
                              </div>
                           </div>

                           <div className="jos xm:p-10 mt-10 rounded-[10px] border-2 border-ColorBlack bg-white p-[30px] lg:mt-[40px]">
                              <form
                                 noValidate={true}
                                 action="#"
                                 method="post"
                                 onSubmit={handleSubmit(onSubmit)}
                              >
                                 <div className="flex flex-col gap-6">
                                    <div className="flex flex-row gap-6">
                                       <div>
                                          <label
                                             htmlFor="lastName"
                                             className="mb-[10px] block text-left font-semibold text-ColorBlack"
                                          >
                                             Nom *
                                          </label>
                                          <input
                                             type="text"
                                             {...register('lastName')}
                                             id="lastName"
                                             placeholder="Entrez votre nom"
                                             className="w-full rounded-[10px] border border-ColorBlack/50 px-[30px] py-[15px] outline-none transition-all duration-300 placeholder:text-ColorBlack/50 focus:border-ColorBlue"
                                             required
                                          />
                                          {errors?.lastName && (
                                             <div className="mt-1 mr-5 text-red-500">
                                                <span>
                                                   {errors?.lastName?.message as string}
                                                </span>
                                             </div>
                                          )}
                                       </div>

                                       <div>
                                          <label
                                             htmlFor="firstName"
                                             className="mb-[10px] block text-left font-semibold text-ColorBlack"
                                          >
                                             Prénom *
                                          </label>
                                          <input
                                             type="text"
                                             {...register('firstName')}
                                             id="firstName"
                                             placeholder="Entrez votre prénom"
                                             className="w-full rounded-[10px] border border-ColorBlack/50 px-[30px] py-[15px] outline-none transition-all duration-300 placeholder:text-ColorBlack/50 focus:border-ColorBlue"
                                             required
                                          />
                                          {errors?.firstName && (
                                             <div className="mt-1 mr-5 text-red-500">
                                                <span>
                                                   {errors?.firstName?.message as string}
                                                </span>
                                             </div>
                                          )}
                                       </div>
                                    </div>

                                    <div>
                                       <label
                                          htmlFor="email"
                                          className="mb-[10px] block text-left font-semibold text-ColorBlack"
                                       >
                                          Adresse email *
                                       </label>
                                       <input
                                          type="email"
                                          {...register('email')}
                                          id="email"
                                          placeholder="Entrez votre adresse email"
                                          className="w-full rounded-[10px] border border-ColorBlack/50 px-[30px] py-[15px] outline-none transition-all duration-300 placeholder:text-ColorBlack/50 focus:border-ColorBlue"
                                          required
                                       />
                                       {errors?.email && (
                                          <div className="mt-1 mr-5 text-red-500">
                                             <span>
                                                {errors?.email?.message as string}
                                             </span>
                                          </div>
                                       )}
                                    </div>

                                    <div>
                                       <label
                                          htmlFor="password"
                                          className="mb-[10px] block text-left font-semibold text-ColorBlack"
                                       >
                                          Mot de passe *
                                       </label>
                                       <input
                                          type="password"
                                          {...register('password')}
                                          id="password"
                                          placeholder="**********"
                                          className="w-full rounded-[10px] border border-ColorBlack/50 px-[30px] py-[15px] outline-none transition-all duration-300 placeholder:text-ColorBlack/50 focus:border-ColorBlue"
                                          required
                                       />
                                       {errors?.password && (
                                          <div className="mt-1 mr-5 text-red-500">
                                             <span>
                                                {errors?.password?.message as string}
                                             </span>
                                          </div>
                                       )}
                                    </div>
                                    <div>
                                       <label
                                          htmlFor="confirmPassword"
                                          className="mb-[10px] block text-left font-semibold text-ColorBlack"
                                       >
                                          Confirmation du mot de passe *
                                       </label>
                                       <input
                                          type="password"
                                          {...register('confirmPassword')}
                                          id="confirmPassword"
                                          placeholder="**********"
                                          className="w-full rounded-[10px] border border-ColorBlack/50 px-[30px] py-[15px] outline-none transition-all duration-300 placeholder:text-ColorBlack/50 focus:border-ColorBlue"
                                          required
                                       />
                                       {errors?.confirmPassword && (
                                          <div className="mt-1 mr-5 text-red-500">
                                             <span>
                                                {
                                                   errors?.confirmPassword
                                                      ?.message as string
                                                }
                                             </span>
                                          </div>
                                       )}
                                    </div>
                                 </div>

                                 <div className="mt-10 flex justify-center w-full">
                                    <button
                                       type="submit"
                                       className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                                    >
                                       S'Inscrire
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
      </>
   );
};
export default Register;
