<template>
  <div class="list-info" v-if="todos.length">
    <text class="li-todo-count common-h2">
      <span>left {{ remaining }} {{ remaining | pluralize }} </span>
    </text>
    <input type="button"
      class="li-clear-completed"
      @click="removeCompleted"
      v-if="todos.length > remaining"
      value="Clear completed"
    >
  </div>
</template>
<script>
export default {
  filters: {
    pluralize(n) {
      return n === 1 ? 'todo' : 'todos'
    }
  },
  props: ['todos', 'remaining'],
  methods: {
    removeCompleted() {
      this.$emit('remove-completed')
    }
  }
}
</script>
<style>
  @import '../common/css/common.css';
  .list-info {
    flex-direction: column;
  }
  .li-clear-completed {
    background-color: bisque;
  }
  .li-todo-count {
    text-align: left;
    padding-left: 15px;
    border: 1px solid #666;
  }
</style>
