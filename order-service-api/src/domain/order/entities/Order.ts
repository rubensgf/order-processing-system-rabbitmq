import { OrderStatus } from '@prisma/client';


export class Order {
    public readonly id: string;
    public readonly userId: string;
    public readonly productId: string;
    public readonly amount: number;
    public readonly tokenCard: string;
    private _status: OrderStatus;
    public readonly createdAt: Date;
  
    constructor(props: {
      id: string;
      userId: string;
      productId: string;
      amount: number;
      tokenCard: string;
      status: OrderStatus;
      createdAt: Date;
    }) {
      this.id = props.id;
      this.userId = props.userId;
      this.productId = props.productId;
      this.amount = props.amount;
      this.tokenCard = props.tokenCard;
      this._status = props.status;
      this.createdAt = props.createdAt;
    }
  
    public get status(): OrderStatus {
      return this._status;
    }
  
    public setStatus(newStatus: OrderStatus) {
      this._status = newStatus;
    }
  }
  