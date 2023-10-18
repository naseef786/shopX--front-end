/** @type {import('tailwindcss').Config} */
export default {
  content: [  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {'blueColor':'#2a68ff',
    'grewIsh' : '#f1f4f8',
    'CardShasow':'#f7f8f9',
    'textColor' :'#252b36'},
  },
  plugins: [],
}

