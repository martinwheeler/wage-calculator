import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

interface Props {
  children: string;
  minSpeed?: number;
  maxSpeed?: number;
}

const TypingEffect = ({ children, minSpeed = 50, maxSpeed = 100 }: Props) => {
  const [typedText, setTypedText] = useState("");
  const [i, setI] = useState(0);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
  }, []);

  useLayoutEffect(() => {
    const delay = Math.floor(
      Math.random() * (maxSpeed - minSpeed + 1) + minSpeed
    );

    if (mounted.current) {
      setTypedText((t) => t + children.charAt(i));
    }

    if (i < children.length) {
      setTimeout(() => {
        setI(i + 1);
      }, delay);
    }
  }, [i, maxSpeed, minSpeed, children]);

  return (
    <div className="typing-effect">
      <p className="text">{typedText}</p>
      <span className="cursor"></span>
    </div>
  );
};

export default TypingEffect;
