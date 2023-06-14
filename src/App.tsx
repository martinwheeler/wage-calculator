import "./App.css";
import Select from "./Select";
import TypingEffect from "./Components/TypingEffect";
import { Routes, Link, Route, useSearchParams } from "react-router-dom";
import { ReactNode, useState } from "react";
import { TypingEffectProvider } from "./Context/TypingEffectProvider";
import { FadeIn } from "./Components/FadeIn/fade-in";
import { WelcomeMessage } from "./Components/WelcomeMessage/welcome-message";
import { Header } from "./Components/ Header/header"




const StepOne = () => {
  const [annualSalary, setAnnualSalary] = useState<number | undefined>();
  return (
    <TypingEffectProvider>
      <div>
        <TypingEffect>I see, so you are on an annual salary.</TypingEffect>
        <br />
        <br />
        <TypingEffect>How much do you make per year?</TypingEffect>
        <br />
        <br />
        <FadeIn>
          <input type='number' value={annualSalary} onChange={(event) => { setAnnualSalary(parseInt(event.target.value)) }} className='salary-input' />
        </FadeIn>
      </div>
    </TypingEffectProvider>
  )
}

const StepTwo = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  console.log(searchParams);

  return (
    <TypingEffectProvider>
      <div>
        <TypingEffect>
          Great! So you are currently being paid{" "}
          {searchParams.get("rate") as string}.
        </TypingEffect>
        <br />
        <br />
        <TypingEffect>
          How much super would you normally put aside?
        </TypingEffect>
        <br />
        <br />
        <FadeIn delay="6s">Form goes here</FadeIn>
      </div>
    </TypingEffectProvider>
  );
}

function App() {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <>
            <div className="App px-2">
              <div className="title mt-2 sm:mt-6">Wage Calculator</div>
              <Header />
              <Routes>
                <Route path="/" element={<WelcomeMessage />} />

                <Route path="/step/1" element={<StepOne />} />

                <Route path="/step/2" element={<StepTwo />} />
              </Routes>
            </div>
          </>
        }
      ></Route>
    </Routes>
  );
}
export default App;
