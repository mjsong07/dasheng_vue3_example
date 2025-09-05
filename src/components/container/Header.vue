<template>
  <header
    class="el-header"
    :style="{ height }"
  >
    <slot />
  </header>
</template>

<script setup lang="ts">
import {withDefaults} from 'vue'
defineOptions({
  name: 'ElHeader'
})
interface Props {
  height?:string
}
withDefaults(defineProps<Props>(),{
  height:"60px"
})

</script>

<style lang="scss">
@import '../styles/mixin';
@include b(header) {
  padding: $--header-padding;
  box-sizing: border-box;
  flex-shrink: 0;
}

</style>