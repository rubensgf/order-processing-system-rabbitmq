import { Status } from '../../enum/status.enum';

export class PaymentBatch {
  public readonly batchId: string;
  public readonly rawData: unknown;
  private _status: Status;
  public readonly receivedAt: Date;

  constructor(props: {
    batchId: string;
    rawData: unknown;
    status: Status;
    receivedAt: Date;
  }) {
    this.batchId = props.batchId;
    this.rawData = props.rawData;
    this._status = props.status;
    this.receivedAt = props.receivedAt;
  }

  public get status(): Status {
    return this._status;
  }

  public changeStatus(newStatus: Status): void {
    this._status = newStatus;
  }
}
