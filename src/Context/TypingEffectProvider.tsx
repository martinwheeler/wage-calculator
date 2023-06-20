import { createContext, useEffect, useReducer, useRef } from "react";
import { finished } from "stream";

interface TypingEffects {
  text: string;
  typingSpeed: number;
  finished: boolean;
  duration?: number;
}

export const TypingEffectContext = createContext<
  [
    { typingEffects: TypingEffects[]; currentTypingEffectIndex: number },
    React.Dispatch<any>
  ]
>([
  {
    typingEffects: [],
    currentTypingEffectIndex: 0,
  },
  () => {},
]);

const initialData = {
  typingEffects: [] as TypingEffects[],
  currentTypingEffectIndex: 0,
};

const tapLog = (data: any) => {
  console.log(data);
  return data;
};

const typingEffectReducer = (
  state: { typingEffects: TypingEffects[]; currentTypingEffectIndex: number },
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
        return tapLog({
          ...state,
          typingEffects: [
            ...state.typingEffects,
            {
              ...action.payload,
              finished: false,
              duration: text.length - 1 * typingSpeed,
            },
          ],
        });
      }

    case "FINISHED":
      // Don't mark the same typing effect as finished twice
      if (action.payload.index === -1) {
        return state;
      } else {
        // console.log("Marking as finished", action.payload.index);
        return {
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
  const [{ typingEffects, currentTypingEffectIndex }, dispatch] = useReducer(
    typingEffectReducer,
    initialData
  );

  //   useEffect(() => {
  //     // Once one is finished go to the next one
  //     if (
  //       typingEffects.length &&
  //       typingEffects[currentTypingEffectIndex].finished
  //     ) {
  //       dispatch("INCREMENT_EFFECT_INDEX");

  //       console.log(currentTypingEffectIndex);
  //     }
  //   }, [typingEffects]);

  //   console.log({ indexToType: currentTypingEffectIndex });

  return (
    <TypingEffectContext.Provider
      value={[
        {
          typingEffects,
          currentTypingEffectIndex: currentTypingEffectIndex,
        },
        dispatch,
      ]}
    >
      {children}
    </TypingEffectContext.Provider>
  );
};
