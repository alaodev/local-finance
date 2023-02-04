import { useStorage } from "@vueuse/core";
import { Ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import { WalletType } from "~~/types/wallet";

export const useWallets = defineStore("wallets", () => {
  const wallets: Ref<Array<WalletType>> = useStorage("vue-storage-wallets", []);

  function createWallet(wallet: WalletType) {
    wallets.value.push({
      uuid: uuidv4(),
      ...wallet,
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

  return { wallets, createWallet, calculateReservedValue };
});
