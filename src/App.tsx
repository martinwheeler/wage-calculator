import "./App.css";
import Select from "./Select";
import { calculatePay } from "./utils";
import FinanceDataInput from "./Components/FinanceDataInput/FinanaceDataInput"

function App() {
  return (
    <div className="App">
      <div className="title">Wage Calculator</div>
      <div className="question">Which one are you?</div>
      <div className="answer">
        1. I need to figure out what to charge hourly, I'm currently on an
        annual salary.
      </div>
      <div className="answer">
        2. I know my{" "}
        <Select items={[{ value: "hourly" }, { value: "daily" }]} /> rate, what
        should I be putting aside?
      </div>
      <header className="total">
        {calculatePay(750, 10, 27, 40.55).toFixed(2)}
      </header>
    </div>
  );
}
export default App;
