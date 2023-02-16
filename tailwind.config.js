/** @type {import('tailwindcss').Config} */

function spacing(max, number) {
  const scale = {};

  for (let i = 0; i <= max * number; i++) {
    const value = i / number;
    scale[value] = `${value}rem`;
  }

  return scale;
}

const allSpacings = spacing(100, 4);

// console.log(allSpacings);

debugger;

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: allSpacings,
    },
  },
  plugins: [],
};
