<script lang="ts" setup>
import { ref } from 'vue';
import { getProjectInfo } from '@/api/project.ts';
import { $Notification } from "@/utils/toast.ts";
import useProjectInfoStore from "@/store/projectInfo.ts";

const loading = ref(false);
const projectInfoStore = useProjectInfoStore();

const getMockData = function () {
  loading.value = true
  getProjectInfo({}).then((res: any) => {
    const { data, code }  = res;
    if (code !== 200) {
      $Notification({ content: '请求数据失败，请检查问题!', type: 'error' });
    } else {
      loading.value = false;
      projectInfoStore.updateProjectInfo(data);
      $Notification({ content: '请求数据成功!' });
    }
  }).catch(error => {
    $Notification({ content: '请求数据失败，请检查问题!', type: 'error' });
  })
   
}
</script>

<template>
  <a-spin :loading="loading" tip="Loading...">
    <a-button type="primary" @click="getMockData">点击按钮请求数据</a-button>
    <div>
      <div>
        <span class="title">团队名称：</span>
        <span>{{ projectInfoStore.projectInfo.name }}</span>
      </div>
      <div>
        <span class="title">项目名称：</span>
        <span>{{ projectInfoStore.projectInfo.projectName }}</span>
      </div>
      <div>
        <span class="title">项目描述：</span>
        <span>{{ projectInfoStore.projectInfo.desc }}</span>
      </div><div>
        <span class="title">当前数据来源：</span>
        <span>{{ projectInfoStore.projectInfo.type }}</span>
      </div>
    </div>
  </a-spin>
</template>

