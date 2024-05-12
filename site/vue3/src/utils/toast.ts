import { Notification, NotificationConfig } from "@arco-design/web-vue";

type TYPE_NOTIFICATION = "success" | "warning" | "error";

interface INotificationOptions extends NotificationConfig {
  type?: TYPE_NOTIFICATION;
}
export const $Notification = function ({
  title = "提示",
  content,
  duration = 1000,
  type = "success",
}: INotificationOptions) {
  return Notification[type]({
    title,
    content,
    duration,
  });
};
