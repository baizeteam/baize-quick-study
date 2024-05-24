import ReactDOM from "react-dom/client";
import App from "./app";
import "./index.less";
import microApp from "@micro-zoe/micro-app";

microApp.start({
  inline: import.meta.env.DEV,
  "keep-alive": true, // 好像没有效果
});

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
