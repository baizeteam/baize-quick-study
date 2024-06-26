import { defineStore } from "pinia";
const isMicroApp = window.__MICRO_APP_ENVIRONMENT__;

const useProjectInfoStore = defineStore("projectInfo", {
  state: function () {
    return {
      projectInfo: {
        type: '',
        desc: '',
        name: '',
        projectName: ''
      }
    };
  },
  getters: {
    getProjectInfo(state) {
      return state.projectInfo
    }
  },
  actions: {
    // 项目介绍初始化
    initData(projectInfo) {
      this.projectInfo = { ...projectInfo }
    },
    // 更新项目介绍
    updateProjectInfo(data) {
      this.projectInfo = { ...data }
      if (isMicroApp) {
        window.microApp.setGlobalData({ origin: 'vue3', data: { projectInfo: this.projectInfo }})
      }
    }
  },
});

export default useProjectInfoStore;
