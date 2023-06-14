import { useState } from "react";
import { TypingEffectProvider } from "../../Context/TypingEffectProvider";
import TypingEffect from "../TypingEffect";
import { Link } from "react-router-dom";
import { FadeIn } from "../FadeIn/fade-in"
import { Button } from "../Button/button"
import Select from "../../Select";

export const WelcomeMessage = () => {
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