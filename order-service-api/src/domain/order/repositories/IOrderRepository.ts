import { Order } from '../entities/Order';

export interface IOrderRepository {
    save(order: Order): Promise<void>;
    update(order: Order): Promise<void>;
}
