import { MicroApp } from "@micro-zoe/micro-app";

declare global {
  interface Window {
    microApp: MicroApp;
    __MICRO_APP_ENVIRONMENT__: boolean;
  }
}

export {};
