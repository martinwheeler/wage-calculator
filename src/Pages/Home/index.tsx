import { useState } from "react";
import { Link } from "react-router-dom";
import { NumericFormat } from "react-number-format";

import { TypingEffectProvider } from "../../Context/TypingEffectProvider";
import TypingEffect from "../../Components/TypingEffect";
import { FadeIn } from "../../Components/FadeIn/fade-in";
import { Button } from "../../Components/Button/button";
import Select from "../../Components/Select/select";

import "./Home.scss";

const Home = () => {
  const [rateValue, setRateValue] = useState("hour");
  const [isDirty, setIsDirty] = useState(false);

  const handleSetDirty = (...props: any) => {
    console.log("set dirty", props);
    setIsDirty(true);
  };
  const handleSetRateValue = (...props: any) => {
    console.log("set rate value", props);
    handleSetDirty();
    setRateValue.apply(this, props);
  };

  return (
    <div className="welcome-message-container">
      <TypingEffectProvider>
        <div className="mb-2 sm:mb-6">
          <TypingEffect element="h1">Welcome, fellow freelancer.</TypingEffect>
          <br />
          <TypingEffect element="h1">
            This calculator is designed to help you divvy up your
          </TypingEffect>
          <br />
          <TypingEffect element="h1">
            income into different buckets so you're ready
          </TypingEffect>
          <br />
          <TypingEffect element="h1">
            for anything life throws at you.
          </TypingEffect>
          <br />
          <TypingEffect element="h5">
            (tax, super, sick days and even a quick vaycay)
          </TypingEffect>
        </div>
        <FadeIn delay="9s" className="answer">
          I charge{" "}
          <NumericFormat
            className="welcome-input"
            value={0}
            thousandSeparator=","
            prefix={"$"}
            onChange={handleSetDirty}
          />
          per&nbsp;{" "}
          <Select
            items={[{ value: "hour" }, { value: "day" }]}
            onChange={handleSetRateValue}
          />
          &nbsp; and work{" "}
          <NumericFormat
            className="welcome-input"
            value={0}
            thousandSeparator=","
            prefix={"$"}
            onChange={handleSetDirty}
          />{" "}
          &nbsp;
          <Select
            items={[{ value: "hour" }, { value: "day" }]}
            onChange={handleSetRateValue}
          />
          &nbsp; per&nbsp;{" "}
          <Select
            items={[{ value: "hour" }, { value: "day" }]}
            onChange={handleSetRateValue}
          />
          {isDirty && (
            <FadeIn delay="0s">
              <div className="mt-2 sm:mt-6 mb-2 sm:mb-6">
                <Link to={`/step/2?rate=${rateValue}`}>
                  <Button>Divvy Up</Button>
                </Link>
              </div>
            </FadeIn>
          )}
        </FadeIn>
      </TypingEffectProvider>
    </div>
  );
};

export default Home;
