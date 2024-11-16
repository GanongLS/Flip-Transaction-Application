// To parse this data:
//
//   import { Convert } from "./file";
//
//   const transaction = Convert.toTransaction(json);

export interface Transaction {
  id: string;
  amount: number;
  unique_code: number;
  status: Status;
  sender_bank: SenderBank;
  account_number: string;
  beneficiary_name: string;
  beneficiary_bank: string;
  remark: Remark;
  created_at: Date;
  completed_at: Date;
  fee: number;
}

export type Transactions = {[k: string]: Transaction};

export enum Remark {
  SampleRemark = 'sample remark',
}

export enum SenderBank {
  Bni = 'bni',
}

export enum Status {
  Pending = 'PENDING',
  Success = 'SUCCESS',
}

// Converts JSON strings to/from your types
export class Convert {
  public static toTransaction(json: string): {[key: string]: Transaction} {
    return JSON.parse(json);
  }

  public static transactionToJson(value: {[key: string]: Transaction}): string {
    return JSON.stringify(value);
  }
}
