import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B1F33',
          light: '#0F2A44',
        },
        teal: {
          DEFAULT: '#1FA5A3',
          light: '#2ED3C6',
        },
        surface: {
          DEFAULT: '#F5F7FA',
          border: '#E6EEF5',
        },
        muted: '#C7D4DF',
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          800: '#1E293B',
          900: '#0F172A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #0B1F33, #0F2A44, #1FA5A3)',
        'hero-gradient': 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 50%, #F5F7FA 100%)',
        'dark-section': 'linear-gradient(135deg, #0B1F33, #0F2A44)',
        'parallax-gradient': 'linear-gradient(180deg, #0B1F33 0%, #1FA5A3 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
