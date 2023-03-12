import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { TypingEffectContext } from "../Context/TypingEffectProvider";

interface Props {
  children: string | string[];
  typingSpeed?: number;
  initialDelay?: number;
  element?: "span" | "div" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const TypingEffect = ({
  children,
  typingSpeed = 60,
  initialDelay = 5250,
  element = "p",
}: Props) => {
  const [typedText, setTypedText] = useState("");
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const mounted = useRef(false);
  const hasBeenAdded = useRef(false);
  const hasFinished = useRef(false);
  const [typingEffectValue, dispatch] = useContext(TypingEffectContext);
  const content = Array.isArray(children) ? children.join("") : children;

  useEffect(() => {
    mounted.current = true;
  }, []);

  useEffect(() => {
    if (mounted.current && !hasBeenAdded.current) {
      hasBeenAdded.current = true;
      dispatch &&
        dispatch({
          type: "ADD",
          payload: {
            text: content,
            typingSpeed,
          },
        });
    }
  }, [content, typingSpeed, dispatch]);

  /**
   * Grabs the current idex and then types that letter. Increments the index & repeats.
   */
  useLayoutEffect(() => {
    const shouldTypeThisOne =
      typingEffectValue.typingEffects.length &&
      typingEffectValue?.typingEffects[
        typingEffectValue?.currentTypingEffectIndex
      ].text === content;

    if (shouldTypeThisOne && mounted.current && !hasFinished.current) {
      setTypedText((t) => t + content.charAt(currentLetterIndex));

      if (currentLetterIndex < content.length) {
        setTimeout(() => {
          setCurrentLetterIndex(currentLetterIndex + 1);
        }, typingSpeed);
      } else {
        if (mounted.current && !hasFinished.current) {
          hasFinished.current = true;
          dispatch &&
            dispatch({
              type: "FINISHED",
              payload: {
                index: typingEffectValue.currentTypingEffectIndex,
              },
            });
        }
      }
    }
  }, [
    currentLetterIndex,
    typingSpeed,
    content,
    dispatch,
    initialDelay,
    typingEffectValue,
  ]);

  const TagName = `${element}` as keyof JSX.IntrinsicElements;

  return (
    <div className="typing-effect inline">
      <TagName className="text inline">{typedText}</TagName>
      <span className="cursor inline"></span>
    </div>
  );
};

export default TypingEffect;
