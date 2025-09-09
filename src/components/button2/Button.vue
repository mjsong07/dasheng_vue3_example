<template>
  <button
    class="el-button" 
    :class="[
      buttonSize ? `el-button--${buttonSize}` : '',
      props.type ? `el-button--${props.type}` : ''
    ]"
  >
    <slot />
  </button>
</template>


<script setup lang="ts">
defineOptions({
  name: 'ElButton2'
})


import {computed, withDefaults} from 'vue'

interface Props {
  size?:""|'small'|'medium'|'large',
  type?:""|'primary'|'success'|'danger'
}
const props = withDefaults(defineProps<Props>(),{
  size:"",
  type:""
})
const buttonSize =  props.size
</script>


 

<style lang="scss">
// ====== 设计 Token（类似 Element Plus 的设计变量）======
$--color-white: #ffffff;
$--color-primary: #409eff;
$--color-success: #67c23a;
$--color-danger: #f56c6c;
$--color-warning: #e6a23c;

$--button-padding-vertical: 12px;
$--button-padding-horizontal: 24px;
$--button-font-size: 14px;
$--button-border-radius: 4px;

$--button-small-padding-vertical: 8px;
$--button-small-padding-horizontal: 16px;
$--button-small-font-size: 12px;

$--button-large-padding-vertical: 16px;
$--button-large-padding-horizontal: 32px;
$--button-large-font-size: 16px;
// ========== Button Block ==========
.el-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  // border: 1px solid transparent;
  border-radius: $--button-border-radius;
  font-size: $--button-font-size;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
  outline: none;
  background: #fff;
  color: #606266;
  padding: $--button-padding-vertical $--button-padding-horizontal;

  // 禁用状态 Modifier
  &.el-button--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: #f5f7fa;
    color: #c0c4cc;
    border-color: #e4e7ed;
  }

  // 基础变体：primary
  &.el-button--primary {
    background-color: $--color-primary;
    color: $--color-white;
    border-color: $--color-primary;

    &:hover {
      background-color: darken($--color-primary, 10%);
      border-color: darken($--color-primary, 10%);
    }
  }

  // 基础变体：success
  &.el-button--success {
    background-color: $--color-success;
    color: $--color-white;
    border-color: $--color-success;

    &:hover {
      background-color: darken($--color-success, 10%);
      border-color: darken($--color-success, 10%);
    }
  }

  // 基础变体：danger
  &.el-button--danger {
    background-color: $--color-danger;
    color: $--color-white;
    border-color: $--color-danger;

    &:hover {
      background-color: darken($--color-danger, 10%);
      border-color: darken($--color-danger, 10%);
    }
  }

  // ========== 尺寸 Modifier ==========

  // 小尺寸
  &.el-button--small {
    font-size: $--button-small-font-size;
    padding: $--button-small-padding-vertical $--button-small-padding-horizontal;
  }

  // 大尺寸
  &.el-button--large {
    font-size: $--button-large-font-size;
    padding: $--button-large-padding-vertical $--button-large-padding-horizontal;
  }
}
</style>