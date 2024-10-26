export interface AddressType {
   id: string;
   dateInsert: string;
   dateUpdate: string;
   description: string;
   slug: string;
}

export interface Address {
   id: string;
   address: string;
   addressType: AddressType;
   country: string;
   city: string;
   user: string;
   zip: string;
   province: string;
}

export interface AddressEdit {
   id: string;
   address: string;
   addressType: string;
   country?: string;
   city?: string;
   user: string;
   zip: string;
   province: string;
}
