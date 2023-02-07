import { useStorage } from "@vueuse/core";
import { Ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import { WalletType } from "~~/types/wallet";
import { TransactionType } from "~~/types/transaction";

export const useWallets = defineStore("wallets", () => {
  const wallet: Ref<WalletType | undefined> = ref();
  const wallets: Ref<Array<WalletType>> = useStorage("vue-storage-wallets", []);

  function loadWallet(uuid: string) {
    wallet.value = wallets.value.find(
      (wallet) => wallet.uuid === uuid
    ) as WalletType;
  }

  function createWallet(data: WalletType) {
    const transaction = createTransaction(0, data.reserved as number);
    wallets.value.push({
      ...data,
      uuid: uuidv4(),
      transactions: [transaction as TransactionType],
    });
  }

  function editWallet(walletData: WalletType) {
    wallets.value = wallets.value.map((data) => {
      if (data.uuid !== wallet.value?.uuid) return data;
      return {
        ...wallet.value,
        ...walletData,
      };
    });
  }

  function removeWallet() {
    wallets.value = wallets.value.filter(
      (data) => data.uuid !== wallet.value?.uuid
    );
  }

  function calculateReservedValue(
    uuid: string,
    value: number,
    operator: number
  ) {
    wallets.value = wallets.value.map((wallet) => {
      if (wallet.uuid !== uuid) return wallet;
      const transaction = createTransaction(operator, value);
      return {
        ...wallet,
        reserved: (wallet.reserved || 0) + value * operator,
        transactions: [...wallet.transactions, transaction],
      };
    });
  }

  function createTransaction(type: number, value: number): TransactionType {
    return {
      uuid: uuidv4(),
      createdAt: new Date().getTime(),
      type,
      value,
    };
  }

  return {
    wallet,
    wallets,
    loadWallet,
    createWallet,
    editWallet,
    removeWallet,
    calculateReservedValue,
  };
});
