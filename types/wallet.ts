import { IconPickerType } from "./icon-picker";

export type WalletType = {
  uuid?: string;
  goal?: number;
  name: string;
  reserved?: number;
  icon: IconPickerType;
};
