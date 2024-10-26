export interface Member {
   id: string;
   isFavorite: boolean;
   firstName: string;
   lastName: string;
   phoneNumber: string;
   email: string;
   isActive: boolean;
   createdAt: string;
   updatedAt: string;
   address: string;
   status: string;
   createdAtAgo: string;
   updatedAtAgo: string;
}

export interface MemberEdit {
   id: string;
   firstName: string;
   lastName: string;
   phoneNumber: string;
   address: string;
   status: string;
   email: string;
   isActive: boolean;
}
