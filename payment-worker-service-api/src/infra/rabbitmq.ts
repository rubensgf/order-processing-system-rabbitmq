import amqp from 'amqplib';
import retry from 'async-retry';
import { RABBITMQ_URL } from '../config/env';
import logger from '../infra/logger';

let channelPromise: Promise<amqp.Channel> | undefined;

export function getChannel(): Promise<amqp.Channel> {
  if (!channelPromise) {
    channelPromise = retry<amqp.Channel>(
      async (bail: (err: Error) => void, attempt: number) => {
        try {
          logger.info({ attempt }, 'Tentando conectar ao RabbitMQ');

          const connection = await amqp.connect(RABBITMQ_URL);
          const channel = await connection.createChannel();
          
          await channel.assertQueue('order_queue', { durable: false });
          logger.info('Conectado ao RabbitMQ e fila "order_queue" criada');

          return channel;
        } catch (error: any) {
          if (error.code === 'ECONNREFUSED') {
            logger.warn({ attempt, err: error }, 'RabbitMQ não está pronto ainda. Vai tentar novamente...');

            throw error;
          } else {
            logger.error({ err: error }, 'Erro irreversível ao conectar no RabbitMQ');
            bail(error);
            throw error;
          }
        }
      },
      {
        retries: 5,
        minTimeout: 3000,
        factor: 2,
      }
    );
  }

  return channelPromise!;
}
