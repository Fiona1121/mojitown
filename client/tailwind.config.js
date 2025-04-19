/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pixel': ['"Silkscreen"', 'cursive'],
      },
      borderWidth: {
        '3': '3px',
      },
      boxShadow: {
        'pixel': '3px 3px 0 rgba(0, 0, 0, 1)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backgroundImage: {
        'cloud-pattern': "url('/src/assets/cloud-pattern.png')",
        'grass-pattern': "url('/src/assets/grass-pattern.png')",
      },
    },
  },
  plugins: [],
}