import { Status } from '../../enum/status.enum';

export class Payment {
  public readonly paymentId: string;
  public readonly batchId: string;
  public readonly userId: string;
  public readonly productId: string;
  public readonly tokenCard: string;
  public readonly amount: number;
  private _status: Status;
  public readonly createdAt: Date;

  constructor(props: {
    paymentId: string;
    batchId: string;
    userId: string;
    productId: string;
    tokenCard: string;
    amount: number;
    status: Status;
    createdAt: Date;
  }) {
    this.paymentId = props.paymentId;
    this.batchId = props.batchId;
    this.userId = props.userId;
    this.productId = props.productId;
    this.tokenCard = props.tokenCard;
    this.amount = props.amount;
    this._status = props.status;
    this.createdAt = props.createdAt;
  }

  public get status(): Status {
    return this._status;
  }

  public changeStatus(newStatus: Status): void {
    this._status = newStatus;
  }
}
