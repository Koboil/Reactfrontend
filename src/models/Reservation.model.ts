import { User } from '@/models/User.model';
import { Service } from '@/models/Service.model';

export interface Reservation {
   id: string;
   note: string;
   status: ReservationStatus;
   startAt: string;
   endAt: string;
   customer: Pick<User, 'firstName' | 'lastName' | 'fullName' | 'email'>;
   provider: Pick<User, 'firstName' | 'lastName' | 'fullName' | 'email'>;
   service: Service;
   createdAt: string;
   createdAtAgo: string;
}

export interface ReservationEdit {
   id: string;
   note: string;
   status: string;
   startAt: string;
   endAt: string;
   customer: string;
   service: string;
}

export interface ReservationStatus {
   id: number;
   name: string;
   color: string;
}
