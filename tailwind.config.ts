// tailwind.config.ts
const config = {
  theme: {
    extend: {
      animation: {
        'wave-slow': 'wave 20s linear infinite',
        'wave-medium': 'wave 15s linear infinite reverse',
        'wave-fast': 'wave 10s linear infinite',
      },
      keyframes: {
        wave: {
          '0%': { transform: 'translateX(-20%)' },
          '100%': { transform: 'translateX(20%)' },
        }
      }
    }
  }
}