export interface CreatePaymentDTO {
    batch_id: string;
    user_id: string;
    amount: number;
    product_id: string;
    tokenCard: string;
    status?: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  }
  