import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react";

interface Props {
  children: string;
  typingSpeed?: number;
  initialDelay?: number;
}

interface TypingEffectProps {
  text: string;
  typingSpeed: number;
  finished: boolean;
}

const TypingEffectContext = createContext<
  [TypingEffectProps[], React.Dispatch<any>] | []
>([]);

const initialTypingEffects: TypingEffectProps[] = [];

const typingEffectReducer = (state: TypingEffectProps[], action: any) => {
  switch (action.type) {
    case "ADD":
      // Don't add the same typing effect twice
      if (state.findIndex((t) => t.text === action.payload.text) > -1) {
        return state;
      } else {
        return [...state, { ...action.payload, finished: false }];
      }
    case "FINISHED":
      const index = state.findIndex(
        (t) => t.text === action.payload.text && !t.finished
      );
      // Don't mark the same typing effect as finished twice
      if (index === -1) {
        console.log("Already finished");
        return state;
      } else {
        console.log("Marking as finished");
        return state.map((t, i) => {
          if (i === index) {
            return {
              ...t,
              finished: true,
            };
          } else {
            return t;
          }
        });
      }
    default:
      return state;
  }
};

export const TypingEffectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [typingEffects, dispatch] = useReducer(
    typingEffectReducer,
    initialTypingEffects
  );

  return (
    <TypingEffectContext.Provider value={[typingEffects, dispatch]}>
      {children}
    </TypingEffectContext.Provider>
  );
};

/**
 * TODO:
 *
 * 1. Store a list of all the typing effects
 * 2. Delay each subsequent typing effect by the time it takes to show the previous one
 * 3. Add a prop which allows pausing the typing effect at the end of the current one
 *
 * @param param0
 * @returns
 */
const TypingEffect = ({
  children,
  typingSpeed = 60,
  initialDelay = 5250,
}: Props) => {
  const [typedText, setTypedText] = useState("");
  const [i, setI] = useState(0);
  const mounted = useRef(false);
  const [typingEffects, dispatch] = useContext(TypingEffectContext);

  useEffect(() => {
    mounted.current = true;
  }, []);

  useEffect(() => {
    const hasBeenAdded =
      Number(typingEffects?.findIndex((t) => t?.text === children)) > -1;

    if (mounted.current && !hasBeenAdded) {
      setTimeout(() => {
        // dispatch &&
        //   dispatch({
        //     type: "ADD",
        //     payload: {
        //       text: children,
        //       typingSpeed,
        //     },
        //   });
      }, initialDelay);
    }
  }, [children, typingSpeed, dispatch]);

  useLayoutEffect(() => {
    if (mounted.current && i >= 1) {
      setTypedText((t) => t + children.charAt(i - 1));
    }

    if (i === 0) {
      setTimeout(() => {
        setI(i + 1);
      }, initialDelay);
    } else if (i < children.length) {
      setTimeout(() => {
        setI(i + 1);
      }, typingSpeed);
    } else {
      dispatch &&
        dispatch({
          type: "FINISHED",
          payload: {
            text: children,
          },
        });
    }
  }, [i, typingSpeed, children, dispatch]);

  return (
    <div className="typing-effect inline">
      <p className="text inline">{typedText}</p>
      <span className="cursor inline"></span>
    </div>
  );
};

export default TypingEffect;
