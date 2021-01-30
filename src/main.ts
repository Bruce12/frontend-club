import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import { store, sotreKey } from './store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import { VueSvgIconPlugin, setOptions } from '@yzfe/vue3-svgicon'
import '@yzfe/svgicon/lib/svgicon.css'
import { permission } from './permission'
import svgCompoents from '@/icons'
const app = createApp(App)
app.use(store, sotreKey)
// install for vue
app.use(ElementPlus)
setOptions({
  defaultWidth: '1.2em',
  defaultHeight: '1.2em'
})
app.use(VueSvgIconPlugin, { tagName: 'icon', width: '1em' })
app.use(svgCompoents)
permission(app)
// app.config.performance = true
app.mount('#app')
