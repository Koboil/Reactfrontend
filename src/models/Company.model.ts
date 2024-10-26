import { MediaObject } from '@/models/MediaObject.model';

export interface Company {
   id: string;
   logo: MediaObject;
   name: string;
   image: string;
   phoneNumber: string;
   postalCode: string;
   email: string;
   isActive: boolean;
   line1: string;
   line2: string;
   city: string;
   country: string;
   state: string;
   createdAt: string;
   updatedAt: string;
   createdAtAgo: string;
   updatedAtAgo: string;
}

export interface CompanyEdit {
   id: string;
   logo: string;
   image: string;
   name: string;
   postalCode: string;
   line1: string;
   line2: string;
   city: string;
   country: string;
   state: string;
   address: string;
   isActive: boolean;
}
