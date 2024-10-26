import { MediaObject } from '@/models/MediaObject.model';
import { User } from '@/models/User.model';
import { Company } from '@/models/Company.model';
import { CompanyRoles } from '@/config';

export interface CompanyUser {
   id: string;
   user: User;
   company: Company;
   role: CompanyRoles;
   createdAt: string;
   updatedAt: string;
   createdAtAgo: string;
   updatedAtAgo: string;
}

export interface CompanyUserEdit {
   id: string;
   user: string;
   company: string;
}
