import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'
import Estoque from './views/Estoque.vue'
import Consulta from './views/Consulta.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'inicio', component: Home },
    { path: '/estoque', name: 'estoque', component: Estoque },
    { path: '/consulta', name: 'consulta', component: Consulta }
  ]
})
