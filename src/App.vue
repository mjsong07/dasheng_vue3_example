

<template>
  <div>
    <el-button
      v-for="example in compExamples"
      :key="example"
      :type="comp==example?'success':'primary'"
      @click="comp=example"
    >
      {{ example }}
    </el-button>
  </div>

  <div v-if="comp=='form'">
    <el-form
      ref="myForm"
      :model="model"
      :rules="rules"
    >
      <el-form-item
        label="用户名："
        prop="username"
      >
        <el-input v-model="model.username" />
      </el-form-item>
      <el-form-item
        label="密码："
        prop="password"
      >
        <el-input
          v-model="model.password"
          type="password"
        />
      </el-form-item>
      <br>
      <el-form-item>
        <el-button
          type="primary"
          @click="login"
        >
          登 录
        </el-button>
      </el-form-item>
    </el-form>
  </div>

  <div v-if="comp=='button'">
    <br>
    <el-button >
      默认按钮
    </el-button> 
    <el-button type="primary">
      primary按钮
    </el-button>
    <el-button type="success">
      success按钮
    </el-button>
    <el-button>默认尺寸按钮</el-button>
    <el-button size="small">
      small按钮
    </el-button>
  </div>


  <div v-if="comp=='button2'">
      <br>
    <el-button2 >
      默认按钮
    </el-button2> 
    <el-button2 type="primary">
      primary按钮
    </el-button2>
    <el-button2 type="success">
      success按钮
    </el-button2> 
    <el-button2 size="small">
      small按钮
    </el-button2>
  </div>

  <div v-if="comp=='container'">
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
    <hr>

    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          Aside
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
    <hr>
    <el-container>
      <el-aside width="200px">
        Aside
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>

  <div v-if="comp=='tree'">
    <el-tree
      :data="treeData"
      default-expand-all
      @node-click="onTreeClick"
    >
      <template #node="{ node }">
        <span>{{ node.label }}</span>
      </template>
    </el-tree>
  </div>

  <div v-if="comp=='select'">
    <el-select v-model="selected" :options="selectOptions" placeholder="请选择一个选项" />
    <el-select v-model="selected" :options="selectOptions" placeholder="请选择一个选项22" />
    <div style="margin-top: 8px;">当前值：{{ selected }}</div>
  </div>

  <div v-if="comp=='table'">
    <el-table :data="tableData" :columns="tableColumns" pagination></el-table>
  </div>
    <div v-if="comp=='input'">
    <el-input 
        label="用户名（小号）"
        placeholder="紧凑布局"
        size="small"
      />
       <el-input 
        label="用户名（大号）"
        placeholder="宽松布局"
        size="large"
      />
  </div>
</template>
<script setup lang="ts">
import {ref,reactive} from 'vue'
const comp = ref('form')
import {FormType} from './components/form/type'

const compExamples = ref(['container','button','button2','form','dialog','tree','select','table','input'])

const showDialog = ref<boolean>(false)

const input1 = ref('')
const model = reactive({
  username: "",
  password: "",
})

const rules = reactive({
  username: [
    {
      required: true,
      message: "请输入用户名！",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码！",
    },
  ],
})

// 获取表单实例
const myForm = ref<FormType>()
const login = () => {
  myForm.value?.validate((isValid) => {
    if (isValid) {
      console.log(model)
    } else {
      alert("请正确填写表单！")
    }
  })
}

const selected = ref<string | number | null>(null)
const selectOptions = [
  { label: '选项一', value: 1 },
  { label: '选项二', value: 2 },
  { label: '选项三', value: 3 }
]

const treeData = [
  {
    label: 'Level one 1',
    children: [
      { label: 'Level two 1-1' },
      { label: 'Level two 1-2', children: [{ label: 'Level three 1-2-1' }] }
    ]
  },
  { label: 'Level one 2' }
]
function onTreeClick(node:{ label: string; children?: Array<any> }){
  console.log('tree click:', node)
}

// 表格组件示例数据
const tableData = [
  { id: 1, name: '张三', age: 25, address: '北京市朝阳区' },
  { id: 2, name: '李四', age: 30, address: '上海市浦东新区' },
  { id: 3, name: '王五', age: 28, address: '广州市天河区' },
  { id: 4, name: '赵六', age: 32, address: '深圳市南山区' },
  { id: 5, name: '钱七', age: 27, address: '杭州市西湖区' },
  { id: 6, name: '孙八', age: 35, address: '成都市武侯区' },
  { id: 7, name: '周九', age: 29, address: '南京市鼓楼区' },
  { id: 8, name: '吴十', age: 31, address: '武汉市洪山区' },
]

const tableColumns = [
  { label: 'ID', prop: 'id', sortable: true },
  { label: '姓名', prop: 'name', sortable: true },
  { label: '年龄', prop: 'age', sortable: true },
  { label: '地址', prop: 'address' }
]
</script>
<style>

body{
  width:1000px;
  margin:10px auto;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
