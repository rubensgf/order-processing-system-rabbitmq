import { getChannel } from '../../rabbitmq';
import logger from '../../../infra/logger'; 

export class OrderQueueProducer {
  async sendToQueue(order: any): Promise<void> {
    const channel = await getChannel();
    const sent = channel.sendToQueue(
      'order_queue',
      Buffer.from(JSON.stringify(order)),
      { persistent: true }
    );

    if (sent) {
      logger.info({ orderId: order.id }, 'Pedido enviado para a fila RabbitMQ');
    } else {
      logger.warn({ orderId: order.id }, 'Pedido não foi aceito na fila');
    }
  }
}
