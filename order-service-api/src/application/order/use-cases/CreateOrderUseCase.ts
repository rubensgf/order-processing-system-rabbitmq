import { CreateOrderDTO } from '../dto/CreateOrderDTO';
import { IOrderRepository } from '../../../domain/order/repositories/IOrderRepository';
import { OrderQueueProducer } from '../../../infra/messaging/producers/OrderQueueProducer';
import { Order } from '../../../domain/order/entities/Order';
import { OrderStatus } from '@prisma/client';
import { OrderQueueDTO } from '../../../infra/messaging/dtos/OrderQueueDTO';
import logger from '../../../infra/logger'; 

export class CreateOrderUseCase {
    constructor(
        private readonly orderRepository: IOrderRepository,
        private readonly orderQueueProducer: OrderQueueProducer
    ) { }

    async execute(data: CreateOrderDTO): Promise<void> {
        
        logger.info({ orderId: data.id, userId: data.userId }, 'Iniciando criação de pedido');

        const order = new Order({
            id: data.id,
            userId: data.userId,
            productId: data.productId,
            amount: data.amount,
            tokenCard: data.tokenCard,
            status: OrderStatus.PENDING,
            createdAt: new Date()
        });

        await this.orderRepository.save(order);

        const payload = OrderQueueDTO.toQueuePayload(order);

        try {
            await this.orderQueueProducer.sendToQueue(payload);
      
            logger.info({ orderId: order.id }, 'Pedido enviado para a fila com sucesso');

            order.setStatus(OrderStatus.SEND); 

            await this.orderRepository.update(order);
          } catch (error) {
            order.setStatus(OrderStatus.FAILED);
            logger.error({ err: error, orderId: order.id }, 'Erro ao enviar pedido para RabbitMQ');
  
          }
    }
}
