import ReactDOM from "react-dom/client";
import microApp from "@micro-zoe/micro-app";
import "./index.less";
microApp.start();

const isDev = import.meta.env.DEV;
const baseUrl = isDev ? "http://localhost" : "http://localhost:3000";

const AppList = [
  {
    name: "react",
    port: "5601",
    path: "/react",
  },
  {
    name: "vue3",
    port: "5602",
    path: "/vue3",
  },
];

console.log(isDev);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div className="app-container">
    <div className="app-container-header">
      <div>mirco-app</div>
      <div>查看教程</div>
    </div>
    <div className="app-container-content">
      {AppList.map((item) => (
        <div className="app-item" key={item.name}>
          <micro-app name={item.name} url={baseUrl + (isDev ? `:${item.port}` : item.path)} iframe />
        </div>
      ))}
    </div>
  </div>,
);
