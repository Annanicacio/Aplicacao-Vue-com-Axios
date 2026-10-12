<script setup>
import { ref } from 'vue'
import MenuLateral from './components/MenuLateral.vue'

const drawer = ref(true)
</script>

<template>
  <v-app class="bg-background">
    <v-app-bar color="primary" flat>
      <v-app-bar-nav-icon @click="drawer = !drawer" color="white" />
      <v-icon class="mr-2" icon="mdi-pill" color="white" />
      <v-app-bar-title class="text-white font-weight-bold">Farmácia Vida · Estoque</v-app-bar-title>

      <v-spacer />

      <v-chip size="small" color="secondary" class="mr-3 text-white">
        <v-icon icon="mdi-map-marker" start size="14" color="white" />
        Unidade Matriz
      </v-chip>
    </v-app-bar>

    <MenuLateral v-model="drawer" />

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>