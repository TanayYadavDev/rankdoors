import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          maroon: '#722F37',
          'maroon-hover': '#5F272E',
          'maroon-dark-hover': '#8A3B44',
          header: '#451E24',
          'header-dark': '#38161C',
        },
        darkbg: '#0F172A',
      },
      transitionDuration: {
        300: '300ms',
      },
    },
  },
  plugins: [],
};

export default config;
