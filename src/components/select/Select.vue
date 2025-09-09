<template>
  <div class="el-select" :class="{ 'is-disabled': disabled }">
    <div class="el-select__trigger" @click="toggle" :class="{ 'is-open': open }">
      <span class="el-select__placeholder" v-if="!selectedLabel">{{ placeholder }}</span>
      <span class="el-select__selected" v-else>{{ selectedLabel }}</span>
      <span class="el-select__icon">▼</span>
    </div>
    <ul v-show="open" class="el-select__dropdown">
      <li
        v-for="opt in options"
        :key="opt.value"
        class="el-select__option"
        :class="{ 'is-selected': opt.value === modelValue }"
        @click.stop="select(opt.value)"
      >
        {{ opt.label }}
      </li>
      <li v-if="!options.length" class="el-select__empty">无数据</li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ElSelect'
}
</script>

<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref} from 'vue'

interface OptionItem {
  label: string
  value: string | number
}

const props = defineProps<{
  modelValue?: string | number | null
  options: OptionItem[]
  placeholder?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: string | number | null): void
  (e: 'change', v: string | number | null): void
}>()

const open = ref(false)

function toggle() {
  if (props.disabled) return
  open.value = !open.value
}

function onClickOutside(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.closest('.el-select')) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))

function select(v: string | number) {
  if (props.disabled) return
  emit('update:modelValue', v)
  emit('change', v)
  open.value = false
}

const selectedLabel = computed(() => {
  const found = props.options.find(o => o.value === props.modelValue)
  return found ? found.label : ''
})

const placeholder = computed(() => props.placeholder ?? '请选择')
const disabled = computed(() => !!props.disabled)
</script>

<style scoped>
.el-select { position: relative; display: inline-block; width: 180px; }
.el-select__trigger {
  display: flex; align-items: center; justify-content: space-between;
  border: 1px solid #dcdfe6; padding: 6px 10px; border-radius: 4px; cursor: pointer;
  background: #fff; color: #606266;
}
.el-select.is-disabled .el-select__trigger { cursor: not-allowed; background: #f5f7fa; color: #c0c4cc; }
.el-select__placeholder { color: #c0c4cc; }
.el-select__icon { font-size: 12px; color: #909399; margin-left: 8px; }
.el-select__dropdown {
  position: absolute; z-index: 1000; top: 36px; left: 0; right: 0;
  background: #fff; border: 1px solid #e4e7ed; border-radius: 4px; padding: 4px 0;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); max-height: 200px; overflow: auto;
}
.el-select__option { padding: 6px 12px; cursor: pointer; color: #606266; }
.el-select__option:hover { background: #f5f7fa; }
.is-selected { color: #409eff; background: #ecf5ff; }
.el-select__empty { padding: 8px 12px; color: #c0c4cc; text-align: center; }
</style>


