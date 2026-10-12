<script setup>
import { ref, watch } from 'vue'
import { formas } from '../services/storage'
import { buscarMedicamentos } from '../services/medicamentos'

const props = defineProps({ modelValue: Boolean, medicamento: { type: Object, default: null } })
const emit = defineEmits(['update:modelValue', 'salvar', 'aviso'])

const vazio = () => ({ nome: '', principioAtivo: '', fabricante: '', forma: null, dosagem: '', quantidade: null, preco: null, validade: '', receita: false })
const form = ref(vazio())
const formRef = ref(null)

// Busca na API
const sugestoes = ref([])
const escolhido = ref(null)
const carregando = ref(false)
const erroApi = ref('')
let timer

watch(() => props.modelValue, (aberto) => {
  if (aberto) {
    form.value = props.medicamento ? { ...props.medicamento } : vazio()
    sugestoes.value = []
    escolhido.value = null
    erroApi.value = ''
  }
})

function aoDigitar(texto) {
  clearTimeout(timer)
  erroApi.value = ''
  if (!texto || escolhido.value?.titulo === texto) return
  timer = setTimeout(() => pesquisar(texto), 600)
}

async function pesquisar(texto) {
  carregando.value = true
  try {
    sugestoes.value = await buscarMedicamentos(texto)
    if (!sugestoes.value.length) erroApi.value = 'Nenhum medicamento encontrado. Preencha manualmente.'
  } catch (e) {
    sugestoes.value = []
    erroApi.value = e.message
    emit('aviso', { texto: e.message, cor: 'error' })
  } finally {
    carregando.value = false
  }
}

function aoEscolher(s) {
  escolhido.value = s
  if (s) Object.assign(form.value, s.item)
}

const obrigatorio = (v) => (v !== null && v !== '' && v !== undefined) || 'Campo obrigatório.'
const regras = {
  nome: [obrigatorio, (v) => v.length >= 2 || 'Mínimo de 2 caracteres.'],
  texto: [obrigatorio],
  forma: [obrigatorio],
  quantidade: [obrigatorio, (v) => Number.isInteger(v) || 'Informe um número inteiro.', (v) => v >= 0 || 'A quantidade não pode ser negativa.', (v) => v <= 100000 || 'Quantidade máxima: 100.000.'],
  preco: [obrigatorio, (v) => v > 0 || 'O preço deve ser maior que zero.', (v) => v <= 10000 || 'Preço máximo: R$ 10.000.'],
  validade: [obrigatorio]
}

async function enviar() {
  const { valid } = await formRef.value.validate()
  if (!valid) return
  emit('salvar', { ...form.value, quantidade: Number(form.value.quantidade), preco: Number(form.value.preco) })
  emit('update:modelValue', false)
}
</script>

<template>
  <v-dialog :model-value="modelValue" max-width="680" persistent scrollable @update:model-value="emit('update:modelValue', $event)">
    <v-card :title="form.id ? 'Editar medicamento' : 'Novo medicamento'">
      <v-card-text>
        <v-autocomplete v-model="escolhido" :items="sugestoes" item-title="titulo" return-object no-filter hide-no-data
          label="Buscar na base openFDA (opcional)" placeholder="Ex.: ibuprofen, acetaminophen, amoxicillin"
          prepend-inner-icon="mdi-database-search-outline" :loading="carregando" :error-messages="erroApi"
          hint="Escolha um resultado para preencher o formulário automaticamente." persistent-hint clearable
          @update:search="aoDigitar" @update:model-value="aoEscolher" />

        <v-form ref="formRef" class="mt-6" @submit.prevent="enviar">
          <v-row dense>
            <v-col cols="12" sm="6"><v-text-field v-model="form.nome" label="Nome do medicamento" :rules="regras.nome" /></v-col>
            <v-col cols="12" sm="6"><v-text-field v-model="form.principioAtivo" label="Princípio ativo" :rules="regras.texto" /></v-col>
            <v-col cols="12" sm="6"><v-text-field v-model="form.fabricante" label="Fabricante" :rules="regras.texto" /></v-col>
            <v-col cols="6" sm="3"><v-select v-model="form.forma" :items="formas" label="Forma" :rules="regras.forma" /></v-col>
            <v-col cols="6" sm="3"><v-text-field v-model="form.dosagem" label="Dosagem" placeholder="500 mg" :rules="regras.texto" /></v-col>
            <v-col cols="4"><v-text-field v-model.number="form.quantidade" type="number" min="0" label="Quantidade" :rules="regras.quantidade" /></v-col>
            <v-col cols="4"><v-text-field v-model.number="form.preco" type="number" min="0" step="0.01" label="Preço (R$)" :rules="regras.preco" /></v-col>
            <v-col cols="4"><v-text-field v-model="form.validade" type="date" label="Validade" :rules="regras.validade" /></v-col>
            <v-col cols="12"><v-switch v-model="form.receita" color="primary" label="Venda sob prescrição (exige receita)" hide-details /></v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="emit('update:modelValue', false)">Cancelar</v-btn>
        <v-btn color="primary" variant="flat" @click="enviar">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
