<script lang="ts" setup>
const walletsStore = useWallets();

const { removeWallet } = walletsStore;

const dialog = ref(false);

function handleRemoveWallet() {
  removeWallet();
  navigateTo("/wallets/");
}
</script>

<template>
  <v-btn>
    <slot />
    <v-dialog v-model="dialog" activator="parent" max-width="500">
      <v-card class="pa-6">
        <v-card-title> Remover carteira </v-card-title>
        <v-card-text> Deseja realmente remover essa carteira? </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="dialog = false">Fechar</v-btn>
          <v-btn @click="handleRemoveWallet" color="primary" variant="flat">
            <slot />
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>
