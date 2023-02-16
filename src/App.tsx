import "./App.css";
import Select from "./Select";
import TypingEffect, { TypingEffectProvider } from "./Components/TypingEffect";

const Button = ({ children }: { children: React.ReactNode }) => (
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-1 rounded">
    {children}
  </button>
);

function App() {
  return (
    <TypingEffectProvider>
      <div className="App">
        <div className="title">Wage Calculator</div>
        <div>
          <TypingEffect initialDelay={500}>Hi there!</TypingEffect>
          <br />
          <TypingEffect initialDelay={1500}>
            Which of the follow best describes you?
          </TypingEffect>
        </div>
        <div className="answer">
          1. I need to figure out what to charge hourly, I'm currently on an
          annual salary.
        </div>
        <div className="answer">
          2. I know my{" "}
          <Select items={[{ value: "hourly" }, { value: "daily" }]} /> rate,
          what should I be putting aside?
        </div>
        <div className="mt-6">
          <Button>Begin</Button>
        </div>
      </div>
    </TypingEffectProvider>
  );
}
export default App;
