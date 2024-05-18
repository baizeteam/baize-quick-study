import ReactDOM from "react-dom/client";
import App from "./app";
import "./index.less";
import microApp from "@micro-zoe/micro-app";
import "@arco-design/web-react/dist/css/index.less";

microApp.start();

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
