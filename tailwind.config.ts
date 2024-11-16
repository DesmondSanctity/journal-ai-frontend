import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
module.exports = {
 darkMode: ['class'],
 content: [
  './src/pages/**/*.{ts,tsx}',
  './src/components/**/*.{ts,tsx}',
  './src/app/**/*.{ts,tsx}',
 ],
 theme: {
  extend: {
   colors: {
    border: 'hsl(var(--border))',
    input: 'hsl(var(--input))',
    ring: 'hsl(var(--ring))',
    background: 'hsl(var(--background))',
    foreground: 'hsl(var(--foreground))',
    primary: {
     DEFAULT: 'hsl(var(--primary))',
     foreground: 'hsl(var(--primary-foreground))',
    },
    secondary: {
     DEFAULT: 'hsl(var(--secondary))',
     foreground: 'hsl(var(--secondary-foreground))',
    },
   },
   borderRadius: {
    lg: 'var(--radius)',
    md: 'calc(var(--radius) - 2px)',
    sm: 'calc(var(--radius) - 4px)',
   },
   keyframes: {
    'fade-in': {
     '0%': { opacity: '0' },
     '100%': { opacity: '1' },
    },
    'slide-up': {
     '0%': { transform: 'translateY(10px)', opacity: '0' },
     '100%': { transform: 'translateY(0)', opacity: '1' },
    },
    bounce: {
     '0%, 100%': { transform: 'translateY(0)' },
     '50%': { transform: 'translateY(-25%)' },
    },
   },
   animation: {
    'fade-in': 'fade-in 0.3s ease-in-out',
    'slide-up': 'slide-up 0.4s ease-out',
    bounce: 'bounce 1s infinite',
   },
  },
 },
 plugins: [animate],
};
