import { TransactionType } from "~~/types/transaction";

type StockBaseType = {
  id: string;
  image: string;
  name: string;
};

export type StockTableItemType = {
  price: number;
  symbol: string;
} & StockBaseType;

export type StockType = {
  amount: number;
  createdAt?: number;
  transactions?: Array<TransactionType>;
} & StockBaseType;
