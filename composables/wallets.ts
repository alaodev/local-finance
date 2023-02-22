import { Ref } from "vue";
import { useStorage } from "@vueuse/core";
import { v4 as uuidv4 } from "uuid";
import { WalletType } from "~~/types/wallet";
import { TransactionType } from "~~/types/transaction";
import { dynamicSort } from "~~/utils/computers";

export const useWallets = defineStore("wallets", () => {
  const wallet: Ref<WalletType | undefined> = ref();
  const wallets: Ref<Array<WalletType>> = useStorage("vue-storage-wallets", []);
  const walletsLimit = ref(6);
  const walletsPage = ref(1);
  const walletsNameFilter = ref("");
  const walletsOrderBy = ref("");

  const importingWalletsData = ref(false);

  const filteredWallets = computed(() => {
    return wallets.value.filter((item) =>
      sanitize(item.name).includes(sanitize(walletsNameFilter.value))
    );
  });
  const walletsSize = computed(() => filteredWallets.value.length);
  const orderedWallets = computed(() =>
    filteredWallets.value.sort(dynamicSort(walletsOrderBy.value))
  );
  const pagedWallets = computed(() => {
    return orderedWallets.value.slice(
      (walletsPage.value - 1) * walletsLimit.value,
      walletsLimit.value * walletsPage.value
    );
  });
  const walletReservedAmount = computed(() => {
    return Object.keys(wallets.value).reduce((acc, cur) => {
      return (acc += wallets.value[cur].reserved);
    }, 0);
  });

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
      createdAt: new Date().getTime(),
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
        transactions: [
          ...(wallet.transactions as Array<TransactionType>),
          transaction,
        ],
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

  function setWalletsOrderBy(value: string) {
    walletsOrderBy.value = value;
  }

  return {
    wallet,
    wallets,
    walletsLimit,
    walletsPage,
    walletsNameFilter,

    importingWalletsData,

    walletsSize,
    pagedWallets,
    walletReservedAmount,

    loadWallet,
    createWallet,
    editWallet,
    removeWallet,
    calculateReservedValue,
    setWalletsOrderBy,
  };
});
