<template>
  <v-app-bar>
    <template v-slot:append>
      <theme-switcher />
      <lang-switcher />
      <v-divider inset vertical />
      <data-handler />
    </template>
  </v-app-bar>
</template>
