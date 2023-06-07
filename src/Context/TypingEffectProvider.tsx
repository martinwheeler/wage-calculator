import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { finished } from "stream";

const initialData = {
  typingEffects: [] as TypingEffects[],
  currentTypingEffectIndex: 0,
  totalTimeTyping: 0,
};

export const TypingEffectContext = createContext<
  [
    {
      typingEffects: TypingEffects[];
      currentTypingEffectIndex: number;
      totalTimeTyping: number;
    },
    Dispatch<any>
  ]
>([
  {
    typingEffects: [],
    currentTypingEffectIndex: 0,
    totalTimeTyping: 0,
  },
  () => {},
]);

const typingEffectReducer = (
  state: {
    typingEffects: TypingEffects[];
    currentTypingEffectIndex: number;
    totalTimeTyping: number;
  },
  action: any
) => {
  switch (action.type) {
    case "INCREMENT_EFFECT_INDEX":
      return {
        ...state,
        currentTypingEffectIndex:
          state.currentTypingEffectIndex < state.typingEffects.length - 1
            ? state.currentTypingEffectIndex + 1
            : state.currentTypingEffectIndex,
      };

    case "ADD":
      // Don't add the same typing effect twice
      if (
        state.typingEffects.findIndex((t) => t.text === action.payload.text) >
        -1
      ) {
        return state;
      } else {
        const { typingSpeed, text } = action.payload;
        const duration = ((text.length * typingSpeed) / 1000) as number;
        const roundedDuration = Math.ceil(duration / 0.25) * 0.25;

        return {
          ...state,
          typingEffects: [
            ...state.typingEffects,
            {
              ...action.payload,
              finished: false,
              // Convert to nearest quarter second
              duration: roundedDuration,
            },
          ],
          totalTimeTyping: state.totalTimeTyping + roundedDuration,
        };
      }

    case "FINISHED":
      // Don't mark the same typing effect as finished twice
      if (action.payload.index === -1) {
        return state;
      } else {
        return {
          ...state,
          currentTypingEffectIndex:
            state.currentTypingEffectIndex < state.typingEffects.length - 1
              ? state.currentTypingEffectIndex + 1
              : state.currentTypingEffectIndex,
          typingEffects: state.typingEffects.map((t, i) => {
            if (i === action.payload.index) {
              return {
                ...t,
                finished: true,
              };
            } else {
              return t;
            }
          }),
        };
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
  const [
    { typingEffects, currentTypingEffectIndex, totalTimeTyping },
    dispatch,
  ] = useReducer(typingEffectReducer, initialData);

  return (
    <TypingEffectContext.Provider
      value={[
        {
          typingEffects,
          currentTypingEffectIndex: currentTypingEffectIndex,
          totalTimeTyping,
        },
        dispatch,
      ]}
    >
      {children}
    </TypingEffectContext.Provider>
  );
};

export const useTypingEffect = (): [typeof initialData, Dispatch<any>] => {
  const [typingEffectValue, dispatch] = useContext(TypingEffectContext);

  return [typingEffectValue, dispatch];
};

interface TypingEffects {
  text: string;
  typingSpeed: number;
  finished: boolean;
  duration: number;
}
