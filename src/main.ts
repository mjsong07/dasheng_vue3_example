import { createApp } from 'vue'
import App from './App.vue'
import ElContainer from './components/container'
import ElButton from './components/button'
import ElButton2 from './components/button2/index'
import ElForm from './components/form'
import ElTree from './components/tree'
import ElSelect from './components/select'
import ElTable from './components/table'
import ElInput from './components/input'

const app = createApp(App)
app.config.globalProperties.$AILEMENTE = {
  size:'large'
}
app.use(ElContainer)
  .use(ElButton)
  .use(ElButton2)
  .use(ElForm)
  .use(ElTree)
  .use(ElSelect)
  .use(ElTable)
  .use(ElInput)
  .mount('#app')
