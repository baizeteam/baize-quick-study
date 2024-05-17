import { MicroApp } from "@micro-zoe/micro-app";

declare global {
  interface Window {
    microApp: MicroApp;
  }
}

export {};
