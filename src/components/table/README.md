# ElTable 表格组件

一个功能完善的表格组件，支持数据展示、排序和分页功能。

## 基本用法

```vue
<template>
  <el-table :data="tableData" :columns="tableColumns"></el-table>
</template>

<script setup>
import { ref } from 'vue'

const tableData = [
  { id: 1, name: '张三', age: 25, address: '北京市朝阳区' },
  { id: 2, name: '李四', age: 30, address: '上海市浦东新区' },
  // 更多数据...
]

const tableColumns = [
  { label: 'ID', prop: 'id' },
  { label: '姓名', prop: 'name' },
  { label: '年龄', prop: 'age' },
  { label: '地址', prop: 'address' }
]
</script>
```

## 带排序功能

通过设置 `sortable` 属性可以对列进行排序：

```vue
<template>
  <el-table :data="tableData" :columns="tableColumns"></el-table>
</template>

<script setup>
import { ref } from 'vue'

const tableData = [
  { id: 1, name: '张三', age: 25, address: '北京市朝阳区' },
  { id: 2, name: '李四', age: 30, address: '上海市浦东新区' },
  // 更多数据...
]

const tableColumns = [
  { label: 'ID', prop: 'id', sortable: true },
  { label: '姓名', prop: 'name', sortable: true },
  { label: '年龄', prop: 'age', sortable: true },
  { label: '地址', prop: 'address' }
]
</script>
```

## 带分页功能

通过设置 `pagination` 和 `pageSize` 属性可以启用分页功能：

```vue
<template>
  <el-table 
    :data="tableData" 
    :columns="tableColumns" 
    pagination 
    :pageSize="5"
  ></el-table>
</template>

<script setup>
import { ref } from 'vue'

const tableData = [
  { id: 1, name: '张三', age: 25, address: '北京市朝阳区' },
  { id: 2, name: '李四', age: 30, address: '上海市浦东新区' },
  // 更多数据...
]

const tableColumns = [
  { label: 'ID', prop: 'id', sortable: true },
  { label: '姓名', prop: 'name', sortable: true },
  { label: '年龄', prop: 'age', sortable: true },
  { label: '地址', prop: 'address' }
]
</script>
```

## 属性

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 表格数据 | Array | [] |
| columns | 表格列配置 | Array | [] |
| pagination | 是否启用分页 | Boolean | false |
| pageSize | 每页显示条数 | Number | 10 |

## 列配置

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 列标题 | String | - |
| prop | 对应列内容的字段名 | String | - |
| sortable | 是否可排序 | Boolean | false |