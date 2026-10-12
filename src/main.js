import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'farmacia',
    themes: {
      farmacia: {
        dark: false,
        colors: {
          primary: '#B3202A',
          secondary: '#7A1018',
          background: '#FBF3F2',
          surface: '#FFFFFF',
          error: '#8E0F17',
          success: '#2E7D5B',
          warning: '#C77700'
        }
      }
    }
  }
})

createApp(App).use(router).use(vuetify).mount('#app')
