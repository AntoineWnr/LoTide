/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Barlow Condensed"', 'Impact', 'sans-serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        ocean: {
          50: '#effbfa',
          100: '#d6f3f1',
          200: '#ade6e3',
          300: '#78d2cf',
          400: '#43b6b5',
          500: '#259a9b',
          600: '#1b7b7e',
          700: '#196266',
          800: '#184f53',
          900: '#164346',
        },
        sand: {
          50: '#fbf8f3',
          100: '#f5efe3',
          200: '#ebdec6',
          300: '#dec8a2',
          400: '#cfad7b',
          500: '#c4975f',
          600: '#b68153',
          700: '#976746',
        },
        shell: '#fdfcf9',
        navy: {
          50: '#f2f5f9',
          100: '#e1e8f0',
          200: '#c6d3e2',
          300: '#9db3cc',
          400: '#6d8bb0',
          500: '#4c6d97',
          600: '#3b567d',
          700: '#304666',
          800: '#1d2c44',
          900: '#0f1b2d',
        },
        coral: {
          50: '#fff4f1',
          100: '#ffe6df',
          200: '#ffcfc3',
          300: '#ffad99',
          400: '#ff7f63',
          500: '#f8603f',
          600: '#e5452a',
          700: '#c0361f',
        },
        success: { 50: '#ecfdf3', 500: '#16a34a', 700: '#15803d' },
        warning: { 50: '#fffbeb', 500: '#f59e0b', 700: '#b45309' },
        error: { 50: '#fef2f2', 500: '#ef4444', 700: '#b91c1c' },
      },
      keyframes: {
        wave: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        kenburns: {
          '0%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1.15)' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        wave: 'wave 3s linear infinite',
        'wave-slow': 'wave 5s linear infinite',
        kenburns: 'kenburns 20s ease-out infinite alternate',
        bob: 'bob 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
