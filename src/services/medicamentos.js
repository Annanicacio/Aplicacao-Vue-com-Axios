import axios from 'axios'

// API pública openFDA (sem chave): https://open.fda.gov/apis/drug/ndc/
const URL = 'https://api.fda.gov/drug/ndc.json'

function traduzirForma(f = '') {
  const u = f.toUpperCase()
  if (u.includes('TABLET')) return 'Comprimido'
  if (u.includes('CAPSULE')) return 'Cápsula'
  if (u.includes('SUSPENSION')) return 'Suspensão'
  if (u.includes('SYRUP')) return 'Xarope'
  if (u.includes('SOLUTION')) return 'Solução'
  if (u.includes('INJECTION')) return 'Injetável'
  if (u.includes('CREAM')) return 'Creme'
  if (u.includes('OINTMENT')) return 'Pomada'
  if (u.includes('GEL')) return 'Gel'
  return 'Outro'
}

const capitalizar = (s = '') => s.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase())

// Busca por nome comercial ou princípio ativo (em inglês). Lança Error com mensagem amigável.
export async function buscarMedicamentos(termo) {
  const t = termo.trim().split(/\s+/)[0].replace(/[^a-zA-Z0-9-]/g, '')
  if (t.length < 3) throw new Error('Digite ao menos 3 letras (nome em inglês, ex.: ibuprofen).')
  try {
    const { data } = await axios.get(URL, {
      params: { search: `brand_name:${t}* generic_name:${t}*`, limit: 15 },
      timeout: 8000
    })
    const vistos = new Set()
    const lista = []
    for (const r of data.results) {
      const ativo = r.active_ingredients?.[0]
      const item = {
        nome: capitalizar(r.brand_name || r.generic_name),
        principioAtivo: capitalizar(r.generic_name),
        fabricante: capitalizar(r.labeler_name),
        forma: traduzirForma(r.dosage_form),
        dosagem: ativo?.strength ? ativo.strength.replace(/\/1$/, '').toLowerCase() : ''
      }
      const chave = Object.values(item).join('|')
      if (vistos.has(chave)) continue
      vistos.add(chave)
      lista.push({ titulo: `${item.nome} · ${item.principioAtivo} ${item.dosagem}`.trim(), item })
    }
    return lista
  } catch (e) {
    if (e.response?.status === 404) return []
    throw new Error('Não foi possível consultar a base de medicamentos. Preencha manualmente ou tente de novo.')
  }
}
