import React, { useCallback, useState } from 'react';
import { Button, Form, Input, Modal, Space } from 'antd';
import { formatDate } from '@/utils';
import { ReservationEdit } from '@/models';
import TextArea from 'antd/es/input/TextArea';

type ReservationFormProps = {
   reservation?: ReservationEdit;
   form: any;
   onFinish: (values: string[]) => void;
   onFinishFailed?: ((errorInfo: any) => void) | undefined;
   openControlModal: boolean;
   setOpenControlModal: (value: boolean) => void;
   date?: Date;
};

export default function ReservationForm({
   reservation,
   openControlModal,
   setOpenControlModal,
   form,
   onFinish,
   onFinishFailed,
   date,
}: ReservationFormProps) {
   const [loading, setLoading] = useState(false);
   const [open, setOpen] = useState(false);
   const clearAllData = useCallback(async () => {
      form.resetFields();
      setOpenControlModal(false);
   }, [form, setOpenControlModal]);
   const startAt = Form.useWatch('startAt', form);
   const endAt = Form.useWatch('endAt', form);

   return (
      <>
         {/*
         <Button
            type="primary"
            className={cn('w-full py-2 border border-blue-500 rounded-lg text-blue-500')}
            onClick={() => setModal2Open(true)}
         >
            {slot ? slot : ''}
         </Button>
          */}
         <Modal
            title={`Réservez un créneau pour le ${formatDate(startAt)}`}
            centered
            open={openControlModal}
            width={700}
            footer={null}
            onCancel={clearAllData}
            // eslint-disable-next-line
            // footer={[
            //    <Button key="back" onClick={clearAllData}>
            //       Annuler
            //    </Button>,
            //    <Button key="submit" type="primary" loading={loading}>
            //       Réserver
            //    </Button>,
            // ]}
         >
            <Form
               layout={'vertical'}
               form={form}
               onFinish={onFinish}
               initialValues={{ layout: 'vertical' }}
               style={{ maxWidth: 'none' }}
            >
               <Form.Item label="Votre adresse email" name="email">
                  <Input
                     type="email"
                     placeholder="Entrez votre adresse email"
                     required={true}
                  />
               </Form.Item>
               <Form.Item label="Votre  prénom" name="firstName">
                  <Input placeholder="Entrez votre prénom" />
               </Form.Item>
               <Form.Item label="Votre nom" name="lastName">
                  <Input placeholder="Entrez votre nom" />
               </Form.Item>
               {/*}
               {startAt &&   `Commence à ${formatDate(startAt)}`}
               <br/>
               {startAt &&   `Finir à ${formatDate(endAt)}`}
               */}
               <Form.Item label="Client" name="customer" hidden={true}>
                  <Input />
               </Form.Item>
               <Form.Item label="Prestataire" name="provider" hidden={true}>
                  <Input />
               </Form.Item>

               <Form.Item label="Commence à" name="startAt" hidden={true}>
                  <Input placeholder="Entrez votre prénom" />
               </Form.Item>
               <Form.Item label="Finit à" name="endAt" hidden={true}>
                  <Input placeholder="Entrez votre nom" />
               </Form.Item>
               <Form.Item name="note" label="Note">
                  <TextArea
                     showCount
                     maxLength={100}
                     placeholder="Veuillez entrer un message au fournisseur"
                     style={{ height: 120, resize: 'vertical' }}
                  />
               </Form.Item>
               <Space>
                  <Button htmlType="reset" onClick={clearAllData}>
                     Annuler
                  </Button>
                  <Button htmlType="submit" type="primary" loading={loading}>
                     Réserver
                  </Button>
               </Space>
            </Form>
         </Modal>
      </>
   );
}
