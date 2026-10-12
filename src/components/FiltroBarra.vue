<script setup>
import { formas } from '../services/storage'
const props = defineProps({ modelValue: { type: Object, required: true } })
const emit = defineEmits(['update:modelValue', 'limpar'])
const set = (campo, valor) => emit('update:modelValue', { ...props.modelValue, [campo]: valor })
const situacoes = [
  { title: 'Todos', value: null },
  { title: 'Exigem receita', value: true },
  { title: 'Venda livre', value: false }
]
</script>

<template>
  <v-card class="pa-4 mb-4">
    <v-row dense>
      <v-col cols="12">
        <v-text-field :model-value="modelValue.busca" label="Buscar por nome, princípio ativo, fabricante ou dosagem" prepend-inner-icon="mdi-magnify"
          clearable hide-details @update:model-value="set('busca', $event ?? '')" />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-select :model-value="modelValue.forma" :items="formas" label="Forma farmacêutica" clearable hide-details @update:model-value="set('forma', $event)" />
      </v-col>
      <v-col cols="6" md="2"><v-text-field :model-value="modelValue.precoMin" type="number" min="0" label="Preço de" hide-details @update:model-value="set('precoMin', $event)" /></v-col>
      <v-col cols="6" md="2"><v-text-field :model-value="modelValue.precoMax" type="number" min="0" label="Preço até" hide-details @update:model-value="set('precoMax', $event)" /></v-col>
      <v-col cols="6" md="2"><v-text-field :model-value="modelValue.validadeDe" type="date" label="Validade de" hide-details @update:model-value="set('validadeDe', $event)" /></v-col>
      <v-col cols="6" md="2"><v-text-field :model-value="modelValue.validadeAte" type="date" label="Validade até" hide-details @update:model-value="set('validadeAte', $event)" /></v-col>
      <v-col cols="12" sm="6" md="3">
        <v-select :model-value="modelValue.receita" :items="situacoes" label="Prescrição" hide-details @update:model-value="set('receita', $event)" />
      </v-col>
      <v-col cols="12" sm="6" md="3" class="d-flex align-center">
        <v-btn variant="tonal" color="primary" prepend-icon="mdi-filter-off" @click="emit('limpar')">Limpar filtros</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>
