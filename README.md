# Portfolio SPA (Vite + React + TS)

정적 SPA 기반의 포트폴리오 사이트.
- 라우팅: HashRouter (카페24 정적 호스팅 호환)
- 데이터: `/public/data/projects.json` (슬러그 기반 상세)
- V1: 정적 빌드 업로드, V2: Vercel 이전 예정

## Tech Stack
- React 18, TypeScript
- Vite
- react-router-dom
- (Styles) 기존 퍼블리싱 CSS → `src/styles/global.css` (점진적 컴포넌트화)

## Getting Started
```bash
npm i
npm run dev
