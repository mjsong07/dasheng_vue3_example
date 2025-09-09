<template>
  <li class="el-tree-node">
    <div class="el-tree-node__content" @click.stop="onClick">
      <span
        class="el-tree-node__expand-icon"
        :class="{ 'is-expanded': isExpanded, 'is-leaf': !hasChildren }"
        @click.stop="toggle"
      >
        ▶
      </span>
      <span class="el-tree-node__label">
        <slot name="node" :node="node">{{ node.label }}</slot>
      </span>
    </div>
    <ul v-if="hasChildren && isExpanded" class="el-tree__nodes">
      <TreeNode
        v-for="(child, idx) in node.children"
        :key="idx"
        :node="child"
        :default-expand-all="defaultExpandAll"
        @node-click="$emit('node-click', $event)"
      >
        <template #node="slotProps">
          <slot name="node" v-bind="slotProps" />
        </template>
      </TreeNode>
    </ul>
  </li>
</template>

<script lang="ts">
export default {
  name: 'TreeNode'
}
</script>

<script setup lang="ts">
import {computed} from 'vue'
import TreeNode from './TreeNode.vue'

interface TreeNodeData {
  label: string
  children?: TreeNodeData[]
  [key: string]: unknown
}

const props = defineProps<{
  node: TreeNodeData
  defaultExpandAll?: boolean
}>()

const emit = defineEmits<{
  (e: 'node-click', node: TreeNodeData): void
}>()

const hasChildren = computed(() => Array.isArray(props.node.children) && props.node.children.length > 0)
const isExpanded = computed({
  get() { return !!(props as any)._isExpanded || !!props.defaultExpandAll },
  set(v: boolean) { (props as any)._isExpanded = v }
})

function toggle() {
  if (!hasChildren.value) return
  isExpanded.value = !isExpanded.value
}

function onClick() {
  emit('node-click', props.node)
}
</script>

<style scoped>
.el-tree-node { list-style: none; }
</style>


