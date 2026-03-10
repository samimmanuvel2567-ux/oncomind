/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          green: '#10B981',
          dark: '#047857',
        },
        background: {
          tint: '#F0FDF4',
        },
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        neutral: '#6B7280',
        accent: {
          light: '#D1FAE5',
          lighter: '#ECFDF5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

