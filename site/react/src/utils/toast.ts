import { Notification } from "@arco-design/web-react";

type TYPE_NOTIFICATION = "success" | "warning" | "error";

interface INotificationOptions {
  type?: TYPE_NOTIFICATION;
  title?: string;
  content: string;
  duration?: number;
}
export const $Notification = function ({
  title = "提示",
  content,
  duration = 2000,
  type = "success",
}: INotificationOptions) {
  return Notification[type]({
    title,
    closable: true,
    content,
    duration,
  });
};
