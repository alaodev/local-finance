import { useStorage } from "@vueuse/core";
import { Ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import { WalletType } from "~~/types/wallet";

export const useWallets = defineStore("wallets", () => {
  const wallet: Ref<WalletType | undefined> = ref();
  const wallets: Ref<Array<WalletType>> = useStorage("vue-storage-wallets", []);

  function loadWallet(uuid: string) {
    wallet.value = wallets.value.find(
      (wallet) => wallet.uuid === uuid
    ) as WalletType;
  }

  function createWallet(data: WalletType) {
    wallets.value.push({
      uuid: uuidv4(),
      ...data,
    });
  }

  function editWallet(uuid: string, data: WalletType) {
    wallets.value = wallets.value.map((wallet) => {
      if (wallet.uuid !== uuid) return wallet;
      return {
        ...wallet,
        ...data,
      };
    });
  }

  function calculateReservedValue(
    uuid: string,
    value: number,
    operator: number
  ) {
    wallets.value = wallets.value.map((wallet) => {
      if (wallet.uuid !== uuid) return wallet;
      return {
        ...wallet,
        reserved: wallet.reserved + value * operator,
      };
    });
  }

  return {
    wallet,
    wallets,
    loadWallet,
    createWallet,
    editWallet,
    calculateReservedValue,
  };
});
