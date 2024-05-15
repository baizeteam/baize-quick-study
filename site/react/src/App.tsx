import React from "react";
import Nav from "./components/Nav";
import { BrowserRouter } from "react-router-dom";
import BaseRouter from "./router";
import "./app.module.less";

function App(): React.JSX.Element {
  return (
    <>
      <BrowserRouter>
        <div styleName="app-container">
          <Nav />
          <div styleName="content">
            <BaseRouter />
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
