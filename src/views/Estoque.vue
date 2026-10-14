<script setup>
import { ref } from 'vue'
import MedicamentoForm from '../components/MedicamentoForm.vue'
import TabelaMedicamentos from '../components/TabelaMedicamentos.vue'
import { medicamentos, salvarMedicamento, excluirMedicamento } from '../services/storage'

const dialogForm = ref(false)
const editando = ref(null)
const dialogExcluir = ref(false)
const alvo = ref(null)
const snack = ref({ aberto: false, texto: '', cor: 'success' })

const avisar = ({ texto, cor = 'success' }) => (snack.value = { aberto: true, texto, cor })

function novo() { editando.value = null; dialogForm.value = true }
function editar(m) { editando.value = m; dialogForm.value = true }
function pedirExclusao(m) { alvo.value = m; dialogExcluir.value = true }

function salvar(m) {
  const novoRegistro = !m.id
  salvarMedicamento(m)
  avisar({ texto: novoRegistro ? 'Medicamento cadastrado com sucesso.' : 'Medicamento atualizado com sucesso.' })
}
function confirmarExclusao() {
  excluirMedicamento(alvo.value.id)
  dialogExcluir.value = false
  avisar({ texto: `"${alvo.value.nome}" foi excluído do estoque.` })
}
</script>

<template>
  <div class="d-flex align-center mb-4">
    <h1 class="text-h5">Gerenciar estoque</h1>
    <v-spacer />
    <v-btn color="primary" prepend-icon="mdi-plus" @click="novo">Novo medicamento</v-btn>
  </div>

  <v-card>
    <TabelaMedicamentos :itens="medicamentos" acoes @editar="editar" @excluir="pedirExclusao" />
  </v-card>

  <MedicamentoForm v-model="dialogForm" :medicamento="editando" @salvar="salvar" @aviso="avisar" />

  <v-dialog v-model="dialogExcluir" max-width="420">
    <v-card title="Excluir medicamento?">
      <v-card-text>Deseja excluir "{{ alvo?.nome }}" do estoque? Essa ação não pode ser desfeita.</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="dialogExcluir = false">Cancelar</v-btn>
        <v-btn color="error" variant="flat" @click="confirmarExclusao">Excluir</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-snackbar v-model="snack.aberto" :color="snack.cor" timeout="3500">{{ snack.texto }}</v-snackbar>
</template>
