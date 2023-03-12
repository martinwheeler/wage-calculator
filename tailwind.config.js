/** @type {import('tailwindcss').Config} */

function spacing(max, number) {
  const scale = {};

  for (let i = 0; i <= max * number; i++) {
    const value = i / number;
    scale[value] = `${value}rem`;
  }

  return scale;
}

function increments(max, number) {
  const scale = [];

  for (let i = 0; i <= max * number; i++) {
    const value = i / number;
    scale.push(value);
  }

  return scale;
}

const allSpacings = spacing(100, 4);

const allIncrements = increments(10, 4);
const fadeInAnimations = allIncrements
  .map((current) => `animate-[fadeIn_${current}s_ease-in-out_delay_forwards]`)
  .reduce((result, currentAnimationName) => {
    return [
      ...result,
      ...allIncrements.map((current) =>
        currentAnimationName.replace("delay", `${current}s`)
      ),
    ];
  }, []);

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: allSpacings,
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out 0s",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
  safelist: fadeInAnimations,
};
