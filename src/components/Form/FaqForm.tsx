import FormItem from 'antd/es/form/FormItem';
import { Form, Input, Modal } from 'antd';
import { useCallback } from 'react';
import TextArea from 'antd/es/input/TextArea';
import SubmitButton from '@/components/Misc/SubmitButton';

type ReviewFormProps = {
   form: any;
   onFinish: (values: string[]) => void;
   onFinishFailed?: ((errorInfo: any) => void) | undefined;
   openControlModal: boolean;
   setOpenControlModal: (value: boolean) => void;
};

const ReviewForm = ({
   form,
   onFinish,
   onFinishFailed,
   openControlModal,
   setOpenControlModal,
}: ReviewFormProps) => {
   const clearAllData = useCallback(async () => {
      form.resetFields();
      setOpenControlModal(false);
   }, [form, setOpenControlModal]);
   return (
      <Modal
         forceRender
         title="Poser une question"
         open={openControlModal}
         width={700}
         footer={null}
         onCancel={clearAllData}
      >
         <Form layout="vertical" form={form} onFinish={onFinish}>
            <FormItem
               name="question"
               label="Question"
               rules={[
                  {
                     type: 'string',
                     required: true,
                     message: 'Entrez une question',
                  },
                  {
                     max: 250,
                     message: t('La question doit comporter au maximum 250 caractères'),
                  },
               ]}
               className="block text-sm font-medium text-gray-700"
            >
               <Input
                  size="large"
                  type="string"
                  autoComplete="name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
               />
            </FormItem>
            <FormItem
               name="email"
               label="Email"
               rules={[
                  {
                     type: 'email',
                     required: true,
                     message: 'Entrez votre adresse email',
                  },
                  {
                     max: 250,
                     message: t(
                        "L'adresse email doit comporter au maximum 250 caractères",
                     ),
                  },
               ]}
               className="block text-sm font-medium text-gray-700"
            >
               <Input
                  size="large"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
               />
            </FormItem>
            <FormItem
               name="description"
               label="Description"
               rules={[
                  {
                     type: 'string',
                     required: false,
                  },
                  {
                     min: 5,
                     message: "La description doit être d'au moins 5 caractères",
                  },
                  {
                     max: 5000,
                     message: "La description doit être d'au maximum de 5000 caractères",
                  },
               ]}
               className="block text-sm font-medium text-gray-700"
            >
               <TextArea
                  size="large"
                  rows={4}
                  autoComplete="description"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
               />
            </FormItem>
            <SubmitButton className="mt-8">{t('Envoyer')}</SubmitButton>
         </Form>
      </Modal>
   );
};
export default ReviewForm;
