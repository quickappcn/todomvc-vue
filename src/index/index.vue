<template>
    <div class="todoapp">
      <app-header
        @add-todo="addTodo($event)"
        :todos="todos"
        :all-done="allDone"
        @all-done-change="changeAllDone($event)">
      </app-header>
      <select-box
        @change-radio="changeRadio($event)"
        :cate="cateList">
      </select-box>
      <list-info
        :todos="todos"
        :remaining="remaining"
        @remove-completed="removeCompleted($event)"
      ></list-info>
      <page-list
        :list="filteredTodos"
        @delete-todo="removeTodo($event)"
        @modify-finish="editTodo($event)"
        @modify-status="changeTodoStatus($event)">
      </page-list>
    </div>
</template>
<style>
  @import '../common/css/common.css';

  .todoapp {
    width: 100%;
    flex-direction: column;
  }

</style>

<script>
import { storageService, filters } from './service'
import pageList from '../components/page-list'
import appHeader from '../components/app-header'
import selectBox from '../components/select-box'
import listInfo from '../components/list-info'

export default {
  components: {
    pageList,
    appHeader,
    selectBox,
    listInfo
  },
  async created() {
    // 从快应用storage模块中获取数据
    this.todos = await storageService.fetch()
  },
  mounted() {
    this.$page.setTitleBar({
      text: 'todomvc'
    })
  },
  data() {
    return {
      todos: [],
      visibility: 'all',
      cateList: ['all', 'active', 'completed']
    }
  },
  onBackPress() {
    // 若为true，取消默认返回行为
    return false
  },
  watch: {
    todos: {
      handler(todos) {
        // 存储todos
        storageService.save(todos)
      },
      deep: true
    }
  },
  computed: {
    filteredTodos() {
      return filters[this.visibility](this.todos)
    },
    remaining() {
      return filters.active(this.todos).length
    },
    completed() {
      return filters.completed(this.todos).length
    },
    allDone: {
      get() {
        return this.remaining === 0 && this.completed > 0
      },
      set(value) {
        const cl = this.todos.filter(item => item.completed).length
        if (cl === this.todos.length - 1 && !value) return
        this.todos.forEach(function(todo) {
          todo.completed = value
        });
      }
    }
  },
  methods: {
    changeRadio($event) {
      this.visibility = $event.value
    },
    /**
     * 添加一个todo
     */
    addTodo($event) {
      const { value } = $event
      this.todos.unshift({
        id: storageService.uid++,
        title: value,
        completed: false
      })
    },
    /**
     * 移除掉一个todo
     */
    removeTodo($event) {
      const { idx } = $event
      const index = this.todos.findIndex(item => item.id === idx)
      this.todos.splice(index, 1)
    },
    /**
     * 修改当前todo的状态，是否是已完成
     */
    changeTodoStatus($event) {
      const { idx, checked } = $event
      const index = this.todos.findIndex(item => item.id === idx)
      this.todos[index].completed = checked
    },
    /**
     * 编辑当前todo
     */
    editTodo($event) {
      const { idx, value } = $event
      const index = this.todos.findIndex(item => item.id === idx)
      this.todos[index].title = value
    },
    /**
     * todo全选
     */
    changeAllDone($event) {
      this.allDone = $event.checked
    },
    /**
     * 删除已经完成的todos
     */
    removeCompleted() {
      this.todos = filters.active(this.todos)
    }
  }
}
</script>

