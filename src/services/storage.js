import { ref, watch } from 'vue'

const CHAVE = 'farmacia:medicamentos'

export const formas = ['Comprimido', 'Cápsula', 'Solução', 'Suspensão', 'Xarope', 'Injetável', 'Creme', 'Pomada', 'Gel', 'Outro']
export const ESTOQUE_BAIXO = 10

const exemplos = [
  { id: 1, nome: 'Dipirona Sódica', principioAtivo: 'Dipirona', fabricante: 'EMS', forma: 'Comprimido', dosagem: '500 mg', quantidade: 120, preco: 8.9, validade: '2027-06-30', receita: false },
  { id: 2, nome: 'Amoxicilina', principioAtivo: 'Amoxicilina tri-hidratada', fabricante: 'Eurofarma', forma: 'Cápsula', dosagem: '500 mg', quantidade: 6, preco: 24.5, validade: '2027-01-15', receita: true },
  { id: 3, nome: 'Losartana Potássica', principioAtivo: 'Losartana', fabricante: 'Medley', forma: 'Comprimido', dosagem: '50 mg', quantidade: 45, preco: 15.2, validade: '2026-09-30', receita: true },
  { id: 4, nome: 'Ibuprofeno', principioAtivo: 'Ibuprofeno', fabricante: 'Neo Química', forma: 'Suspensão', dosagem: '100 mg/mL', quantidade: 30, preco: 18, validade: '2028-03-10', receita: false }
]

function carregar() {
  try {
    const bruto = localStorage.getItem(CHAVE)
    return bruto ? JSON.parse(bruto) : exemplos
  } catch {
    return exemplos
  }
}

// Fonte única de dados, usada pelo CRUD e pela consulta.
export const medicamentos = ref(carregar())

watch(medicamentos, (v) => localStorage.setItem(CHAVE, JSON.stringify(v)), { deep: true })

export function salvarMedicamento(m) {
  if (m.id) {
    const i = medicamentos.value.findIndex((x) => x.id === m.id)
    if (i >= 0) medicamentos.value[i] = { ...m }
  } else {
    medicamentos.value.push({ ...m, id: Date.now() })
  }
}

export function excluirMedicamento(id) {
  medicamentos.value = medicamentos.value.filter((m) => m.id !== id)
}

export const hoje = () => new Date().toISOString().slice(0, 10)
export const vencido = (iso) => !!iso && iso < hoje()

export function formatarData(iso) {
  if (!iso) return '—'
  const [a, m, d] = iso.split('-')
  return `${d}/${m}/${a}`
}

export function formatarPreco(v) {
  return Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export const cabecalhos = [
  { title: 'Medicamento', key: 'nome' },
  { title: 'Princípio ativo', key: 'principioAtivo' },
  { title: 'Fabricante', key: 'fabricante' },
  { title: 'Forma', key: 'forma' },
  { title: 'Dosagem', key: 'dosagem' },
  { title: 'Quantidade', key: 'quantidade' },
  { title: 'Preço', key: 'preco' },
  { title: 'Validade', key: 'validade' },
  { title: 'Exige receita', key: 'receita' }
]
