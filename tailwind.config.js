/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        'surface-3': 'var(--surface-3)',
        ink: 'var(--ink)',
        'ink-2': 'var(--ink-2)',
        'ink-3': 'var(--ink-3)',
        'ink-4': 'var(--ink-4)',
        border: 'var(--border)',
        accent: 'var(--accent)',
        'accent-2': 'var(--accent-2)',
        teal: 'var(--teal)',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Geist', '"Space Grotesk"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
      },
      boxShadow: {
        s1: 'var(--shadow-1)',
        s2: 'var(--shadow-2)',
        s3: 'var(--shadow-3)',
      },
      animation: {
        'marq-l': 'marqL 40s linear infinite',
        'spin-slow': 'spin 18s linear infinite',
        'pulse-dot': 'pulseDot 2.6s ease-out infinite',
      },
      keyframes: {
        marqL: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        pulseDot: {
          '0%,100%': { transform: 'scale(1)', opacity: 0.9 },
          '50%': { transform: 'scale(1.8)', opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
