/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-dark': 'rgba(var(--main-dark), <alpha-value>)',
        'dev-dark': 'rgba(var(--), <alpha-value>)',
        green: 'rgba(var(--green), <alpha-value>)',
        red: 'rgba(var(--red), <alpha-value>)',
        blue: 'rgba(var(--blue), <alpha-value>)',
        gray: 'rgba(var(--gray), <alpha-value>)',
        orange: 'rgba(var(--orange), <alpha-value>)',
        yellow: 'rgba(var(--yellow), <alpha-value>)',
        white: 'rgba(var(--white), <alpha-value>)',
        'gray-light': 'rgba(var(--gray-light), <alpha-value>)',
        'gray-dark': 'rgba(var(--gray-dark), <alpha-value>)',
      },
    },
  },
  plugins: [],
};
