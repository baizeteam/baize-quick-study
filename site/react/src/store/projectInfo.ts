import { makeAutoObservable, runInAction } from 'mobx'
const isMicroApp = window.__MICRO_APP_ENVIRONMENT__;

class ProjectInfoStore {
    projectInfo = {
        name: '',
        type: '',
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
            if (isMicroApp) {
                // 微前端环境下，更新全局数据
                window.microApp.setGlobalData({ origin: "react", data: { projectInfo: this.projectInfo } })
            }
        })
    }

}

const projectInfoStore = new ProjectInfoStore();
export default projectInfoStore;