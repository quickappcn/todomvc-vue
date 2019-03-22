<template>
  <div class="page-list">
    <page-list-item 
    @delete-todo="deleteTodo($event)"
    @modify-status="modifyStatus($event)"
    @modify-finish="modifyFinish($event)"
     v-for="(todo, index) in list" :key="todo.id" :idx="index" :item="todo"></page-list-item>
  </div>
</template>

<script>
import pageListItem from './page-list-item'
export default {
  components: {
    pageListItem
  },
  props: ['list'],
  methods: {
    deleteTodo($event) {
      this.$emit('delete-todo', $event)
    },
    modifyStatus($event) {
      this.$emit('modify-status', $event)
    },
    modifyFinish($event) {
      this.$emit('modify-finish', $event)
    }
  }
}
</script>

<style>
  .page-list {
    flex-direction: column;
  }
</style>
