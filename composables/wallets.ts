import { useStorage } from "@vueuse/core";
import { Ref } from "vue";
import { WalletType } from "~~/types/wallet";

export const useWallets = defineStore("wallets", () => {
  const wallets: Ref<Array<WalletType>> = useStorage("vue-storage-wallets", []);

  function createWallet(wallet: WalletType) {
    wallets.value.push(wallet);
  }

  return { wallets, createWallet };
});
