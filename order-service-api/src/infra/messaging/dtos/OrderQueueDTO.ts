import { Order } from '../../../domain/order/entities/Order';

export interface OrderQueueItem {
    order_id: string;
    user_id: string;
    product_id: string;
    amount: number;
    token_card: string;
  }
  
  export class OrderQueueDTO {
    static toQueuePayload(order: Order): { orders: OrderQueueItem[] } {
      return {
        orders: [
          {
            order_id: order.id,
            user_id: order.userId,
            product_id: order.productId,
            amount: order.amount,
            token_card: order.tokenCard,
          },
        ],
      };
    }
  }
  