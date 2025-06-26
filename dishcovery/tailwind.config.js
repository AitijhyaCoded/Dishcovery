/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        yellowTheme: '#F9DD96',
        redTheme: '#AC2E2D',
        textColor: '#1E1E1E',
        bgColor: '#FFFCF8'
      },
      fontFamily: {
        playpen: ["'Playpen Sans'", "cursive"],
      },
    },
  },
  plugins: [],
}

