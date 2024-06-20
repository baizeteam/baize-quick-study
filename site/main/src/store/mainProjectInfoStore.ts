import { makeAutoObservable, runInAction } from "mobx";

class MainProjectInfoStore {
    projectInfo = {
        type: '',
        name: '',
        projectName: '',
        desc: ''
    };

    constructor() {
        makeAutoObservable(this)
    }

    initData(data) {
        runInAction(() => {
            this.projectInfo = { ...data }
        })
    }

    updateProjectInfo(data) {
        runInAction(() => {
            this.projectInfo = { ...data }
            window.microApp.setGlobalData({ origin: "main", data: { projectInfo: this.projectInfo } })
        })
    }
}

const mainProjectInfoStore = new MainProjectInfoStore();
export default mainProjectInfoStore;
