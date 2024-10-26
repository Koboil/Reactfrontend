export interface MediaObject {
   id: string;
   contentUrl: string;
   fileName: string;
   originalName: string;
   size: number;
   createdAt: string;
   createdAtAgo: string;
   dimensions: Array<any>;
}

export interface MediaObjectEdit {
   id: string;
   file: string;
}
