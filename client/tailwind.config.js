/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'pixel-blue': '#59c0ff',  // The sky color from your image
        'pixel-green': {
          light: '#7bde3d',
          DEFAULT: '#4aa52e',
          dark: '#2d752b',
        },
        'pixel-yellow': '#ffc529', // For the START button
        'pixel-brown': '#754c24',  // For tree trunks
      },
      boxShadow: {
        'pixel': '4px 4px 0 rgba(0, 0, 0, 0.7)',
        'pixel-sm': '2px 2px 0 rgba(0, 0, 0, 0.7)',
      },
    },
  },
  plugins: [],
}