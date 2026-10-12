<script setup>
import { ref } from 'vue'
import MenuLateral from './components/MenuLateral.vue'
const drawer = ref(null)
</script>

<template>
  <v-app>
    <v-app-bar color="primary" flat>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-icon class="mr-2" icon="mdi-pill" />
      <v-app-bar-title>Farmácia Vida · Estoque</v-app-bar-title>
    </v-app-bar>
    <MenuLateral v-model="drawer" />
    <v-main>
      <v-container><router-view /></v-container>
    </v-main>
  </v-app>
</template>
