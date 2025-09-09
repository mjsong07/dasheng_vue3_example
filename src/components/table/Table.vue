<template>
  <div class="el-table">
    <table>
      <thead>
        <tr>
          <th 
            v-for="(column, index) in props.columns" 
            :key="index" 
            @click="handleSort(column)"
            :class="{'is-sortable': column.sortable}"
          >
            <div class="cell">
              {{ column.label }}
              <span v-if="column.sortable" class="sort-icon">
                <span 
                  class="sort-caret ascending"
                  :class="{'active': sortField.value === column.prop && sortOrder.value === 'asc'}"
                ></span>
                <span 
                  class="sort-caret descending"
                  :class="{'active': sortField.value === column.prop && sortOrder.value === 'desc'}"
                ></span>
              </span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in displayData" :key="rowIndex">
          <td v-for="(column, colIndex) in props.columns" :key="colIndex">
            <div class="cell">{{ row[column.prop] }}</div>
          </td>
        </tr>
      </tbody>
    </table>
    
    <!-- 分页组件 -->
    <div v-if="props.pagination" class="el-table__pagination">
      <button 
        class="pagination-btn prev"
        :disabled="currentPage.value === 1" 
        @click="changePage(currentPage.value - 1)"
      >
        <span class="pagination-btn-icon">«</span> 上一页
      </button>
      
      <div class="pagination-pages">
        <button 
          v-for="page in paginationPages.value" 
          :key="page" 
          :class="['pagination-btn', 'page-num', {'is-active': currentPage.value === page}]"
          @click="changePage(page)"
        >
          {{ page }}
        </button>
      </div>
      
      <button 
        class="pagination-btn next"
        :disabled="currentPage.value === totalPages.value" 
        @click="changePage(currentPage.value + 1)"
      >
        下一页 <span class="pagination-btn-icon">»</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ElTable'
}
</script>

<script setup lang="ts">
import { computed, ref, withDefaults } from 'vue'
import { useGlobalConfig } from '../../util'

interface Column {
  label: string
  prop: string
  sortable?: boolean
}

interface Props {
  data: Record<string, any>[]
  columns: Column[]
  pagination?: boolean
  pageSize?: number
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  columns: () => [],
  pagination: false,
  pageSize: 10
})

const globalConfig = useGlobalConfig()

// 排序相关
const sortField = ref('')
const sortOrder = ref('asc')

const handleSort = (column: Column) => {
  if (!column.sortable) return
  
  if (sortField.value === column.prop) {
    // 切换排序顺序
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    // 设置新的排序字段
    sortField.value = column.prop
    sortOrder.value = 'asc'
  }
}

// 排序后的数据
const sortedData = computed(() => {
  if (!sortField.value) return props.data
  
  return [...props.data].sort((a, b) => {
    const aValue = a[sortField.value]
    const bValue = b[sortField.value]
    
    if (sortOrder.value === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })
})

// 分页相关
const currentPage = ref(1)

const totalPages = computed(() => {
  return Math.ceil(sortedData.value.length / props.pageSize)
})

const displayData = computed(() => {
  if (!props.pagination) return sortedData.value
  
  const start = (currentPage.value - 1) * props.pageSize
  const end = start + props.pageSize
  
  return sortedData.value.slice(start, end)
})

// 计算要显示的页码
const paginationPages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const maxPageButtons = 5 // 最多显示的页码按钮数
  
  if (total <= maxPageButtons) {
    // 总页数小于等于最大显示数，显示所有页码
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  
  // 总页数大于最大显示数，需要计算显示哪些页码
  const halfMaxButtons = Math.floor(maxPageButtons / 2)
  
  // 当前页靠近开始
  if (current <= halfMaxButtons) {
    return Array.from({ length: maxPageButtons }, (_, i) => i + 1)
  }
  
  // 当前页靠近结束
  if (current > total - halfMaxButtons) {
    return Array.from({ length: maxPageButtons }, (_, i) => total - maxPageButtons + i + 1)
  }
  
  // 当前页在中间
  return Array.from({ length: maxPageButtons }, (_, i) => current - halfMaxButtons + i)
})

const changePage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}
</script>

<style lang="scss">
@import '../styles/mixin';

@include b(table) {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  color: $--color-text-regular;
  border: 1px solid $--border-color-lighter;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 0;
    text-align: left;
    border-bottom: 1px solid $--border-color-lighter;
    transition: background-color 0.25s ease;
    
    .cell {
      padding: 12px 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  
  th {
    background-color: $--background-color-base;
    font-weight: bold;
    position: relative;
    color: $--color-text-primary;
    
    &.is-sortable {
      cursor: pointer;
      
      &:hover {
        background-color: darken($--background-color-base, 3%);
      }
    }
    
    &:not(:last-child)::after {
      content: '';
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 60%;
      width: 1px;
      background-color: $--border-color-lighter;
    }
    
    .sort-icon {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      height: 14px;
      width: 14px;
      position: relative;
      margin-left: 5px;
      vertical-align: middle;
      
      .sort-caret {
        width: 0;
        height: 0;
        border: 5px solid transparent;
        position: absolute;
        left: 2px;
        
        &.ascending {
          border-bottom-color: #c0c4cc;
          top: -5px;
          
          &.active {
            border-bottom-color: $--color-primary;
          }
        }
        
        &.descending {
          border-top-color: #c0c4cc;
          bottom: -3px;
          
          &.active {
            border-top-color: $--color-primary;
          }
        }
      }
    }
  }
  
  tbody {
    tr {
      &:hover {
        background-color: $--background-color-base;
      }
      
      &:last-child td {
        border-bottom: none;
      }
    }
    
    td {
      transition: background-color 0.25s ease;
    }
  }
  
  &__pagination {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 15px;
    padding: 10px 0;
    
    .pagination-btn {
      padding: 6px 12px;
      margin: 0 5px;
      background-color: $--color-white;
      border: 1px solid $--border-color-base;
      border-radius: $--border-radius-base;
      cursor: pointer;
      transition: all 0.3s;
      font-size: 13px;
      
      &:hover:not(:disabled) {
        color: $--color-primary;
        border-color: $--color-primary;
      }
      
      &:disabled {
        cursor: not-allowed;
        color: $--color-text-placeholder;
        background-color: $--background-color-base;
      }
      
      &.is-active {
        color: $--color-white;
        background-color: $--color-primary;
        border-color: $--color-primary;
      }
      
      &.page-num {
        min-width: 32px;
        padding: 6px 8px;
      }
    }
    
    .pagination-pages {
      display: flex;
      margin: 0 10px;
    }
    
    .pagination-btn-icon {
      font-weight: bold;
    }
  }
}
</style>