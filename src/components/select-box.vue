<template>
  <div class="select-box">
    <div class="sb-radio-item" v-for="(item, index) in cate" :key="index">
      <input type="radio" :id="item" :value="item" :checked="init === item" @change="changeRadio($event)">
      <label :target="item" class="sb-radio-label">{{item}}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: ['cate'],
  data() {
    return {
      init: this.cate && this.cate[0] || 'all'
    }
  },
  methods: {
    changeRadio($event) {
      this.$emit('change-radio', {
        value: $event.target.value
      })
    }
  }
}
</script>

<style>
  .sb-radio-item {
    flex: 1;
    flex-grow: 1;
  }

  .sb-radio-label {
    flex-grow: 1;
  }
</style>
