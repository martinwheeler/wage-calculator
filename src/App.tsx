import "./App.css";
import Select from "./Select";
import TypingEffect from "./Components/TypingEffect";
import { Routes, Link, Route, useSearchParams } from "react-router-dom";
import { useContext, useState } from "react";
import {
  TypingEffectProvider,
  useTypingEffect,
} from "./Context/TypingEffectProvider";
import FadeIn from "./Components/FadeIn";
import Button from "./Components/Button";

const Welcome = () => {
  const [rateValue, setRateValue] = useState("hourly" as string);
  const [{ totalTimeTyping }, _] = useTypingEffect();

  return (
    <>
      <div className="mb-2 sm:mb-6">
        <TypingEffect element="h1">Hi there!</TypingEffect>
        <br />
        <TypingEffect element="h2">
          Which of the follow best describes you?
        </TypingEffect>
      </div>
      <FadeIn className="answer" delay={totalTimeTyping}>
        1. I need to figure out what to charge hourly, I'm currently on an
        annual salary.
      </FadeIn>
      <FadeIn className="answer z-10" delay={totalTimeTyping}>
        2. I know my{" "}
        <Select
          items={[{ value: "hourly" }, { value: "daily" }]}
          onChange={setRateValue}
        />{" "}
        rate, what should I be putting aside?
      </FadeIn>
      <FadeIn className="mt-2 sm:mt-6 mb-2 sm:mb-6" delay={totalTimeTyping}>
        <Link to="/step/1">
          <Button>1</Button>
        </Link>
        &nbsp;&nbsp;&nbsp;OR&nbsp;&nbsp;&nbsp;
        <Link to={`/step/2?rate=${rateValue}`}>
          <Button>2</Button>
        </Link>
      </FadeIn>
    </>
  );
};

const StepOne = () => {
  const [{ totalTimeTyping }, _] = useTypingEffect();

  console.log(totalTimeTyping);

  return (
    <div>
      <TypingEffect>I see, so you are on an annual salary.</TypingEffect>
      <br />
      <br />
      <TypingEffect>How much do you make per year?</TypingEffect>
      <br />
      <br />
      <FadeIn delay={totalTimeTyping}>Form Goes here</FadeIn>
    </div>
  );
};

const StepTwo = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [{ totalTimeTyping }, _] = useTypingEffect();

  console.log(totalTimeTyping);

  return (
    <div>
      <TypingEffect>
        Great! So you are currently being paid{" "}
        {searchParams.get("rate") as string}.
      </TypingEffect>
      <br />
      <br />
      <TypingEffect>How much super would you normally put aside?</TypingEffect>
      <br />
      <br />
      <FadeIn delay={totalTimeTyping}>Form goes here</FadeIn>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <>
            <div className="App px-2">
              <div className="title mt-2 sm:mt-6">Wage Calculator</div>

              <Routes>
                <Route
                  path="/"
                  element={
                    <TypingEffectProvider>
                      <Welcome />
                    </TypingEffectProvider>
                  }
                />

                <Route
                  path="/step/1"
                  element={
                    <TypingEffectProvider>
                      <StepOne />
                    </TypingEffectProvider>
                  }
                />

                <Route
                  path="/step/2"
                  element={
                    <TypingEffectProvider>
                      <StepTwo />
                    </TypingEffectProvider>
                  }
                />
              </Routes>
            </div>
          </>
        }
      ></Route>
    </Routes>
  );
}
export default App;
