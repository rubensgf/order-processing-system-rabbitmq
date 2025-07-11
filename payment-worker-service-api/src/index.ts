import { PrismaClient } from '@prisma/client';
import Redis from 'ioredis';
import { RegisterPaymentBatchUseCase } from './application/payment-batch/user-cases/RegisterPaymentBatchUseCase';
import { RabbitMQConsumer } from './infra/messaging/consumers/RabbitMQConsumer';

async function main() {
  const prisma = new PrismaClient();

  const registerPaymentBatch = new RegisterPaymentBatchUseCase(prisma);
  
  const consumer = new RabbitMQConsumer(registerPaymentBatch);

  await consumer.startConsuming();
}

main();
