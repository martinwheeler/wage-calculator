import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { calculatePay } from "./utils";
import FinanceDataInput from "./Components/FinanceDataInput/FinanaceDataInput"

function App() {


  return (
    <div className="App">
      {/* <header className="App-header">{calculatePay(750, 10, 27, 40.55)}</header> */}


      <div className="Finance-form"><FinanceDataInput label="Type here" type="number" required={true}/></div>

    </div>
  );
}
export default App;
