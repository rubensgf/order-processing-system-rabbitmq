// src/infra/repositories/OrderRepository.ts

import { IOrderRepository } from './IOrderRepository';
import { Order } from '../entities/Order';
import { prisma } from '../../../infra/prisma/prismaClient';

export class OrderRepository implements IOrderRepository {
    async save(order: Order): Promise<void> {
        await prisma.order.create({
            data: {
                id: order.id,
                userId: order.userId,
                productId: order.productId,
                amount: order.amount,
                tokenCard: order.tokenCard,
                status: order.status,
                createdAt: order.createdAt,
            }
        });
    }

    async update(order: Order): Promise<void> {
        await prisma.order.update({
          where: { id: order.id },
          data: {
            status: order.status,
          },
        });
    }
}
