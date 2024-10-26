'use server';

import fs from 'node:fs/promises';
import { UPLOAD_PATH } from '@/config/constant';

export async function uploadFile(file: File) {
   const arrayBuffer = await file.arrayBuffer();
   const buffer = new Uint8Array(arrayBuffer);

   await fs.writeFile(`${UPLOAD_PATH}/${file.name}`, buffer);
   return file.name;
}

const getPathToFile = (fileName: string) => {
   return `${UPLOAD_PATH}/${fileName}`;
};

export async function deleteFile(fileName: string) {
   await fs.unlink(getPathToFile(fileName));
}

export const getUrl = async (fileName: string) => {
   return;
};
