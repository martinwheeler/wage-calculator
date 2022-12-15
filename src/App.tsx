import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { calculatePay } from "./utils";

function App() {
  return (
    <div className="App">
      <header className="App-header">{calculatePay(750, 10, 27, 40.55)}</header>
    </div>
  );
}

export default App;
