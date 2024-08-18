import { createApp } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import router from './router/index'
import App from './App.vue'
import '@/style/style.scss'
import '@/assets/font/iconfont/iconfont.css'
import 'element-plus/dist/index.css'


//创建app实例
const app = createApp(App)
//创建pinia
const pinia = createPinia()
//使用pinia
app.use(pinia)
app.use(router)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
