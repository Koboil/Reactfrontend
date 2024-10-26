export interface Review {
   id: string;
   text: string;
   stars: number;
   service: any;
   user: any;
}

export interface ReviewEdit {
   id: string;
   text: string;
   stars: number;
   service: string;
   user: string;
}
