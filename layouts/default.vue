<template>
  <v-app>
    <navigation-drawer />
    <app-bar />
    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>
