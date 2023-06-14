import { useState } from "react";
import { TypingEffectProvider } from "../../Context/TypingEffectProvider";
import TypingEffect from "../TypingEffect";
import { Link } from "react-router-dom";
import { FadeIn } from "../FadeIn/fade-in"
import { Button } from "../Button/button"
import Select from "../Select/select";
import './welcome-message.scss'
import { NumericFormat } from 'react-number-format';


export const WelcomeMessage = () => {
    const [rateValue, setRateValue] = useState("hour" as string);

    return (
        <div className='welcome-message-container'>
            <TypingEffectProvider>
                <div className="mb-2 sm:mb-6">
                    <TypingEffect element="h1">
                        Welcome, fellow freelancer.
                    </TypingEffect>
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
                <FadeIn className="answer">
                    I charge {" "}
                    <NumericFormat
                        className='welcome-input'
                        value={0}
                        thousandSeparator=","
                        prefix={'$'}
                    />
                    per&nbsp;{" "}
                    <Select
                        items={[{ value: "hour" }, { value: "day" }]}
                        onChange={setRateValue}
                    />
                    &nbsp; and work {" "}
                    <NumericFormat
                        className='welcome-input'
                        value={0}
                        thousandSeparator=","
                        prefix={'$'}
                    />
                    {" "} &nbsp;
                    <Select
                        items={[{ value: "hour" }, { value: "day" }]}
                        onChange={setRateValue}
                    />&nbsp; per&nbsp;{" "}
                    <Select
                        items={[{ value: "hour" }, { value: "day" }]}
                        onChange={setRateValue}
                    />
                </FadeIn>
                <FadeIn className="mt-2 sm:mt-6 mb-2 sm:mb-6">
                    {/* &nbsp;&nbsp;&nbsp;OR&nbsp;&nbsp;&nbsp; */}
                    <Link to={`/step/2?rate=${rateValue}`}>
                        <Button>Divvy Up</Button>
                    </Link>
                </FadeIn>
            </TypingEffectProvider>
        </div>
    );
};