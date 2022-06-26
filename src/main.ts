import { createApp } from 'vue'
import App from './App.vue'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import { myPlugin } from './util/plugin'

const app = createApp(App)
app.use(myPlugin)
app.mount('#app')
