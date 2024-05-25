import { makeAutoObservable, runInAction } from "mobx";
const isMicroApp = window.__MICRO_APP_ENVIRONMENT__;

class UserStore {
  user = {
    name: "",
    age: null,
  };

  constructor() {
    makeAutoObservable(this);
  }

  // 数据初始化
  initData(userInfo) {
    runInAction(() => {
      this.user = { ...userInfo };
    });
  }

  // 更新用户信息
  updateUserInfo(key, value) {
    runInAction(() => {
      this.user[key] = value;
      if (isMicroApp) {
        // 微前端环境下，更新全局数据
        window.microApp.setGlobalData({ origin: "react", data: { user: this.user } });
      }
    });
  }
}

const userStore = new UserStore();
export default userStore;
