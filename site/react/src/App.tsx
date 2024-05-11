import React from "react";
import Nav from "./components/Nav";
import { BrowserRouter } from "react-router-dom";
import BaseRouter from "./router";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <BaseRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
