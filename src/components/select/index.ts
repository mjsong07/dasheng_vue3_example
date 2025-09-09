import {App} from 'vue'
import ElSelect from './Select.vue'

export default {
  install(app:App){
    app.component('ElSelect',ElSelect)
  }
}

export { ElSelect }


