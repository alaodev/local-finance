import { IconPickerType } from "~~/types/icon-picker";
import { TransactionType } from "~~/types/transaction";

export type WalletType = {
  uuid?: string;
  createdAt?: number;
  goal?: number;
  name: string;
  reserved?: number;
  icon: IconPickerType;
  transactions?: Array<TransactionType>;
};
