import {App} from 'vue'
import ElButton2 from './Button.vue'

export default {
  install(app:App){
    app.component(ElButton2.name,ElButton2)
  }
}