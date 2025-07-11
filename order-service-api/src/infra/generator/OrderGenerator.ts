import { v4 as uuidv4 } from 'uuid';

export enum OrderStatus {
    Pending = 'pending',
    Paid = 'paid',
    Failed = 'failed'

}
export class OrderGenerator {
    generate() {
        return {
            id: uuidv4(),
            userId: uuidv4(),
            productId: uuidv4(),
            amount: parseFloat((Math.random() * 100 + 10).toFixed(2)),
            tokenCard: `card-${uuidv4()}`,
            status: OrderStatus.Pending,
            createdAt: new Date(),
        };
    }
}