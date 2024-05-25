import { makeAutoObservable, runInAction } from "mobx";

class MainUserStore {
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
      window.microApp.setGlobalData({
        origin: "main",
        data: {
          user: this.user,
        },
      });
    });
  }
}

const mainUserStore = new MainUserStore();
export default mainUserStore;
