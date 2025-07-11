import { OrderGenerator, OrderStatus } from "../../infra/generator/OrderGenerator";
import { OrderQueueProducer } from '../../infra/messaging/producers/OrderQueueProducer';

const mockSendToQueue = jest.fn();

jest.mock('../../infra/messaging/producers/OrderQueueProducer', () => {
    return {
        OrderQueueProducer: jest.fn().mockImplementation(() => ({
            sendToQueue: mockSendToQueue 
        }))
    };
});

describe('OrderGenerator', () => {
    it('deve gerar um pedido válido', () => {
        const generatorOrder = new OrderGenerator();
        const order = generatorOrder.generate();

        expect(order).toHaveProperty('id');
        expect(order).toHaveProperty('userId');
        expect(order).toHaveProperty('productId');
        expect(order).toHaveProperty('amount');
        expect(order).toHaveProperty('tokenCard');
        expect(order).toHaveProperty('status');
        expect(order).toHaveProperty('createdAt');

        expect(typeof order.id).toBe('string');
        expect(typeof order.userId).toBe('string');
        expect(typeof order.productId).toBe('string');
        expect(typeof order.amount).toBe('number');
        expect(typeof order.tokenCard).toBe('string');
        expect(order.status).toBe(OrderStatus.Pending);
        expect(order.createdAt instanceof Date).toBe(true);
    });

    it('deve gerar e enviar um pedido', async () => {
        const generator = new OrderGenerator();
        const producer = new OrderQueueProducer();

        const order = generator.generate();
        await producer.sendToQueue(order); 

        expect(mockSendToQueue).toHaveBeenCalledWith(order);
    });
});
