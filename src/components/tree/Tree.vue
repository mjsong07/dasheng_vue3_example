<template>
  <div class="el-tree">
    <ul class="el-tree__nodes">
      <TreeNode
        v-for="(node, index) in normalizedData"
        :key="index"
        :node="node"
        :default-expand-all="defaultExpandAll"
        @node-click="onNodeClick"
      >
        <template #node="slotProps">
          <slot name="node" v-bind="slotProps">{{ slotProps.node.label }}</slot>
        </template>
      </TreeNode>
    </ul>
  </div>
  
</template>

<script lang="ts">
export default {
  name: 'ElTree'
}
</script>

<script setup lang="ts">
import {computed, defineEmits, defineProps, PropType} from 'vue'
import TreeNode from './TreeNode.vue'

interface TreeNodeData {
  label: string
  children?: TreeNodeData[]
  disabled?: boolean
  [key: string]: unknown
}

const emit = defineEmits<{
  (e: 'node-click', node: TreeNodeData): void
}>()

const props = defineProps({
  data: {
    type: Array as PropType<TreeNodeData[]>,
    default: () => []
  },
  labelKey: {
    type: String,
    default: 'label'
  },
  childrenKey: {
    type: String,
    default: 'children'
  },
  defaultExpandAll: {
    type: Boolean,
    default: false
  }
})

const normalizedData = computed<TreeNodeData[]>(() => {
  return (props.data || []).map((n) => normalizeNode(n))
})

function normalizeNode(node: TreeNodeData): TreeNodeData {
  const children = (node as any)[props.childrenKey] as TreeNodeData[] | undefined
  const label = (node as any)[props.labelKey] as string
  const normalized: TreeNodeData = {
    ...node,
    label,
    children: children ? children.map((c) => normalizeNode(c)) : undefined
  }
  return normalized
}

function onNodeClick(node: TreeNodeData) {
  emit('node-click', node)
}
</script>

<style scoped>
.el-tree {
  font-size: 14px;
}
.el-tree__nodes {
  list-style: none;
  margin: 0;
  padding-left: 12px;
}
.el-tree-node__content {
  display: flex;
  align-items: center;
  cursor: pointer;
  line-height: 22px;
}
.el-tree-node__expand-icon {
  display: inline-block;
  width: 14px;
  text-align: center;
  margin-right: 4px;
  color: #909399;
}
.el-tree-node__expand-icon.is-expanded {
  transform: rotate(90deg);
}
.el-tree-node__expand-icon.is-leaf {
  visibility: hidden;
}
.el-tree-node__label {
  color: #606266;
}
</style>

