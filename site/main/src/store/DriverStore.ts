import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export type TYPE_FLAG = "vue" | "react";
class Device {
  constructor() {}
  apiUse() {}
  baseUse(type: TYPE_FLAG) {
    const container = document.getElementById(type + "-app")!;
    const element = function (classname) {
      const dom = container.querySelector(classname);
      // console.log(dom,'dom');
      return dom;
    };
    const driverObj = driver({
      showProgress: true,
      steps: [
        { popover: { title: "第一步", description: "首先输入需要完成的项目" }, element: element(".head-input") },
        {
          popover: { title: "第一步", description: "点击添加该项目" },
          element:
            type === "react"
              ? element(".head-input .arco-react-input-search-btn")
              : element(".head-input .arco-input-append"),
        },
        {
          popover: { title: "第一步", description: "该项目会出现在列表里，你也可以进行删除操作" },
          element: element(".list"),
        },
        { popover: { title: "第一步", description: "赶快来试一试吧!" }, element: element(".head-input") },
      ],
    });

    driverObj.drive();
  }
  lifeCycle() {}
  storeUse() {}
}

class DriverStore {
  route: any;
  constructor(type: TYPE_FLAG) {
    const device = new Device();
    this.route = ""; // tab栏
    device.baseUse(type); // 先写死, 之后变成第一次更换tab栏时也有对应的引导
  }
}

export default DriverStore;
