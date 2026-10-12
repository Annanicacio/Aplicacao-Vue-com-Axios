<script setup>
import { cabecalhos, formatarData, formatarPreco, vencido, ESTOQUE_BAIXO } from '../services/storage'
defineProps({ itens: { type: Array, required: true }, acoes: Boolean })
defineEmits(['editar', 'excluir'])
</script>

<template>
  <v-data-table :headers="acoes ? [...cabecalhos, { title: 'Ações', key: 'acoes', sortable: false }] : cabecalhos" :items="itens"
    items-per-page-text="Linhas por página" no-data-text="Nenhum medicamento cadastrado.">
    <template #no-data><slot name="vazio">Nenhum medicamento cadastrado.</slot></template>
    <template #item.quantidade="{ item }">
      {{ item.quantidade }}
      <v-chip v-if="item.quantidade < ESTOQUE_BAIXO" color="warning" size="x-small" class="ml-1">Baixo</v-chip>
    </template>
    <template #item.preco="{ item }">{{ formatarPreco(item.preco) }}</template>
    <template #item.validade="{ item }">
      {{ formatarData(item.validade) }}
      <v-chip v-if="vencido(item.validade)" color="error" size="x-small" class="ml-1">Vencido</v-chip>
    </template>
    <template #item.receita="{ item }">
      <v-chip :color="item.receita ? 'primary' : 'grey'" size="small">{{ item.receita ? 'Sim' : 'Não' }}</v-chip>
    </template>
    <template v-if="acoes" #item.acoes="{ item }">
      <v-btn icon="mdi-pencil" variant="text" size="small" aria-label="Editar" @click="$emit('editar', item)" />
      <v-btn icon="mdi-delete" variant="text" size="small" color="error" aria-label="Excluir" @click="$emit('excluir', item)" />
    </template>
  </v-data-table>
</template>
