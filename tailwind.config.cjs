/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#4a546a', dark: '#9ca9c9' },
        secondary: { DEFAULT: '#f3e2e6', dark: '#4a3944' },
        neutral: { DEFAULT: '#9ca9c9', dark: '#6a7590' },
        surface:  { DEFAULT: '#ffffff',  dark: '#11161c' },     // 카드/표면
        base:     { DEFAULT: '#f6f7fb',  dark: '#0c1117' },     // 페이지 바탕
        line:     { DEFAULT: '#e6e8f0',  dark: '#243042' },     // 보더
        text:     { DEFAULT: '#2b3445',  dark: '#cfd7e3' },     // 본문
        subtext:  { DEFAULT: '#6b7280',  dark: '#93a1b6' },     // 보조
        accent:   { DEFAULT: '#6d7cff',  dark: '#8ea2ff' },     // 포커스/선택
      },
      borderRadius: {
        xl: '16px',
        '2xl': '20px',
      },
      boxShadow: {
        card:  '0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(24,24,27,0.06)',
        card2: '0 1px 2px rgba(0,0,0,0.05), 0 10px 34px rgba(17,24,39,0.10)',
      },
      fontFamily: {
        pretendard: ['Pretendard Variable', 'sans-serif'],
        condor: ['Condor', 'Pretendard Variable', 'sans-serif'],
      },
      fontSize: {
        h1: ['clamp(32px, 4vw + 8px, 56px)', { lineHeight: '1.25' }],
        h2: ['clamp(24px, 3vw + 6px, 36px)', { lineHeight: '1.3' }],
        h3: ['clamp(20px, 2vw + 4px, 24px)', { lineHeight: '1.35' }],
        body: ['clamp(16px, 1.2vw + 6px, 18px)', { lineHeight: '1.6' }],
      },
    },
  },
  plugins: [],
};
