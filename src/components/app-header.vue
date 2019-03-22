<template>
  <div class="app-header">
    <text class="common-h1">todos</text>
    <div class="new-todo" :class="dynamicClass">
      <input type="checkbox" :checked="allDone" @change="changeAll($event)">
      <input
        placeholder="What needs to be done?"
        v-model="newTodo"
        type="text"
        @focus="updateClass('input-focus')"
        @blur="updateClass('')"
        class="input-text"
        ref="input"
      >
      <input class="btn-add" type="button" :disabled="disabled" value="ADD" @click="addTodo"/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodo: '',
      dynamicClass: '',
      disabled: true
    }
  },
  props: ['todos', 'all-done'],
  mounted() {
    this.inputDom = this.$refs.input
  },
  watch: {
    newTodo(n) {
      // 监听v-model内newTodo变化的值，然后进行更新操作
      this.updateValue(n)
    }
  },
  methods: {
    /**
     * 触发事件：添加一个todo
     */
    addTodo() {
      var value = this.newTodo && this.newTodo.trim()
      if (!value) {
        return
      }
      this.$emit('add-todo', { value })
      this.newTodo = ''
    },
    /**
     * 更新value操作
     */
    updateValue(n) {
      if (!n) {
        this.disabled = true
      } else {
        this.disabled = false
      }
    },
    /**
     * 更新class
     */
    updateClass(v) {
      this.dynamicClass = v
    },
    /**
     * 触发事件：全选操作
     */
    changeAll(e) {
      this.$emit('all-done-change', { checked: e.target.checked })
    }
  }
}
</script>

<style>
  @import '../common/css/common.css';

  .app-header {
    display: flex;
    flex-direction: column;
  }

  .app-header > text {
    color: #ead7d7;
  }

  .app-header .new-todo {
    height: 100px;
    border: 2px solid #ededed;
    background-color: #ffffff;
  }

  .app-header .new-todo .input-text {
    flex-grow: 1;
    padding: 0 30px; 
  }

  .app-header .new-todo .btn-add {
    flex-shrink: 0;
    width: 150px;
    font-weight: normal;
    color: #FFFFFF;
    background-color: #f78f8f;
  }

  .app-header .new-todo .btn-add:disabled {
    background-color: #ead7d7;
  }

  .app-header .input-focus {
    border-color: #ead7d7;
  }
</style>
