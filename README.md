# baize-quick-study

这个项目旨在为各位有React 或者 Vue基础的同学，快速学习未掌握的React 或者 Vue框架。

整体项目是以micro-app微前端框架作为底子，以main（react）作为主模块，react、vue3两个子模块。

为了能够更加友好的学习另外一个框，因此我们尽量将react和vue3两个子模块的结构保持一致（可能会与您日常开发中的规范有些许不一致）。

通过这个项目，我们希望你可以掌握以下知识的基本使用方式

React

> - react hooks
> - react-router
> - mobx
> - arco-design

Vue

> - vue 组合式api
> - vue-router
> - pinia
> - acro-design

微前端

> - micro-app的初始化
> - micro-app的路由控制
> - micro-app全局数据处理

vite

> - 自定义插件

## 开始

必须使用pnpm，因为使用pnpm-workspace来对多个项目进行更加友好的管理。使用npm or yarn那么您将还需要进入到子项目中进行安装。

```
pnpm i
```

启动命令如下，启动后可通过http://localhost:5600 进行访问

```
pnpm run dev
```


## TODO
[] 接入driver.js
[] 请求模块接入mock+axios
