export interface CreatePaymentBatchDTO {
    raw_data: unknown; 
    status?: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'; 
  }
  