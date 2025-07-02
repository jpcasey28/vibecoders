/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'background': '#2f3136',
        'foreground': '#2b2b2b',
        'primary': '#4f46e5',
        'primary-focus': '#4338ca',
        'secondary': '#10b981',
        'text-primary': '#ffffff',
        'text-secondary': '#a1a1aa',
        'border': '#3f3f46',
      }
    },
  },
  plugins: [],
}