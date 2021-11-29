import { getCurrentInstance } from 'vue'


export function useGlobalConfig(){
  const instance =getCurrentInstance()
  if(!instance){
    console.log('useGlobalConfig 必须得在setup里面整')
    return
  }
  return instance.appContext.config.globalProperties.$AILEMENTE || {}
}