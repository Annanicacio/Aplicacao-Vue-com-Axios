<script setup>
import { ref } from 'vue'
import MenuLateral from './components/MenuLateral.vue'

const drawer = ref(true)
</script>

<template>
  <v-app class="bg-grey-lighten-2">
    <v-app-bar color="red-darken-4" flat>
      <v-app-bar-nav-icon @click="drawer = !drawer" color="white" />
      <v-app-bar-title class="text-white font-weight-bold shadowTitle">
        <v-icon class="mr-2" icon="mdi-pill" color="white" /> Farmácia Vida
      </v-app-bar-title>

      <v-spacer />

      <v-chip size="small" color="white" variant="outlined" class="mr-3">
        <v-icon icon="mdi-map-marker" start size="14" color="white" />
        Unidade Matriz - Sinop / MT
      </v-chip>
    </v-app-bar>

    <MenuLateral v-model="drawer" />

    <v-main>
      <v-container class="mt-2 bg-grey-lighten-3 borderRadius">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.borderRadius {
  border-radius: 10px;
}

.shadowTitle {
  padding: 10px;
  display: inline-block;
  cursor: pointer;
  transition: all 0.3s ease;
}

.shadowTitle:hover {
  transform: translateY(-2px);
  text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5);
}
</style>