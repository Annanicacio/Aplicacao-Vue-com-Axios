<script setup>
defineProps({ modelValue: { type: Boolean, default: true } })
defineEmits(['update:modelValue'])

const itens = [
  { titulo: 'Início', icone: 'mdi-home-outline', to: '/' },
  { titulo: 'Gerenciar estoque', icone: 'mdi-package-variant-closed', to: '/estoque' },
  { titulo: 'Consultar medicamentos', icone: 'mdi-text-box-search-outline', to: '/consulta' }
]
</script>

<template>
  <v-navigation-drawer 
    :model-value="modelValue" 
    @update:model-value="$emit('update:modelValue', $event)"
    color="primary"
  >
    <v-list nav class="bg-transparent">
      <v-list-item 
        v-for="i in itens" 
        :key="i.to" 
        :to="i.to" 
        :prepend-icon="i.icone" 
        :title="i.titulo" 
        color="white"
        active-color="white"
        class="text-white"
      />
    </v-list>
  </v-navigation-drawer>
</template>