<template>
  <br>
  <div :class="['el-input',`el-input--${size}`]">
    <div class="el-input__wrapper">
      <label v-if="label" class="el-input__label" >
        {{ label }}
      </label>
      <input 
        :placeholder="placeholder"
        :disabled="disabled"
        :size="size"
        class="el-input__inner"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'

defineOptions({
  name: 'ElInput'
}) 
interface Props {
  modelValue: string
  label?: string
  placeholder?: string
  disabled?: boolean
  size?: 'large' | 'default' | 'small' // 支持 size
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请输入内容',
  disabled: false,
  size: 'default', // 默认尺寸
}) 
 
</script>

<style scoped>
/* ===== BEM 命名规范样式（前缀 el-）===== */

.el-input {
  width: 100%; 
  line-height:normal;
}

/* 带标签的输入框外层容器 */
.el-input__wrapper {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

/* 默认尺寸的标签 */
.el-input__label {
  font-size: 14px;
  color: #606266;
  font-weight: 500;
  min-width: fit-content;
}

/* 默认尺寸的 wrapper 容器间距 */
.el-input__wrapper {
  gap: 8px;
}

/* ===== 尺寸变体：large ===== */
.el-input--large {
line-height: 24px;
}

.el-input--large .el-input__label {
  font-size: 18px; 
  font-weight: 500;
}

/* ===== 尺寸变体：small ===== */
.el-input--small {
line-height: 14px;
}

.el-input--small .el-input__label {
  font-size: 12px; 
  font-weight: 500;
}
 
.el-input__inner {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
}

.el-input--large .el-input__inner {
 line-height: 1.5;
}
.el-input--small .el-input__inner {
  line-height: 0.9;
}
 
</style>
 