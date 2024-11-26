import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        opening: {
          '0%': {
            opacity: '0.2',
          },
          '5%': {
            transform: 'rotate(0deg) ',
            opacity: '1',
          },
          '25%': {
            transform: 'rotate(90deg) ',
            opacity: '1',
          },
          '40%': {
            transform: 'rotate(0deg) ',
            opacity: '1',
          },
          '41%': {
            opacity: '0.2',
          },
          '50%': {
            opacity: '0',
          },
          '100%': {
            opacity: '0',
          },
        },
        moveLeft: {
          '0%': {},
          '50%': {
            transform: 'translate(0, 0)',
          },
          '100%': {
            transform: 'translate(-50vh, 0)',
          },
        },
        moveRight: {
          '0%': {},
          '50%': {
            transform: 'translate(0, 0)',
          },
          '100%': {
            transform: 'translate(50vh, 0)',
          },
        },
      },
      animation: {
        opening: 'opening 3s ease-in-out',
        moveLeft: 'moveLeft 2.5s ease',
        moveRight: 'moveRight 2.5s ease',
      },
      height: {
        mapSize: '95vh',
      },
      colors: {
        'blue-500': '#3b82f6',
        'gray-500': '#6b7280',
        'gray-600': '#4b5563',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
};
export default config;
