import {driver} from "driver.js";

const driverObj = driver({
    showProgress: true,
    steps: [
        { element: ".head-input", popover: { title: "第一步", description: "首先输入需要完成的项目" } },
        {
            element: ".item",
            popover: { title: "第二步", description: "该项目会出现在列表里" },
        },
        { element: ".finish", popover: { title: "第三步", description: "如果需要完成该项目，点击完成按钮" } },
        { element: ".list", popover: { title: "第四步", description: "您可以查看所有的待办清单状态" } },
        { element: ".undo", popover: { title: "第五步", description: "您也可以查看待办的数量" } },
        { element: ".head-input", popover: { title: "最后", description: "来试一试吧!" } },
    ],
});

driverObj.drive();
class Device {
    constructor() {
    }
}

class DriverStore{
    behavior: 'vue' | 'react'
    route: any
    constructor() {
        const device = new Device()
        this.behavior = 'vue'
        this.route = '' // tab栏
        console.log(this.behavior, this.route)
    }
}