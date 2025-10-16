import { tailwindConfig } from '@byte24/ui/tailwind.config';
import type { Config } from 'tailwindcss';

// We want each package to be responsible for its own content.
const config: Omit<Config, 'content'> = {
  presets: [tailwindConfig],

  darkMode: ['class'],
  // presets: [require('@byte24/ui/tailwind.config.ts')],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
    '../../node_modules/@byte24/ui/dist/esm/src/**/*.{js,ts,jsx,tsx}',
    '../../node_modules/@byte24/ui/dist/cjs/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      body: ['var(--font-serif)'],
      mono: ['var(--font-mono)'],
    },
   
  },

  prefix: '',
  plugins: [
    require('tailwindcss-animate'),
    require('tailwind-scrollbar')({ preferredStrategy: 'pseudoelements' }),
  ],
};

export default config;
