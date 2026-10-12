<script setup>
import { cabecalhos, formatarData, formatarPreco, vencido, ESTOQUE_BAIXO } from '../services/storage'
defineProps({ itens: { type: Array, required: true }, acoes: Boolean })
defineEmits(['editar', 'excluir'])
</script>

<template>
  <v-data-table 
    :headers="acoes ? [...cabecalhos, { title: 'Ações', key: 'acoes', sortable: false, align: 'end' }] : cabecalhos" 
    :items="itens"
    items-per-page-text="Linhas por página" 
    class="border rounded-lg"
  >
    <template #no-data>
      <div class="py-12 text-center">
        <v-avatar color="grey-lighten-4" size="64" class="mb-3">
          <v-icon icon="mdi-pill-off" size="32" color="grey" />
        </v-avatar>
        <div class="text-subtitle-1 font-weight-bold text-grey-darken-2">Nenhum medicamento encontrado</div>
        <div class="text-caption text-medium-emphasis">Não há registros correspondentes cadastrados no sistema.</div>
      </div>
    </template>

    <template #item.nome="{ item }">
      <span class="font-weight-bold text-grey-darken-3">{{ item.nome }}</span>
    </template>

    <template #item.quantidade="{ item }">
      <div class="d-flex align-center">
        <span>{{ item.quantidade }}</span>
        <v-chip v-if="item.quantidade < ESTOQUE_BAIXO" color="warning" size="x-small" label class="ml-2">
          Estoque Baixo
        </v-chip>
      </div>
    </template>

    <template #item.preco="{ item }">
      <span class="font-weight-medium">{{ formatarPreco(item.preco) }}</span>
    </template>

    <template #item.validade="{ item }">
      <div class="d-flex align-center">
        <span>{{ formatarData(item.validade) }}</span>
        <v-chip v-if="vencido(item.validade)" color="error" size="x-small" label class="ml-2">
          Vencido
        </v-chip>
      </div>
    </template>

    <template #item.receita="{ item }">
      <v-chip :color="item.receita ? 'primary' : 'grey-darken-1'" size="x-small" variant="tonal">
        {{ item.receita ? 'Receita Obrigatória' : 'Venda Livre' }}
      </v-chip>
    </template>

    <template v-if="acoes" #item.acoes="{ item }">
      <div class="d-flex justify-end">
        <v-btn icon="mdi-pencil-outline" variant="text" size="small" color="primary" aria-label="Editar" @click="$emit('editar', item)" />
        <v-btn icon="mdi-delete-outline" variant="text" size="small" color="error" aria-label="Excluir" @click="$emit('excluir', item)" />
      </div>
    </template>
  </v-data-table>
</template>