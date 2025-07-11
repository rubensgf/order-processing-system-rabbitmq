// src/jobs/OrderGeneratorJob.ts
import { OrderGenerator } from "../infra/generator/OrderGenerator";
import { OrderRepository } from "../domain/order/repositories/OrderRepository";
import { OrderQueueProducer } from "../infra/messaging/producers/OrderQueueProducer";
import { CreateOrderUseCase } from "../application/order/use-cases/CreateOrderUseCase";
import logger from "../infra/logger";

export function startOrderGeneration(intervalMs = 10000) {
    const generator = new OrderGenerator();
    const repository = new OrderRepository();
    const producer = new OrderQueueProducer();
    const useCase = new CreateOrderUseCase(repository, producer);

    setInterval(async () => {
        try {
            const order = generator.generate();
            await useCase.execute(order);
            logger.info({ orderId: order.id }, 'Pedido gerado e enviado com sucesso');
        } catch (error) {
            logger.error({ err: error }, 'Erro ao gerar pedido automaticamente');
        }
    }, intervalMs);
}
