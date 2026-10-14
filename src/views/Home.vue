<script setup>
import { computed } from 'vue'
import { medicamentos, vencido, ESTOQUE_BAIXO, formatarData, formatarPreco } from '../services/storage'

const total = computed(() => medicamentos.value.length)
const vencidos = computed(() => medicamentos.value.filter((m) => vencido(m.validade)))
const baixos = computed(() => medicamentos.value.filter((m) => m.quantidade < ESTOQUE_BAIXO))

const alertasCriticos = computed(() => {
  const lista = []
  medicamentos.value.forEach(m => {
    if (vencido(m.validade)) lista.push({ ...m, motivo: 'Vencido', cor: 'error' })
    else if (m.quantidade < ESTOQUE_BAIXO) lista.push({ ...m, motivo: 'Estoque Baixo', cor: 'warning' })
  })
  return lista.slice(0, 5)
})
</script>

<template>
  <div>
    <!-- Cabeçalho -->
    <div class="mb-6">

      <p class="text-body-2 text-medium-emphasis">Acompanhe as métricas de estoque, validades e produtos críticos da unidade.</p>
    </div>

    <!-- Cards de Métricas / KPIs -->
    <v-row class="mb-6">
      <v-col cols="12" sm="4">
        <v-card class="pa-4 border" elevation="0">
          <div class="d-flex align-center justify-space-between mb-2">
            <span class="text-overline text-medium-emphasis font-weight-bold">Total em Catálogo</span>
            <v-avatar color="primary" variant="tonal" size="38">
              <v-icon icon="mdi-pill" size="20" />
            </v-avatar>
          </div>
          <div class="text-h4 font-weight-bold text-primary">{{ total }}</div>
          <div class="text-caption text-medium-emphasis mt-1">itens cadastrados no sistema</div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="4">
        <v-card class="pa-4 border" elevation="0">
          <div class="d-flex align-center justify-space-between mb-2">
            <span class="text-overline text-medium-emphasis font-weight-bold">Itens Vencidos</span>
            <v-avatar color="error" variant="tonal" size="38">
              <v-icon icon="mdi-calendar-alert" size="20" />
            </v-avatar>
          </div>
          <div class="text-h4 font-weight-bold text-error">{{ vencidos.length }}</div>
          <div class="text-caption text-medium-emphasis mt-1">necessitam de descarte imediato</div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="4">
        <v-card class="pa-4 border" elevation="0">
          <div class="d-flex align-center justify-space-between mb-2">
            <span class="text-overline text-medium-emphasis font-weight-bold">Estoque Baixo</span>
            <v-avatar color="warning" variant="tonal" size="38">
              <v-icon icon="mdi-package-down" size="20" />
            </v-avatar>
          </div>
          <div class="text-h4 font-weight-bold text-warning">{{ baixos.length }}</div>
          <div class="text-caption text-medium-emphasis mt-1">quantidade menor que {{ ESTOQUE_BAIXO }} unidades</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Ações e Alertas Críticos -->
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="pa-4 border h-100" elevation="0">
          <h2 class="text-subtitle-1 font-weight-bold mb-4">Acesso Rápido</h2>
          
          <v-btn to="/estoque" block color="primary" size="large" prepend-icon="mdi-plus" class="mb-3">
            Gerenciar / Novo Produto
          </v-btn>

          <v-btn to="/consulta" block variant="outlined" color="primary" size="large" prepend-icon="mdi-magnify">
            Buscar no Catálogo
          </v-btn>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <v-card class="pa-4 border h-100" elevation="0">
          <div class="d-flex align-center justify-space-between mb-3">
            <h2 class="text-subtitle-1 font-weight-bold">Atenção Necessária</h2>
            <v-btn to="/consulta" variant="text" size="small" color="primary">Ver todos</v-btn>
          </div>

          <v-table v-if="alertasCriticos.length" density="compact">
            <thead>
              <tr>
                <th>Medicamento</th>
                <th>Qtd.</th>
                <th>Validade</th>
                <th>Alerta</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in alertasCriticos" :key="item.id">
                <td class="font-weight-medium">{{ item.nome }} <span class="text-caption text-medium-emphasis">({{ item.dosagem }})</span></td>
                <td>{{ item.quantidade }}</td>
                <td>{{ formatarData(item.validade) }}</td>
                <td>
                  <v-chip :color="item.cor" size="x-small" label>{{ item.motivo }}</v-chip>
                </td>
              </tr>
            </tbody>
          </v-table>

          <div v-else class="text-center py-6 text-medium-emphasis">
            <v-icon icon="mdi-check-circle-outline" color="success" size="36" class="mb-2" />
            <div class="text-body-2">Nenhum item com estoque baixo ou vencido no momento.</div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>