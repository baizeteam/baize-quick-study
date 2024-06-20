
import type { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/api/mock/project/info', // 模拟获取当前项目信息的链接
    method: 'get',
    timeout: 500,
    statusCode: 200, // 返回状态码
    response() {
      return {
        code: 200,
        message: '请求成功！',
        data: {
          name: 'baize-team',
          type: '来自Vue中模拟的数据',
          projectName: 'baize-quick-study',
          desc: '为各位有React或者Vue基础的同学，快速学习未掌握的React或者Vue框架'
        }
      }
      
    }
  }
] as MockMethod[]