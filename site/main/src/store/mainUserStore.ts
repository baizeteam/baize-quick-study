import { makeAutoObservable, runInAction } from "mobx";

class MainUserStore {
  user = {
    name: "",
    age: null,
  };

  constructor() {
    makeAutoObservable(this);
  }

  initData(userInfo) {
    runInAction(() => {
      this.user = userInfo;
    });
  }

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
