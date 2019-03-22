<template>
  <div class="page-list-item">
    <input type="checkbox" class="pli-checkbox" :checked="item.completed" @change="modifyStatus($event)">

    <text v-show="!editable" class="pli-txt" :class="item.completed ? 'pli-cross-line' : ''">{{item.title}}</text>
    <input ref="input" v-show="editable" class="pli-edit" type="text" :value="item.title" @change="modifyTitle($event)">

    <text v-show="!editable" class="pli-btn-common pli-btn-mod" @click="modifyItem">MOD</text>
    <text v-show="!editable" class="pli-btn-common pli-btn-del" @click="showHint('Lone press \'DEL\' to delete it')" @longpress="deleteItem($event)">DEL</text>

    <text v-if="editable" class="pli-btn-common pli-btn-cxl" @click="cancle">CXL</text>
    <text v-if="editable" class="pli-btn-common pli-btn-cfm" @click="confirm">CFM</text>
  </div>
</template>

<script>

import prompt from '@system.prompt'

export default {
  props: ['item'],
  data() {
    return {
      editable: false
    }
  },
  mounted() {
    this.inputDom = this.$refs.input
  },
  methods: {
    showHint (msg) {
      prompt.showToast({ message: msg })
    },
    deleteItem (e) {
      this.$emit('delete-todo', { idx: this.item.id })
    },
    modifyStatus (e) {
      this.$emit('modify-status', { idx: this.item.id, checked: e.target.checked })
    },
    modifyTitle (e) {
      this.tempString = e.target.value
    },
    modifyItem() {
      this.originTitle = this.item.title
      this.editable = !this.editable
      this.$nextTick(() => {
        this.inputDom.focus({
          focus: true
        })
      })
    },
    confirm() {
      this.editable = !this.editable
      this.$emit('modify-finish', { idx: this.item.id, value: this.tempString })
      this.inputDom.focus({
        focus: false
      })
    },
    cancle() {
      this.item.title = this.originTitle
      this.editable = !this.editable
      this.inputDom.focus({
        focus: false
      })
    }
  }
}
</script>

<style>

  .page-list-item {
    height: 100px;
    border-bottom-width: 1px;
    border-bottom-color: #ededed;
  }

  .pli-checkbox {
    flex-shrink: 0;
    width: 80px;
  }

  .pli-btn-common {
    flex-shrink: 0;
    flex-grow: 0;
    margin: 10px 5px 10px 5px;
    height: 80px;
    line-height: 80px;
    width: 95px;
    /* padding: 0 10px; */
    border-radius: 10px;
    font-size: 30px;
    color: #666666;
    text-align: center;
  }

  .pli-btn-del {
    color: #e24e42;
    background-color: #f5f5f5;
  }
  .pli-btn-mod {
    color: #008f95;
    background-color: #f5f5f5;
  }
  .pli-btn-cxl {
    color: #008f95;
    background-color: #f5f5f5;
  }
  .pli-btn-cfm {
    color: #30d607;
    background-color: #f5f5f5;
  }

  .pli-edit {
    flex-grow: 1;
    font-size: 30px;
    color: #f00;
  }
  .pli-txt {
    flex-grow: 1;
    font-size: 30px;
    color: #4d4d4d;
  }

  .pli-cross-line {
    text-decoration:line-through;
    color: #d9d9d9;
  }

</style>
