import { PaymentStatus } from '@/config/constant';

export interface Payment {
   id: string;
   gatewayToken: string;
   status: PaymentStatus;
   customerId: string;
}
