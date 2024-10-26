import { Company } from '@/models/Company.model';
import { MediaObject } from '@/models/MediaObject.model';

export interface Service {
   id: string;
   name: string;
   description: string;
   company: Company;
   image: MediaObject;
   isActive: boolean;
   createdAt: string;
   updatedAt: string;
   createdAtAgo: string;
   updatedAtAgo: string;
}

export interface ServiceEdit {
   id: string;
   name: string;
   description: string;
   company: string;
   image: string;
   isActive: boolean;
}
