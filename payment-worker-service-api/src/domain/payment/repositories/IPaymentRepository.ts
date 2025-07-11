import { Payment } from '../entities/Payment';
import { Status } from '../../enum/status.enum';

export interface IPaymentRepository {
  save(payment: Payment): Promise<void>;
  updateStatus(paymentId: string, status: Status): Promise<void>;
}
