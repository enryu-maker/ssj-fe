/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-color': '#994e4f',
        'secondary-color': '#f2e9e9',
        'light-bg-color': '#f5f3f2',
      },
      fontFamily: {
        Raleway: ['"Open Sans", sans-serif'],
      },
    },
  },
  plugins: [],
};
