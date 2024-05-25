import { defineStore } from "pinia";
const isMicroApp = window.__MICRO_APP_ENVIRONMENT__;

const useUserStore = defineStore("user", {
  state: function () {
    return {
      user: {
        name: "",
        age: null,
      },
    };
  },
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  actions: {
    // 数据初始化
    initData(userInfo) {
      this.user = { ...userInfo };
    },

    // 更新用户信息
    updateUserInfo(key, value) {
      this.user[key] = value;
      if (isMicroApp) {
        // 微前端环境下，更新全局数据
        window.microApp.setGlobalData({ origin: "vue3", data: { user: this.user } });
      }
    },
  },
});

export default useUserStore;
