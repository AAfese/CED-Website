// Shared Tailwind theme — loaded after the Tailwind CDN script on every page.
tailwind.config = {
  theme: {
    extend: {
      colors: {
        royal: { DEFAULT: '#1A3A8F', light: '#2c52b8', dark: '#122a6b' },
        gold: { DEFAULT: '#F5C518', soft: '#fbe08a' },
        purple: { DEFAULT: '#4B0082', light: '#6a1bb0' },
        ink: '#0D0D0D',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(26,58,143,0.06), 0 12px 28px -8px rgba(26,58,143,0.18)',
        float: '0 2px 6px rgba(26,58,143,0.08), 0 30px 60px -18px rgba(26,58,143,0.28)',
        gold: '0 10px 30px -8px rgba(245,197,24,0.5)',
      },
    },
  },
};
