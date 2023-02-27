import { Ref } from "vue";
import { useStorage } from "@vueuse/core";
import { v4 as uuidv4 } from "uuid";
import { WalletType } from "~~/types/wallet";
import { TransactionType } from "~~/types/transaction";
import { dynamicSort } from "~~/utils/computers";
import { displayToLimit } from "~~/utils/converters";
import { useDisplay } from "vuetify/lib/framework.mjs";

export const useWallets = defineStore("wallets", () => {
  const { name: displayName } = useDisplay();

  const wallet: Ref<WalletType | undefined> = ref();
  const wallets: Ref<Map<string, WalletType>> = useStorage(
    "vue-storage-wallets",
    new Map()
  );
  const walletsPage = ref(1);
  const walletsNameFilter = ref("");
  const walletsOrderBy = ref("");

  const importingWalletsData = ref(false);

  const walletsLimit = computed(() => {
    walletsPage.value = 1;
    return displayToLimit(displayName.value);
  });
  const filteredWallets = computed(() => {
    const result = [];
    for (let wallet of wallets.value.values()) {
      if (sanitize(wallet.name).includes(sanitize(walletsNameFilter.value)))
        result.push(wallet);
    }
    return result;
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
  const walletsReservedAmount = computed(() => {
    let reservedAmount = 0;
    for (let wallet of wallets.value.values()) {
      reservedAmount += wallet.reserved || 0;
    }
    return reservedAmount;
  });

  function loadWallet(uuid: string) {
    wallet.value = wallets.value.get(uuid);
  }

  function createWallet(data: WalletType) {
    const uuid = uuidv4();
    const transaction = createTransaction(0, data.reserved as number);
    const newWallet = {
      ...data,
      uuid,
      createdAt: new Date().getTime(),
      transactions: [transaction as TransactionType],
    };
    wallets.value.set(uuid, newWallet);
  }

  function editWallet(walletData: WalletType) {
    const editData = {
      ...wallet.value,
      ...walletData,
    };
    wallets.value.set(wallet.value?.uuid as string, editData);
  }

  function removeWallet() {
    wallets.value.delete(wallet.value?.uuid as string);
  }

  function calculateReservedValue(
    uuid: string,
    value: number,
    operator: number
  ) {
    const wallet = wallets.value.get(uuid) as WalletType;
    const transaction = createTransaction(operator, value);
    wallet.reserved = (wallet.reserved || 0) + value * operator;
    wallet.transactions = [
      ...(wallet.transactions as Array<TransactionType>),
      transaction,
    ];
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
    walletsReservedAmount,

    loadWallet,
    createWallet,
    editWallet,
    removeWallet,
    calculateReservedValue,
    setWalletsOrderBy,
  };
});
