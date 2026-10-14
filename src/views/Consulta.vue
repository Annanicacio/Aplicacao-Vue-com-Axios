<script setup>
import { ref, computed } from 'vue'
import FiltroBarra from '../components/FiltroBarra.vue'
import TabelaMedicamentos from '../components/TabelaMedicamentos.vue'
import { medicamentos } from '../services/storage'

const padrao = () => ({ busca: '', forma: null, precoMin: '', precoMax: '', validadeDe: '', validadeAte: '', receita: null })
const filtros = ref(padrao())
const preenchido = (v) => v !== '' && v !== null && v !== undefined

const resultado = computed(() => {
  const f = filtros.value
  const termo = (f.busca || '').toLowerCase().trim()
  return medicamentos.value.filter((m) => {
    if (termo && ![m.nome, m.principioAtivo, m.fabricante, m.dosagem].some((c) => (c || '').toLowerCase().includes(termo))) return false
    if (f.forma && m.forma !== f.forma) return false
    if (preenchido(f.precoMin) && m.preco < Number(f.precoMin)) return false
    if (preenchido(f.precoMax) && m.preco > Number(f.precoMax)) return false
    if (f.validadeDe && m.validade < f.validadeDe) return false
    if (f.validadeAte && m.validade > f.validadeAte) return false
    if (f.receita !== null && m.receita !== f.receita) return false
    return true
  })
})
</script>

<template>
  <div class="d-flex align-center mb-4">
    <h1 class="text-h5 font-weight-bold text-grey-darken-3">Consultar medicamentos</h1>
  </div>
  <FiltroBarra v-model="filtros" @limpar="filtros = padrao()" />

  <p class="text-body-2 mb-2" aria-live="polite">
    {{ resultado.length }} {{ resultado.length === 1 ? 'medicamento encontrado' : 'medicamentos encontrados' }} de {{ medicamentos.length }}
  </p>

  <v-card>
    <TabelaMedicamentos :itens="resultado">
      <template #vazio>
        <div class="pa-6 text-medium-emphasis">Nenhum medicamento atende aos filtros. Ajuste os critérios ou limpe os filtros.</div>
      </template>
    </TabelaMedicamentos>
  </v-card>
</template>
