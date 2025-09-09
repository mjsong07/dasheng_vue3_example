import {App} from 'vue'
import ElTree from './Tree.vue'

export default {
  install(app:App){
    app.component('ElTree',ElTree)
  }
}

export { ElTree }

