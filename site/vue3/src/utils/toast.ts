import {Notification} from "@arco-design/web-vue";

type TYPE_NOTIFICATION = 'success' | 'warning' | 'error'
export const $Notification = function({title='提示', content, duration=1000,type = 'success'}:{title: string, content: string, duration: number, type: TYPE_NOTIFICATION}){
  return Notification[type]({
    title, content, duration
  })
}
