export interface Review {
   id: string;
   email: string;
   name: string;
   rate: number;
   title: string;
   occupation: string;
   message: string;
   avatar: string;
   isActive: boolean;
}

export type ReviewEdit = Pick<
   Review,
   'name' | 'rate' | 'message' | 'occupation' | 'title' | 'isActive' | 'email'
> & {
   avatar?: File | null;
};
