/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'main-blue': "var(--main-blue)",
        'lighter-blue': "var(--lighter-blue)",
        'modal-black': 'rgba(0,0,0,0.4)',
      }
    },
  },
  plugins: [],
}
