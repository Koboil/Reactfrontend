import { message, Modal, Upload } from 'antd';
import { useState } from 'react';
import { titles } from '@/utils';

export type UploadConfigType = {
   maxFileCount: number;
   accept: string;
   maxFileSize: number;
   onFileDeleted?: (file: File) => void;
   fileList?: any;
};
const useUploadConfig = ({
   maxFileCount,
   accept,
   maxFileSize = 10,
   onFileDeleted,
   fileList,
}: UploadConfigType) => {
   const [deletedFile, setDeletedFile] = useState(null);

   const checkFile = (file: File) => {
      if (!accept.includes(file.type)) {
         messageApi.error('Type de fichier non supporté');
         return Upload.LIST_IGNORE;
      } else if (file.size / 1024 / 1024 > maxFileSize) {
         messageApi.error('La taille du fichier doit être inférieure à ${maxFileSize}Mo');
         return Upload.LIST_IGNORE;
      } else {
         return false;
      }
   };

   const confirmDeletion = async (file) => {
      //const deleted = await handleDeleteRemoteFile(t, file.id, null, null, true);
      const deleted = true;
      if (deleted) {
         setDeletedFile(file);
         fileList?.splice(
            fileList.findIndex((obj) => obj?.id === file?.id),
            1,
         );
      }
      if (deleted && onFileDeleted) onFileDeleted(file);
      setDeletedFile(null);
      return deleted;
   };

   return {
      beforeUpload: (file) => checkFile(file),
      onDrop: (e) => {
         const files = e.dataTransfer.files;

         for (let index = 0; index < files.length; index++) {
            const file = files[index];
            checkFile(file);
         }
      },
      onPreview: function (file) {
         // store.dispatch(FileModalActions.updateFile({ file: file, show: true }));
      },
      onRemove: (file) => {
         if (typeof file.uid !== 'number') return true;
         Modal.confirm({
            title: 'Confirmez la suppression',
            content: titles.messages.deleteElement,
            onOk: () => confirmDeletion(file),
            okButtonProps: { danger: true },
            cancelText: 'Annuler',
            closable: true,
         });
         return !!deletedFile;
      },
      fileList: fileList,
      accept: accept,
      maxCount: maxFileCount,
   };
};

export default useUploadConfig;
