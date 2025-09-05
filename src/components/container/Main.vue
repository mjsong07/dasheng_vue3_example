<template>
  <main class="el-main">
    <slot />
  </main>
</template>


<script setup lang="ts">
defineOptions({
  name: 'ElHeader'
})
</script>
<style lang="scss">
@import '../styles/mixin';
@include b(main) {
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;
  padding: $--main-padding;
}

</style>