/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f9f5f1',
          100: '#f0e6dc',
          200: '#e2cdb9',
          300: '#d2af8f',
          400: '#c49169',
          500: '#b67a4c',
          600: '#a46540',
          700: '#864f36',
          800: '#6c4030',
          900: '#5b362c',
          950: '#321b16',
        },
        accent: {
          50: '#f1fcf7',
          100: '#d3f8e8',
          200: '#a7efd2',
          300: '#73dfb6',
          400: '#39c794',
          500: '#1fa979',
          600: '#188962',
          700: '#176e4f',
          800: '#175741',
          900: '#144736',
          950: '#0a2a20',
        },
      },
      fontFamily: {
        sans: [
          'Nunito Sans',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        display: [
          'Playfair Display',
          'Georgia',
          'serif',
        ],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'hover': '0 10px 40px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};