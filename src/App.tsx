import "./App.css";
import Select from "./Select";
import TypingEffect from "./Components/TypingEffect";
import { Routes, Link, Route, useSearchParams } from "react-router-dom";
import { ReactNode, useState } from "react";
import { TypingEffectProvider } from "./Context/TypingEffectProvider";

const Button = ({ children }: { children: React.ReactNode }) => (
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-1 rounded">
    {children}
  </button>
);

const FadeIn = ({
  children,
  className,
  delay = "4.5s",
  duration = "0.5s",
  ...props
}: {
  children: ReactNode;
  className?: string;
  delay?: string;
  duration?: string;
  [prop: string]: any;
}) => {
  return (
    <div
      {...props}
      className={`${className} animate-[fadeIn_${duration}_ease-in-out_${delay}_forwards] opacity-0`}
    >
      {children}
    </div>
  );
};

const Welcome = () => {
  const [rateValue, setRateValue] = useState("hourly" as string);

  return (
    <TypingEffectProvider>
      <div className="mb-2 sm:mb-6">
        <TypingEffect element="h1">Hi there!</TypingEffect>
        <br />
        <TypingEffect element="h2">
          Which of the follow best describes you?
        </TypingEffect>
      </div>
      <FadeIn className="answer">
        1. I need to figure out what to charge hourly, I'm currently on an
        annual salary.
      </FadeIn>
      <FadeIn className="answer z-10">
        2. I know my{" "}
        <Select
          items={[{ value: "hourly" }, { value: "daily" }]}
          onChange={setRateValue}
        />{" "}
        rate, what should I be putting aside?
      </FadeIn>
      <FadeIn className="mt-2 sm:mt-6 mb-2 sm:mb-6">
        <Link to="/step/1">
          <Button>1</Button>
        </Link>
        &nbsp;&nbsp;&nbsp;OR&nbsp;&nbsp;&nbsp;
        <Link to={`/step/2?rate=${rateValue}`}>
          <Button>2</Button>
        </Link>
      </FadeIn>
    </TypingEffectProvider>
  );
};

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

              <Routes>
                <Route path="/" element={<Welcome />} />

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
