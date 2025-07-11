import { getChannel } from '../../rabbitmq';
import { RegisterPaymentBatchUseCase } from '../../../application/payment-batch/user-cases/RegisterPaymentBatchUseCase';
import { ConsumeMessage } from 'amqplib';
import logger from '../../../infra/logger';

export class RabbitMQConsumer {
  constructor(private readonly registerPaymentBatch: RegisterPaymentBatchUseCase) {}

  async startConsuming() {
    const channel = await getChannel();
    const queue = 'order_queue';

    await channel.assertQueue(queue, { durable: false });

    logger.info({ queue }, 'Aguardando mensagens da fila');

    channel.consume(queue, async (msg: ConsumeMessage | null) => {
      if (msg) {
        const content = msg.content.toString();

        try {
          const data = JSON.parse(content);

          logger.info({ data }, 'Mensagem recebida do RabbitMQ');

          await this.registerPaymentBatch.execute(data);

          channel.ack(msg);
        } catch (err) {
          logger.error({ err, content }, 'Erro ao processar mensagem do RabbitMQ');
          channel.nack(msg, false, false);
        }
      }
    });
  }
}
