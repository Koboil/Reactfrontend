'use client';
import { useEffect, useState } from 'react';
import withAuth from '@/components/WithAuth';
import { UploadOutlined } from '@ant-design/icons';
import { message, UploadFile } from 'antd';
import { Button, Form, Input, Upload } from 'antd';
import { Service, ServiceEdit } from '@/models';
import {
   useAddServiceMutation,
   useServiceQuery,
   useUpdateServiceMutation,
} from '@/services/serviceApi';
import { getErrorMessage } from '@/utils';
import useNavigate from '@/hooks/useNavigate';
import { Pages } from '@/config';
import { useParams } from 'next/navigation';
import { useAddMediaObjectMutation } from '@/services/mediaObjectApi';

const fileList: UploadFile[] = [];

function Services() {
   const params = useParams();
   const [messageApi, contextHolder] = message.useMessage();
   const [addItem] = useAddServiceMutation();
   const [updateItem] = useUpdateServiceMutation();
   const [editMode, setEditMode] = useState(false);
   const navigate = useNavigate();
   const [form] = Form.useForm();
   form.setFields([
      { name: 'name', value: '' },
      { name: 'description', value: '' },
      { name: 'image', value: '' },
      { name: 'isActive', value: true },
   ]);

   const { TextArea } = Input;

   const { data, error, isLoading } = useServiceQuery(params?.id as string, {
      skip: params?.id ? false : true,
   });
   const [addMedia] = useAddMediaObjectMutation();
   useEffect(() => {
      if (data) {
         form.setFieldsValue({
            name: data.name,
            image: data.image,
            description: data.description,
            isActive: data.isActive,
         });
         setEditMode(true);
      } else {
         setEditMode(false);
      }
   }, [data]);
   const handleUpload = (file: any) => {
      try {
         addMedia(file).unwrap();
      } catch (error) {
         const { detail } = getErrorMessage(error);
         messageApi.error(detail);
      }
   };
   const onFinish = async (formValue: ServiceEdit) => {
      try {
         if (!editMode) {
            await addItem(formValue).unwrap();
            navigate(Pages.ADMIN_SERVICES);
            messageApi.success('Elément enregistré');
         } else {
            await updateItem(formValue).unwrap();
            navigate(Pages.ADMIN_SERVICES);
            setEditMode(false);
            messageApi.success('Elément mis à jour');
         }
      } catch (err: any) {
         const { detail } = getErrorMessage(err);
         messageApi.error(detail);
      }
   };
   return (
      <>
         {contextHolder}
         <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="overflow-hidden bg-white shadow rounded-lg">
               <div className="flex justify-between items-center px-6 py-4 pb-2 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                     Ajouter un service
                  </h2>
               </div>
               <div className="px-6 py-4">
                  <Form
                     layout={'vertical'}
                     form={form}
                     onFinish={onFinish}
                     initialValues={{ layout: 'vertical' }}
                     style={{ maxWidth: 'none' }}
                  >
                     <Form.Item label="Vignette du service">
                        <Upload
                           maxCount={1}
                           action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                           listType="picture"
                           defaultFileList={fileList}
                        >
                           <Button type="primary" icon={<UploadOutlined />}>
                              Image de couverture
                           </Button>
                        </Upload>
                     </Form.Item>
                     <Form.Item name="name" label="nom">
                        <Input
                           showCount
                           placeholder="Saisissez la description du service"
                        />
                     </Form.Item>

                     <Form.Item name="description" label="Description du service">
                        <TextArea
                           showCount
                           maxLength={100}
                           placeholder="Saisissez la description du service"
                           style={{ height: 120, resize: 'vertical' }}
                        />
                     </Form.Item>

                     <div className="flex justify-end mt-4">
                        <Form.Item>
                           <Button type="primary">Créer un service</Button>
                        </Form.Item>
                     </div>
                  </Form>
               </div>
            </div>
         </div>
      </>
   );
}

export default withAuth(Services);
