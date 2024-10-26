'use client';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, Form, Input, message, Space } from 'antd';
import withAuth from '@/components/WithAuth';
import { useAppSelector } from '@/store/hooks';
import { selectCurrentUser } from '@/features/authSlice';
import { useCompanyUsersQuery } from '@/services/companyUserApi';
import { CompanyRoles, Pages } from '@/config';
import { CompanyEdit, ServiceEdit } from '@/models';
import { getErrorMessage } from '@/utils';
import { useAddCompanyMutation, useUpdateCompanyMutation } from '@/services/companyApi';

function Companies() {
   const currentUser = useAppSelector(selectCurrentUser);
   const [messageApi, contextHolder] = message.useMessage();
   const [form] = Form.useForm();
   const [editMode, setEditMode] = useState(false);
   const [isReadOnly, setIsReadOnly] = useState(false);
   const [addItem] = useAddCompanyMutation();
   const [updateItem] = useUpdateCompanyMutation();
   const { data: results } = useCompanyUsersQuery(
      { user: currentUser, role: CompanyRoles.ROLE_ADMIN },
      {
         skip: currentUser?.id ? false : true,
      },
   );
   form.setFields([
      { name: 'name', value: '' },
      { name: 'postalCode', value: '' },
      { name: 'country', value: '' },
      { name: 'state', value: '' },
      { name: 'line1', value: '' },
      { name: 'line2', value: '' },
      { name: 'phoneNumber', value: '' },
      { name: 'isActive', value: true },
      { name: 'phoneNumber', value: true },
      { name: 'logo', value: true },
   ]);

   useEffect(() => {
      if (results && results.length > 0) {
         const company = results[0]?.company;
         form.setFieldsValue({
            name: company?.name,
            postalCode: company?.postalCode,
            country: company?.country,
            state: company?.state,
            line1: company?.line1,
            line2: company?.line2,
            phoneNumber: company?.phoneNumber,
            logo: company?.logo,
         });
         setEditMode(true);
      } else {
         setIsReadOnly(true);
      }
   }, [form, results]);

   const onFinish = async (formValue: CompanyEdit) => {
      try {
         if (!editMode) {
            await addItem(formValue).unwrap();
            messageApi.success('Informations enregistrées');
            setEditMode(true);
         } else {
            await updateItem(formValue).unwrap();
            setEditMode(true);
            messageApi.success('Informations enregistrées');
         }
      } catch (err: any) {
         const { detail } = getErrorMessage(err);
         messageApi.error(detail);
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
                           form={form}
                           onFinish={onFinish}
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
                                       Informations de votre entreprise
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-500">
                                       Mettre à jour les informations de votre entreprise.
                                    </p>
                                 </div>
                                 <div className="mt-6 grid grid-cols-4 gap-x-6 gap-y-0">
                                    <div className="col-span-4 sm:col-span-2">
                                       <Form.Item label="Nom">
                                          <Input size="large" placeholder="Nom" />
                                       </Form.Item>
                                    </div>
                                    <div className="col-span-4 sm:col-span-2">
                                       <Form.Item label="Téléphone">
                                          <Input size="large" />
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

            <div className="mx-auto max-w-5xl pb-5 lg:py-12 lg:px-8" hidden={isReadOnly}>
               <div className="lg:grid lg:grid-cols-12">
                  <div className="space-y-6 sm:px-6 lg:col-span-9 lg:col-start-3 lg:px-0">
                     <section className="mx-auto">
                        <Form
                           layout={'vertical'}
                           form={form}
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
                                       Adresse
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-500">
                                       Entrez l'adresse de votre entreprise
                                    </p>
                                 </div>
                                 <div className="mt-6 grid grid-cols-4 gap-x-6 gap-y-0">
                                    <div className="col-span-4 sm:col-span-2">
                                       <Form.Item name="city" label="Ville">
                                          <Input size="large" />
                                       </Form.Item>
                                    </div>
                                    <div className="col-span-4 sm:col-span-2">
                                       <Form.Item name="state" label="Etat">
                                          <Input size="large" />
                                       </Form.Item>
                                    </div>
                                    <div className="col-span-4 sm:col-span-2">
                                       <Form.Item name="postalCode" label="Code Postal">
                                          <Input size="large" />
                                       </Form.Item>
                                    </div>
                                    <div className="col-span-4 sm:col-span-2">
                                       <Form.Item name="postalCode" label="Pays">
                                          <Input size="large" />
                                       </Form.Item>
                                    </div>
                                    <div className="col-span-4">
                                       <Form.Item name="line1" label="Adresse ligne 1">
                                          <Input size="large" />
                                       </Form.Item>
                                    </div>
                                    <div className="col-span-4">
                                       <Form.Item name="line2" label="Adresse ligne 2">
                                          <Input size="large" readOnly />
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
         </div>
      </>
   );
}

export default withAuth(Companies);
