<script setup>
defineProps({ modelValue: { type: Boolean, default: null } })
defineEmits(['update:modelValue'])
const itens = [
  { titulo: 'Início', icone: 'mdi-home-outline', to: '/' },
  { titulo: 'Gerenciar estoque', icone: 'mdi-package-variant-closed', to: '/estoque' },
  { titulo: 'Consultar medicamentos', icone: 'mdi-text-box-search-outline', to: '/consulta' }
]
</script>

<template>
  <v-navigation-drawer :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
    <v-list nav>
      <v-list-item v-for="i in itens" :key="i.to" :to="i.to" :prepend-icon="i.icone" :title="i.titulo" color="primary" />
    </v-list>
  </v-navigation-drawer>
</template>
