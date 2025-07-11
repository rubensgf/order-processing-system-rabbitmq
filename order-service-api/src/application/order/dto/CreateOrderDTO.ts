import { OrderStatus } from "domain/order/entities/OrderStatus";


export interface CreateOrderDTO {
    id: string;
    userId: string;
    productId: string;
    amount: number;
    tokenCard: string;
    status?: OrderStatus;
}