<script lang="ts" setup>
import useUserStore from "@/store/user.ts";
const userStore = useUserStore();
</script>

<template>
  <div>
    <a-input
      style="margin-bottom: 12px; width: 200px"
      v-model="userStore.user.name"
      @input="(value) => userStore.updateUserInfo('name', value)"
    >
      <template #prepend>名字</template>
    </a-input>
  </div>
  <div>
    <a-input
      style="margin-bottom: 12px; width: 200px"
      v-model="userStore.user.age"
      @input="(value) => userStore.updateUserInfo('age', value)"
    >
      <template #prepend>年龄</template>
    </a-input>
  </div>
  <code-demo />
</template>
