<template>
  <div class="title align-center">
    <span class="text">{{ title }}</span>
    <span class="radius flex-center">{{ radius }}</span>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    required: true,
    type: String
  },
  radius: {
    required: true,
    type: Number
  }
})
</script>

<style lang="less" scoped>
.title {
  margin: 20px 0;
  .text {
    font-weight: 600;
    font-size: 25px;
  }
  .radius {
    margin-left: 4px;
    width: 30px;
    height: 30px;
    background: #ffffff;
    color: #333333;
    border-radius: 50%;
  }
}
</style>
