import { CreatePaymentBatchDTO } from '../dtos/CreatePaymentBatchDTO';
import { IPaymentBatchRepository } from '../../../domain/payment-batch/repositories/IPaymentBatchRepository';
import { PaymentBatch } from '../../../domain/payment-batch/entities/PaymentBatch';
import { Status } from '../../../domain/enum/status.enum';
import logger from '../../../infra/logger';
import { v4 as uuidv4 } from 'uuid';

export class RegisterPaymentBatchUseCase {
  constructor(
    private readonly paymentBatchRepository: IPaymentBatchRepository,
  ) {}

  async execute(data: CreatePaymentBatchDTO): Promise<void> {
    const batchId = uuidv4();
    const now = new Date();

    logger.info({ batchId }, 'Iniciando registro do lote de pagamentos');

    const batch = new PaymentBatch({
      batchId,
      rawData: data,
      status: Status.PENDING,
      receivedAt: now,
    });

    await this.paymentBatchRepository.save(batch);

    logger.info({ batchId }, 'Lote de pagamentos registrado com sucesso');
  }
}

