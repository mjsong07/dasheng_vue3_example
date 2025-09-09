import { App } from 'vue'
import ElTable from './Table.vue'

export default {
  install(app: App) {
    app.component(ElTable.name, ElTable)
  }
}