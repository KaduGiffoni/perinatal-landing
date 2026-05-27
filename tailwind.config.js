/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // ADICIONE ESTAS DUAS CHAVES ABAIXO
      animation: {
        "slow-move": "slow-move 20s ease-in-out infinite",
        "slow-move-reverse": "slow-move-reverse 25s ease-in-out infinite",
      },
      keyframes: {
        "slow-move": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(30px, 40px) scale(1.05)" },
        },
        "slow-move-reverse": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-30px, -40px) scale(0.95)" },
        },
      },
    },
  },
  plugins: [],
};
