import React from "react";
import Nav from "./components/Nav";
import { BrowserRouter } from "react-router-dom";
import BaseRouter from "./router";

function App():React.JSX.Element {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <div style={{ padding: "24px" }}>
          <BaseRouter />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
