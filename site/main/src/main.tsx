import ReactDOM from "react-dom/client";
import App from "./app";
import "@arco-design/web-react/dist/css/arco.css";
import "./index.less";
import microApp from "@micro-zoe/micro-app";

microApp.start();

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
