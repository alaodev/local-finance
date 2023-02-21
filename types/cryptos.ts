import { TransactionType } from "~~/types/transaction";

type CrytoBaseType = {
  id: string;
  image: string;
  name: string;
};

export type CryptoTableItemType = {
  percentageIn1h: number;
  percentageIn24h: number;
  percentageIn7d: number;
  price: number;
  sparklineData: Array<number>;
  symbol: string;
} & CrytoBaseType;

export type CryptoType = {
  amount: number;
  transactions?: Array<TransactionType>;
} & CrytoBaseType;
