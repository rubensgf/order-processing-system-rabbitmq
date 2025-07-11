// src/domain/payment-batch/repositories/IPaymentBatchRepository.ts

import { PaymentBatch } from '../entities/PaymentBatch';
import { Status } from '../../enum/status.enum';


export interface IPaymentBatchRepository {
  save(batch: PaymentBatch): Promise<void>;
  updateStatus(batchId: string, status: Status): Promise<void>;
}
