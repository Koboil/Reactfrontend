'use client';
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import {
   useChangePasswordUserMutation,
   useDeleteUserMutation,
   useUpdateUserMutation,
   useUserQuery,
} from '@/services/userApi';
import {
   logout,
   selectCurrentUser,
   updateUser as updateUserAction,
} from '@/features/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import withAuth from '@/components/WithAuth';
function Profile() {
   const dispatch = useAppDispatch();
   const currentUser = useAppSelector(selectCurrentUser);
   const [messageApi, contextHolder] = message.useMessage();
   const [passwordVisible, setPasswordVisible] = useState(false);
   const { data: user } = useUserQuery(currentUser?.id as string, {
      skip: currentUser?.id ? false : true,
   });
   const [updateUser] = useUpdateUserMutation();
   const [deleteUser] = useDeleteUserMutation();
   const [changePassword] = useChangePasswordUserMutation();
   const [deleteForm] = Form.useForm();
   const [userForm] = Form.useForm();
   const [changePasswordForm] = Form.useForm();

   userForm.setFields([
      { name: 'firstName', value: '' },
      { name: 'lastName', value: '' },
      { name: 'email', value: '' },
   ]);

   deleteForm.setFields([{ name: 'password', value: '' }]);

   changePasswordForm.setFields([
      { name: 'oldPassword', value: '' },
      { name: 'password', value: '' },
      { name: 'confirmPassword', value: '' },
   ]);

   useEffect(() => {
      if (user) {
         userForm.setFieldsValue({
            firstName: user.firstName,
            lastName: user.firstName,
            email: user.email,
         });
      }
   }, [user]);

   const onUserFormFinish = async ({ firstName, lastName, email }: any) => {
      try {
         const response = await updateUser({ firstName, lastName, email }).unwrap();
         if (response?.message) {
            messageApi.success('Envoi effectué');
         }
         dispatch(updateUserAction({ user }));
      } catch (error) {
         messageApi.error({
            key: 'review',
            content: 'Impossible de mettre à jour vos informations',
         });
      }
   };
   const onChangePasswordFormFinish = async ({
      oldPassword,
      password,
      confirmPassword,
   }: any) => {
      try {
         const response = await changePassword({
            id: currentUser?.id as string,
            oldPassword,
            password,
            confirmPassword,
         }).unwrap();

         messageApi.success('Mot de passe changé');

         changePasswordForm.resetFields();
      } catch (error) {
         messageApi.error({
            key: 'review',
            content: 'Impossible de changer votre mot de passe',
         });
      }
   };
   const onDeleteFormFinish = async ({ password }: any) => {
      try {
         const response = await deleteUser({ password }).unwrap();

         messageApi.success('Envoi effectué');

         dispatch(logout());
      } catch (error) {
         messageApi.error({
            key: 'review',
            content: 'Impossible de supprimer le compte',
         });
      }
   };

   return (
      <>
         {contextHolder}
         <div className="h-full">
            <div className="mx-auto max-w-5xl pb-5 lg:py-12 lg:px-8">
               <div className="lg:grid lg:grid-cols-12">
                  <div className="space-y-6 sm:px-6 lg:col-span-9 lg:col-start-3 lg:px-0">
                     <section className="mx-auto">
                        <Form
                           layout={'vertical'}
                           form={userForm}
                           onFinish={onUserFormFinish}
                           initialValues={{ layout: 'vertical' }}
                           style={{ maxWidth: 'none' }}
                        >
                           <div className="shadow sm:overflow-hidden sm:rounded-md mx-auto">
                              <div className="bg-white py-6 px-4 sm:p-6 mx-auto">
                                 <div className="border-b border-gray-200 pb-5">
                                    <h2
                                       id="personal-details-heading"
                                       className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                       Informations personnelles
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-500">
                                       Mettre à jour vos informations personnelles.
                                    </p>
                                 </div>
                                 <div className="mt-6 grid grid-cols-4 gap-x-6 gap-y-0">
                                    <div className="col-span-4 sm:col-span-2">
                                       <Form.Item
                                          name="lastName"
                                          label="Nom"
                                          rules={[
                                             {
                                                required: true,
                                                message: 'Entrer un nom',
                                             },
                                             {
                                                max: 250,
                                                message:
                                                   'Votre nom ne doit pas dépasser 250 caractères',
                                             },
                                          ]}
                                       >
                                          <Input size="large" placeholder="Nom" />
                                       </Form.Item>
                                    </div>
                                    <div className="col-span-4 sm:col-span-2">
                                       <Form.Item
                                          name="Prénom"
                                          label="Prénom"
                                          rules={[
                                             {
                                                required: true,
                                                message: 'Entrer un prénom',
                                             },
                                             {
                                                max: 250,
                                                message:
                                                   'Votre prénom ne doit pas dépasser 250 caractères',
                                             },
                                          ]}
                                       >
                                          <Input size="large" placeholder="Prénom" />
                                       </Form.Item>
                                    </div>
                                    <div className="col-span-4">
                                       <Form.Item
                                          name="email"
                                          label="Email"
                                          rules={[
                                             {
                                                required: true,
                                                message: 'Entrer une adresse e-mail',
                                             },
                                             {
                                                type: 'email',
                                                required: true,
                                                message: 'Entrer une adresse e-mail',
                                             },
                                             {
                                                max: 250,
                                                message:
                                                   'Votre nom ne doit pas dépasser 250 caractères',
                                             },
                                          ]}
                                       >
                                          <Input
                                             size="large"
                                             disabled
                                             placeholder="Adresse email"
                                          />
                                       </Form.Item>
                                    </div>
                                 </div>
                              </div>
                              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                 <div className="flex justify-end">
                                    <Form.Item style={{ marginBottom: 0 }}>
                                       <Button type="primary">Mettre à jour</Button>
                                    </Form.Item>
                                 </div>
                              </div>
                           </div>
                        </Form>
                     </section>
                  </div>
               </div>
            </div>

            <div className="mx-auto max-w-5xl pb-5 lg:py-12 lg:px-8">
               <div className="lg:grid lg:grid-cols-12">
                  <div className="space-y-6 sm:px-6 lg:col-span-9 lg:col-start-3 lg:px-0">
                     <section className="mx-auto">
                        <Form
                           layout={'vertical'}
                           form={changePasswordForm}
                           initialValues={{ layout: 'vertical' }}
                           style={{ maxWidth: 'none' }}
                        >
                           <div className="shadow sm:overflow-hidden sm:rounded-md mx-auto">
                              <div className="bg-white py-6 px-4 sm:p-6 mx-auto">
                                 <div className="border-b border-gray-200 pb-5">
                                    <h2
                                       id="personal-details-heading"
                                       className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                       Sécurité
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-500">
                                       Mettre à jour votre mot de passe.
                                    </p>
                                 </div>
                                 <div className="mt-6 grid grid-cols-4 gap-x-6 gap-y-0">
                                    <div className="col-span-4">
                                       <Form.Item
                                          name="oldPassword"
                                          label="Mot de passe actuel"
                                       >
                                          <Input.Password
                                             placeholder="Mot de passe actuel"
                                             iconRender={(visible) =>
                                                visible ? (
                                                   <EyeTwoTone />
                                                ) : (
                                                   <EyeInvisibleOutlined />
                                                )
                                             }
                                          />
                                       </Form.Item>
                                    </div>
                                    <div className="col-span-4 sm:col-span-2">
                                       <Form.Item
                                          name="password"
                                          label="Nouveau mot de passe"
                                       >
                                          <Input.Password
                                             placeholder="Nouveau mot de passe"
                                             iconRender={(visible) =>
                                                visible ? (
                                                   <EyeTwoTone />
                                                ) : (
                                                   <EyeInvisibleOutlined />
                                                )
                                             }
                                          />
                                       </Form.Item>
                                    </div>
                                    <div className="col-span-4 sm:col-span-2">
                                       <Form.Item
                                          name="confirmPassword"
                                          label="Confirmer le mot de passe"
                                       >
                                          <Input.Password
                                             placeholder="Confirmer le mot de passe"
                                             iconRender={(visible) =>
                                                visible ? (
                                                   <EyeTwoTone />
                                                ) : (
                                                   <EyeInvisibleOutlined />
                                                )
                                             }
                                          />
                                       </Form.Item>
                                    </div>
                                 </div>
                              </div>
                              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                 <div className="flex justify-end">
                                    <Form.Item style={{ marginBottom: 0 }}>
                                       <Button type="primary">Mettre à jour</Button>
                                    </Form.Item>
                                 </div>
                              </div>
                           </div>
                        </Form>
                     </section>
                  </div>
               </div>
            </div>

            <div className="mx-auto max-w-5xl pb-5 lg:py-12 lg:px-8">
               <div className="lg:grid lg:grid-cols-12">
                  <div className="space-y-6 sm:px-6 lg:col-span-9 lg:col-start-3 lg:px-0">
                     <section className="mx-auto">
                        <Form
                           layout={'vertical'}
                           form={deleteForm}
                           initialValues={{ layout: 'vertical' }}
                           style={{ maxWidth: 'none' }}
                        >
                           <div className="shadow sm:overflow-hidden sm:rounded-md mx-auto">
                              <div className="bg-white py-6 px-4 sm:p-6 mx-auto">
                                 <div className="border-b border-gray-200 pb-5">
                                    <h2
                                       id="personal-details-heading"
                                       className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                       Suppression du compte
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-500">
                                       Demande de suppression de votre compte.
                                    </p>
                                 </div>
                                 <div className="mt-6 grid grid-cols-4 gap-x-6 gap-y-0">
                                    <div className="col-span-4">
                                       <Form.Item name="password" label="Mot de passe">
                                          <Input.Password
                                             placeholder="Entrer votre mot de passe"
                                             iconRender={(visible) =>
                                                visible ? (
                                                   <EyeTwoTone />
                                                ) : (
                                                   <EyeInvisibleOutlined />
                                                )
                                             }
                                          />
                                       </Form.Item>
                                    </div>
                                 </div>
                              </div>
                              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                 <div className="flex justify-end">
                                    <Form.Item style={{ marginBottom: 0 }}>
                                       <Button type="primary" danger>
                                          Supprimer mon compte
                                       </Button>
                                    </Form.Item>
                                 </div>
                              </div>
                           </div>
                        </Form>
                     </section>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

export default withAuth(Profile);
