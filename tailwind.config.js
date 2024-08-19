/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom utilities to hide scrollbars
      scrollbar: ['none'], // Optional: If using a scrollbar plugin
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          /* Hide scrollbar in Chrome, Safari, and Opera */
          '-webkit-scrollbar': 'none',
          /* Hide scrollbar in Internet Explorer and Edge */
          '-ms-overflow-style': 'none',
          /* Hide scrollbar in Firefox */
          'scrollbar-width': 'none',
        },
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
      })
    },
  ],
}
