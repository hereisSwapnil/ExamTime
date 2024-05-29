/** @type {import('tailwindcss').Config} */
import { skeleton } from "@skeletonlabs/tw-plugin";

export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), skeleton],
};
