// tests/usecases/CreateOrderUseCase.test.ts
import { OrderGenerator } from '../../infra/generator/OrderGenerator';
import { CreateOrderUseCase } from '../../application/order/use-cases/CreateOrderUseCase';
import { OrderRepository } from '../../domain/order/repositories/OrderRepository';
import { OrderQueueProducer } from '../../infra/messaging/producers/OrderQueueProducer';

const mockSave = jest.fn();
const mockUpdate = jest.fn();
const mockSendToQueue = jest.fn();

jest.mock('../../domain/order/repositories/OrderRepository', () => {
    return {
        OrderRepository: jest.fn().mockImplementation(() => ({
            save: mockSave,
            update: mockUpdate,
        })),
    };
});

jest.mock('../../infra/messaging/producers/OrderQueueProducer', () => {
    return {
        OrderQueueProducer: jest.fn().mockImplementation(() => ({
            sendToQueue: mockSendToQueue,
        })),
    };
});

describe('CreateOrderUseCase', () => {
    it('deve salvar o pedido e enviá-lo para a fila', async () => {
        const generator = new OrderGenerator();
        const orderData = generator.generate();

        const useCase = new CreateOrderUseCase(
            new OrderRepository(),
            new OrderQueueProducer()
        );

        await useCase.execute(orderData);

        expect(mockSave).toHaveBeenCalled();
        expect(mockSendToQueue).toHaveBeenCalled();
        expect(mockUpdate).toHaveBeenCalled(); 
    });
});
