
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 1.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      colors: {
        purple: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#641ba3",
          800: "#4a1772",
          900: "#2f0553",
        },
        red: {
          50: "#fef2f2",
          600: "#dc2626",
          800: "#511111",
        },
        green: {
          600: "#0d9488",
        },
      },
      screens: {
      xs: '360px',
      sm: '640px',     
      md: '768px',     
      lg: '1024px',   
      xl: '1280px',  
    },
    },
  },
  plugins: [],
}