export interface Faq {
   id: string;
   email: string | null;
   question: string;
   description: string | null;
   isActive: boolean;
   response: string | null;
   createdAt: Date;
   updatedAt: Date;
}

export type FaqEdit = Pick<
   Faq,
   'email' | 'isActive' | 'question' | 'description' | 'response'
>;
