<script setup>
import { computed } from 'vue'
import { medicamentos, vencido, ESTOQUE_BAIXO } from '../services/storage'
const total = computed(() => medicamentos.value.length)
const vencidos = computed(() => medicamentos.value.filter((m) => vencido(m.validade)).length)
const baixos = computed(() => medicamentos.value.filter((m) => m.quantidade < ESTOQUE_BAIXO).length)
</script>

<template>
  <h1 class="text-h4 mb-2">Farmácia Vida</h1>
  <p class="text-body-1 mb-6">Controle de estoque: cadastre medicamentos, acompanhe validades e consulte o catálogo com filtros.</p>

  <v-row class="mb-2">
    <v-col cols="12" sm="4"><v-alert color="primary" variant="tonal" icon="mdi-pill" :text="`${total} medicamentos cadastrados`" /></v-col>
    <v-col cols="12" sm="4"><v-alert color="error" variant="tonal" icon="mdi-calendar-alert" :text="`${vencidos} com validade vencida`" /></v-col>
    <v-col cols="12" sm="4"><v-alert color="warning" variant="tonal" icon="mdi-package-down" :text="`${baixos} com estoque baixo (< ${ESTOQUE_BAIXO})`" /></v-col>
  </v-row>

  <v-row>
    <v-col cols="12" sm="6">
      <v-card to="/estoque" prepend-icon="mdi-package-variant-closed" title="Gerenciar estoque" text="Cadastrar, editar e excluir medicamentos." />
    </v-col>
    <v-col cols="12" sm="6">
      <v-card to="/consulta" prepend-icon="mdi-text-box-search-outline" title="Consultar medicamentos" text="Buscar e filtrar por forma, preço, validade e prescrição." />
    </v-col>
  </v-row>
</template>
