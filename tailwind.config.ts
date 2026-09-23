import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0a0f1d',
        surface: {
          DEFAULT: '#111a2e',
          raised: '#16213a',
          hover: '#1e2d4f',
        },
        cyan: {
          glow: '#00f0ff',
        },
        emerald: {
          glow: '#10b981',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'serif'],
        mono: ['Consolas', 'Menlo', 'Monaco', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 20px -5px rgba(14, 165, 233, 0.3)',
        'glow-emerald': '0 0 20px -5px rgba(16, 185, 129, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
