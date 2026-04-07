# `D:\idowww\src\App.css`

```css
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}
```

# `D:\idowww\src\App.tsx`

```typescript
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import About from "./pages/About";
import "./styles/global.css";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<>Not Found</>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
```

# `D:\idowww\src\index.css`

```css
:root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}
```

# `D:\idowww\src\main.tsx`

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

# `D:\idowww\src\assets\react.svg`

```xml
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="35.93" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 228"><path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848a155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165a167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923a168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345a134.17 134.17 0 0 1 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212... [truncated]"></svg>

# `D:\idowww\src\components\AppLayout.tsx`

```typescript
import { Link, Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="app-layout">
      <header className="site-header">
        <nav className="nav">
          <Link to="/">Home</Link>{" "}
          <Link to="/projects">Projects</Link>{" "}
          <Link to="/about">About</Link>
        </nav>
      </header>
      <main className="site-main">
        <Outlet />
      </main>
      <footer className="site-footer">© {new Date().getFullYear()}</footer>
    </div>
  );
}
```

# `D:\idowww\src\components\DarkToggle.tsx`

```typescript
import { useCallback, useEffect, useState } from "react";
import type React from "react";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  // SSR/빌드 단계 보호
  if (typeof window === "undefined") return "light";
  try {
    const cached = window.localStorage.getItem("theme");
    if (cached === "light" || cached === "dark") return cached;
  } catch {
    // 로컬스토리지 접근 불가 시 무시
  }
  const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

export default function DarkToggle() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  // DOM 반영 + 저장 (의존성: theme)
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    // Tailwind dark 모드: html.classList에 dark 토글
    root.classList.toggle("dark", theme === "dark");
    try {
      window.localStorage.setItem("theme", theme);
    } catch {
      // 저장 실패는 무시
    }
  }, [theme]);

  const onClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={onClick}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-white/70 text-neutral-700 hover:bg-neutral/10 dark:bg-neutral-900/60 dark:text-neutral-200"
    >
      {theme === "dark" ? (
        // Sun
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 4V2m0 20v-2M4.93 4.93 3.52 3.52m16.96 16.96-1.41-1.41M4 12H2m20 0h-2M4.93 19.07 3.52 20.48m16.96-16.96-1.41 1.41M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        // Moon
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
```

# `D:\idowww\src\components\IdoWWWLogo.tsx`

```typescript
import type { CSSProperties } from "react";

type LogoSize = 'small' | 'medium' | 'large' | 'xlarge';
type LogoMode = 'light' | 'dark';

interface IdoWWWLogoProps {
  size?: LogoSize;
  mode?: LogoMode;
  animated?: boolean;
  className?: string;
  style?: CSSProperties;
}

const IdoWWWLogo: React.FC<IdoWWWLogoProps> = ({ 
  size = 'medium',
  mode = 'light',
  animated = true,
  className = '',
  style = {}
}) => {
  const sizes: Record<LogoSize, { box: number; icon: number; ido: number; www: number; gap: number }> = {
    small: { box: 24, icon: 14, ido: 6, www: 16, gap: 6 },
    medium: { box: 36, icon: 20, ido: 8, www: 26, gap: 9 },
    large: { box: 48, icon: 28, ido: 11, www: 34, gap: 12 },
    xlarge: { box: 64, icon: 36, ido: 14, www: 44, gap: 16 }
  };

  const colors: Record<LogoMode, { primary: string; neutral: string; bg: string }> = {
    light: { primary: '#4a546a', neutral: '#9ca9c9', bg: '#ffffff' },
    dark: { primary: '#9ca9c9', neutral: '#6a7590', bg: '#1a1d28' }
  };

  const s = sizes[size];
  const c = colors[mode];
  const wwwWidth = s.www * 3.5;
  const totalWidth = s.box + s.gap + wwwWidth;
  const textGap = s.ido * 0.1;
  const textHeight = s.ido + textGap + s.www;
  const totalHeight = Math.max(s.box, textHeight);

  return (
    <svg 
      width={totalWidth} 
      height={totalHeight} 
      viewBox={`0 0 ${totalWidth} ${totalHeight}`}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      {animated && (
        <style>
          {`
            @keyframes idowww-blink {
              0%, 49% { opacity: 1; }
              50%, 99% { opacity: 0.3; }
              100% { opacity: 1; }
            }
            .idowww-blink { animation: idowww-blink 1.2s ease-in-out infinite; }
          `}
        </style>
      )}
      <circle cx={s.box/2} cy={totalHeight/2} r={s.box/2} fill={c.primary} />
      <text 
        x={s.box/2} 
        y={totalHeight/2 + s.icon/3} 
        textAnchor="middle" 
        fontFamily="system-ui, -apple-system, sans-serif" 
        fontSize={s.icon} 
        fontWeight="700" 
        fill={c.bg}
        className={animated ? 'idowww-blink' : ''}
      >
        I
      </text>
      <g transform={`translate(${s.box + s.gap}, ${totalHeight/2 - textHeight/4})`}>
        <text x="0" y="0" fontFamily="system-ui" fontSize={s.ido} fontWeight="600" letterSpacing="-0.02em" fill={c.neutral}>Ido</text>
        <text x="0" y={s.ido + s.www * 0.5} fontFamily="Georgia, serif" fontSize={s.www} fontWeight="700" fontStyle="italic" letterSpacing="0.05em" fill={c.primary}>WWW</text>
      </g>
    </svg>
  );
};

export default IdoWWWLogo;
```

# `D:\idowww\src\components\RoleTabs.tsx`

```typescript
import { memo } from "react";

export type RoleKey = "ALL" | "Design" | "Publishing" | "Development" | "Etc";

type Props = {
  value: RoleKey;
  onChange: (next: RoleKey) => void;
  counts?: Partial<Record<RoleKey, number>>;
};

const TABS: RoleKey[] = ["ALL", "Design", "Publishing", "Development", "Etc"];

function RoleTabsBase({ value, onChange, counts }: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {TABS.map((tab) => {
        const active = value === tab;
        const n = counts?.[tab];

        return (
          <button
            key={tab}
            type="button"
            onClick={() => onChange(tab)}
            aria-pressed={active}
            className={[ 
              // 공통
              "px-5 py-2 rounded-full border-2 leading-none transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",

              // 기본(비활성): 투명 배경 + 2px 아웃라인
              // 호버: bg-primary, 텍스트 white, 보더 primary
              !active
                ? "bg-transparent text-primary border-primary/60 hover:bg-primary hover:text-white hover:border-primary"
                // 활성: 채움 상태
                : "bg-primary text-white border-primary",
            ].join(" ")}
          >
            {tab}
            {typeof n === "number" && (
              <span className={["ml-1 text-xs", active ? "text-white/90" : "opacity-70"].join(" ")}>
                ({n})
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export const RoleTabs = memo(RoleTabsBase);
```

# `D:\idowww\src\components\Timeline.tsx`

```typescript
import type { Resume } from "../types/resume";

export function Timeline({ data }: { data: Resume["experience"] }) {
  return (
    <ol className="timeline">
      {data.map((e, i) => (
        <li key={i} className="timeline-item">
          <div className="timeline-head">
            <strong>{e.role}</strong> · {e.company}
            <span className="period">{e.start}–{e.end || "Present"}</span>
          </div>
          {e.summary && <p className="summary">{e.summary}</p>}
          {e.stack?.length ? <div className="stack">{e.stack.join(" · ")}</div> : null}
          {e.achievements?.length ? (
            <ul className="bullets">
              {e.achievements.map((a, j) => <li key={j}>{a}</li>)}
            </ul>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
```

# `D:\idowww\src\hooks\useScrollReveal.ts`

```typescript
import { useEffect, useRef, useState } from "react";

export function useScrollReveal(delta = 8, topThreshold = 8) {
  const lastY = useRef(0);
  const [revealed, setRevealed] = useState(true);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      setAtTop(y <= topThreshold);

      const diff = y - lastY.current;
      if (Math.abs(diff) > delta) {
        // 스크롤 다운 → 숨김 / 업 → 표시
        setRevealed(diff < 0 || y <= topThreshold);
        lastY.current = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [delta, topThreshold]);

  return { revealed, atTop };
}
```

# `D:\idowww\src\layout\Footer.tsx`

```typescript
export default function Footer() {
  return (
    <footer className="site-footer">
      {/* ▼ 네 푸터 마크업으로 교체 *\/ 
      <div className="site-footer__inner">
        <p>© {new Date().getFullYear()} IdoWWW | Made with ❤️ and ☕</p>
      </div>
      {/* ▲ *\/ 
    </footer>
  );
}
```

# `D:\idowww\src\layout\Header.tsx`

```typescript
import { Link, NavLink } from "react-router-dom";
import DarkToggle from "../components/DarkToggle";
import { useScrollReveal } from "../hooks/useScrollReveal";
import IdoWWWLogo from '../components/IdoWWWLogo';

type NavItem = { to: string; label: string };
const NAV: NavItem[] = [
  { to: "/projects", label: "Works" },
  { to: "/about", label: "About" },
];

export default function Header() {
  const { revealed, atTop } = useScrollReveal();

  return (
    <header
      className={[ 
        "site-header fixed inset-x-0 top-0 z-50",
        "transition-transform duration-300 will-change-transform",
        revealed ? "translate-y-0" : "-translate-y-full",
        // 최상단 벗어나면 살짝 더 불투명 + 그림자
        atTop ? "" : "site-header--floating",
      ].join(" ")}
    >
      <div className="site-header__inner">
        <h1 className="site-logo">
          <Link to="/">
            <IdoWWWLogo size="medium" mode="light" animated />
          </Link>
        </h1>

        <nav id="nav" className="site-nav" aria-label="Primary">
          <ul className="site-nav__list">
            {NAV.map(({ to, label }) => (
              <li key={to} className="site-nav__item">
                <NavLink
                  to={to}
                  end
                  className={({ isActive }) =>
                    `site-nav__link ${isActive ? "is-active" : ""}`
                  }
                  aria-label={label}
                >
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
          
          {/* 런타임 환경 보정: 빌드/SSR 단계 보호 *\/ 
          {typeof window !== "undefined" ? <DarkToggle /> : null}
        </nav>
      </div>
    </header>
  );
}
```

# `D:\idowww\src\lib\data.ts`

```typescript
export async function loadProjects(){
  const r = await fetch("/data/projects.json");
  return r.json();
}
```

# `D:\idowww\src\lib\types.ts`

```typescript
export type ProjectType = "dev" | "design";
export interface Project {
  slug: string; title: string; type: ProjectType;
  period?: string; roles?: string[]; stack?: string[];
  tags?: string[]; summary?: string; thumb?: string;
  detail?: {
    overview?: string; problem?: string; approach?: string;
    implementation?: { title: string; desc: string; image?: string }[];
    result?: string; links?: { github?: string; demo?: string };
  };
}
```

# `D:\idowww\src\pages\About.tsx`

```typescript
import { useCallback, useEffect, useState, useMemo } from "react";
import type { Resume } from "../types/resume";

const PROFILE_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500'%3E%3Crect fill='%23f0f0f0' width='400' height='500'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-family='Arial' font-size='20'%3EProfile Image%3C/text%3E%3C/svg%3E";

export default function About() {
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // 필요하면 나중에 BASE_URL 대응용으로만 사용
  const resumePath = useMemo(() => "/data/resume.json", []);

  const fetchResume = useCallback(
    async (signal?: AbortSignal) => {
      try {
        const r = await fetch(resumePath, { cache: "no-store", signal });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data: Resume = await r.json();
        setResume(data);
        setError(null);
      } catch (err: unknown) {
        if ((err as { name?: string })?.name !== "AbortError") {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        setLoading(false);
      }
    },
    [resumePath]
  );

  const retry = () => {
    setLoading(true);
    setError(null);
    void fetchResume();
  };

  useEffect(() => {
    const ctrl = new AbortController();
    void fetchResume(ctrl.signal);
    return () => ctrl.abort();
  }, [fetchResume]);

  const sortedExp = useMemo(() => {
    if (!resume?.experience) return [];
    const parse = (s?: string) => (s ? Date.parse(s) : 0);
    return [...resume.experience].sort((a, b) => {
      const ae = parse(a.end) || parse(a.start);
      const be = parse(b.end) || parse(b.start);
      return be - ae;
    });
  }, [resume]);

  const formatPeriod = (start: string, end?: string) =>
    end && end.trim() ? `${start} – ${end}` : `${start} – Present`;

  // 로딩 상태
  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-24">
        <div className="mb-10 h-8 w-32 animate-pulse rounded bg-neutral/20" />
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
          <div className="aspect-[4/5] w-full animate-pulse rounded-2xl bg-neutral/15" />
          <div className="space-y-4">
            <div className="h-7 w-40 animate-pulse rounded bg-neutral/20" />
            <div className="h-4 w-48 animate-pulse rounded bg-neutral/15" />
            <div className="h-3 w-32 animate-pulse rounded bg-neutral/10" />
            <div className="mt-4 space-y-3">
              <div className="h-4 w-full animate-pulse rounded bg-neutral/10" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-neutral/10" />
              <div className="h-4 w-4/6 animate-pulse rounded bg-neutral/10" />
            </div>
            <div className="mt-6 h-10 w-40 animate-pulse rounded-full bg-neutral/15" />
          </div>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-24">
        <h1 className="mb-2 text-2xl font-semibold text-primary">About</h1>
        <p className="mb-6 text-sm text-red-600">
          데이터를 불러오는 중 오류가 발생했습니다. ({error.message})
        </p>
        <button
          type="button"
          onClick={retry}
          className="rounded border bg-white px-4 py-2 text-sm transition hover:bg-neutral/10"
        >
          다시 시도
        </button>
      </div>
    );
  }

  // 데이터 없음
  if (!resume) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-24">
        <h1 className="mb-2 text-2xl font-semibold text-primary">About</h1>
        <p className="mb-6 text-sm text-neutral">
          표시할 데이터가 없습니다. <code>public/data/resume.json</code>을
          확인한 뒤 다시 시도하세요.
        </p>
        <button
          type="button"
          onClick={retry}
          className="rounded border bg-white px-4 py-2 text-sm transition hover:bg-neutral/10"
        >
          다시 시도
        </button>
      </div>
    );
  }

  // ↓↓↓ 아래부터는 네가 첨부한 About 레이아웃 그대로 유지 ↓↓↓
  return (
    <div className="bg-white text-primary dark:bg-neutral-950 dark:text-neutral-50">
      <div className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-24">
        {/* Profile Section */}
        <section className="mb-16 grid gap-10 md:mb-24 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] md:items-start">
          <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-neutral/10">
            <img
              src={PROFILE_PLACEHOLDER}
              alt="Profile"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="profile-content">
            <h1 className="mb-2 text-[32px] font-light tracking-tight md:text-[40px]">
              idoWWW
            </h1>
            <div className="mb-2 text-sm uppercase tracking-[0.18em] text-neutral">
              UI/UX Designer &amp; Publishing
            </div>

            <div className="space-y-3 text-sm leading-relaxed text-primary/90 md:text-body">
              <p>
                서울을 기반으로 활동하는 UI/UX 디자이너이자 퍼블리셔로, 사려
                깊은 디지털 경험을 만드는 데 집중하고 있습니다.
              </p>
              <p>
                디자인과 개발을 모두 경험해본 덕분에, 시각적인 완성도와
                인터랙션, 그리고 퍼포먼스를 함께 고려한 웹사이트와
                애플리케이션을 만드는 일을 좋아합니다.
              </p>
              <p>
                깔끔한 미학과 기능적 디자인의 접점을 탐색하면서, 항상 최종
                사용자를 프로세스의 중심에 두는 것을 원칙으로 삼습니다.
              </p>
              <p>
                창의성과 기술, 그리고 문제 해결에 대한 호기심이 만나는 지점에서
                좋은 결과물이 나온다고 믿습니다.
              </p>
            </div>

            {resume.highlights?.length ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {resume.highlights.map((h) => (
                  <span key={h.slug} className="tag-chip">
                    {h.title}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="mt-8">
              <a
                href="/data/IdoWWW_Resume.pdf"
                className="inline-block border border-primary px-8 py-3 text-sm transition-colors hover:bg-primary hover:text-white"
              >
                이력서 다운로드
              </a>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16 rounded-3xl bg-neutral/5 px-6 py-12 md:mb-24 md:px-10 md:py-16">
          <h2 className="mb-10 text-center text-[28px] font-light md:text-[32px]">
            Skills &amp; Expertise
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {resume.skills?.length
              ? resume.skills.map((sg) => (
                  <div key={sg.category}>
                    <h3 className="mb-4 border-b border-primary/40 pb-3 text-sm font-semibold uppercase tracking-[0.14em] text-neutral">
                      {sg.category}
                    </h3>
                    <ul className="space-y-2 text-sm leading-relaxed text-primary/90">
                      {sg.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))
              : null}
          </div>
        </section>

        {/* Experience Section */}
        {sortedExp.length ? (
          <section className="mb-16 md:mb-24">
            <h2 className="mb-10 text-center text-[28px] font-light md:text-[32px]">
              Experience
            </h2>
            <div className="space-y-10">
              {sortedExp.map((e, idx) => (
                <article
                  key={`${e.company}-${e.role}-${idx}`}
                  className="border-b border-neutral/20 pb-10 last:border-b-0 last:pb-0"
                >
                  <div className="grid gap-6 md:grid-cols-[160px_minmax(0,1fr)] md:gap-10">
                    <div className="text-xs uppercase tracking-[0.16em] text-neutral">
                      <div>{formatPeriod(e.start, e.end)}</div>
                      {e.location && (
                        <div className="mt-2 text-[11px] text-neutral/80">
                          {e.location}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="mb-1 text-base font-semibold md:text-lg">
                        {e.role}
                      </h3>
                      <div className="mb-4 text-sm text-neutral">
                        {e.company}
                        {e.location ? ` / ${e.location}` : ""}
                      </div>

                      {e.summary && (
                        <p className="mb-3 whitespace-pre-line text-sm leading-relaxed text-primary/90">
                          {e.summary}
                        </p>
                      )}

                      {e.achievements?.length ? (
                        <ul className="mb-3 space-y-1.5 text-sm leading-relaxed text-primary/90">
                          {e.achievements.map((a, i) => (
                            <li key={i} className="flex gap-2">
                              <span className="mt-1 inline-block h-1 w-1 rounded-full bg-primary/70" />
                              <span>{a}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      {e.stack?.length ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {e.stack.map((s) => (
                            <span key={s} className="tag-chip">
                              {s}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {/* Education */}
        {resume.education?.length ? (
          <section className="mb-16 md:mb-24">
            <h2 className="mb-6 text-[24px] font-semibold text-primary">
              Education
            </h2>
            <ul className="space-y-4">
              {resume.education.map((ed, i) => (
                <li
                  key={`${ed.school}-${i}`}
                  className="rounded-2xl border border-neutral/20 px-5 py-4"
                >
                  <div className="text-sm font-semibold text-primary">
                    {ed.school}
                  </div>
                  {(ed.degree || ed.note) && (
                    <div className="mt-1 text-xs text-neutral">
                      {[ed.degree, ed.note].filter(Boolean).join(" · ")}
                    </div>
                  )}
                  {(ed.start || ed.end) && (
                    <div className="mt-1 text-xs text-neutral/80">
                      {ed.start ?? ""} 
                      {ed.end ? `– ${ed.end}` : ed.start ? "–" : ""}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* Services Section */}
        <section className="mb-16 rounded-3xl bg-neutral/5 px-6 py-12 md:mb-24 md:px-10 md:py-16">
          <h2 className="mb-10 text-center text-[28px] font-light md:text-[32px]">
            What I Do
          </h2>

          <div className="space-y-10">
            <div className="service-item">
              <h3 className="mb-3 text-xl font-medium">
                <span className="mr-3 text-neutral/60">01.</span>Web Design
              </h3>
              <p className="text-sm leading-relaxed text-primary/90">
                사용성과 미학에 중점을 둔 웹사이트 및 웹 애플리케이션을 위한
                현대적이고 사용자 중심적인 인터페이스를 제작합니다.
              </p>
            </div>

            <div className="service-item">
              <h3 className="mb-3 text-xl font-medium">
                <span className="mr-3 text-neutral/60">02.</span>Frontend
                Development
              </h3>
              <p className="text-sm leading-relaxed text-primary/90">
                최신 프레임워크와 웹 개발의 모범 사례를 활용하여 반응형이며
                성능이 우수한 웹사이트를 구축합니다.
              </p>
            </div>

            <div className="service-item">
              <h3 className="mb-3 text-xl font-medium">
                <span className="mr-3 text-neutral/60">03.</span>UI/UX
                Consulting
              </h3>
              <p className="text-sm leading-relaxed text-primary/90">
                사용자 경험 전략, 인터페이스 디자인 및 인터랙션 패턴에 대한
                전문적인 가이드를 제공합니다.
              </p>
            </div>

            <div className="service-item">
              <h3 className="mb-3 text-xl font-medium">
                <span className="mr-3 text-neutral/60">04.</span>Design Systems
              </h3>
              <p className="text-sm leading-relaxed text-primary/90">
                디지털 제품 전반에 걸쳐 일관성과 확장성을 보장하는 포괄적인
                디자인 시스템을 개발합니다.
              </p>
            </div>
          </div>
        </section>

        {/* Personal Section */}
        <section className="mb-16 md:mb-24">
          <h2 className="mb-6 text-[28px] font-light md:text-[32px]">
            일상의 모습
          </h2>
          <p className="mb-5 text-sm leading-relaxed text-primary/90">
            디자인하거나 코딩하지 않을 때는 이런 것들을 즐깁니다:
          </p>
          <ul className="space-y-2 text-sm leading-relaxed text-primary/90">
            <li>아날로그 사진 촬영</li>
            <li>디자인 철학에 관한 독서</li>
            <li>새로운 요리 레시피 실험</li>
            <li>도시를 걸으며 산책하기</li>
          </ul>
        </section>

        {/* Contact Section */}
        <section className="rounded-3xl bg-neutral/5 px-6 py-12 text-center md:px-10 md:py-16">
          <h2 className="mb-6 text-[28px] font-light md:text-[32px]">
            함께 해요
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-sm leading-relaxed text-primary/90">
            새로운 프로젝트, 창의적인 아이디어 또는 비전을 함께할 기회에 대해
            언제나 열려 있습니다.
          </p>
          <a
            href="mailto:idowww11@gmail.com"
            className="mb-6 inline-block text-xl text-primary transition-opacity hover:opacity-60"
          >
            idowww11@gmail.com
          </a>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-neutral md:text-sm">
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-primary"
            >
              LinkedIn
            </a>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-primary"
            >
              GitHub
            </a>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-primary"
            >
              Behance
            </a>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-primary"
            >
              Instagram
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
```

# `D:\idowww\src\pages\Home.tsx`

```typescript
import { Link } from "react-router-dom";
import { useProjectsData } from "../utils/useProjectsData";
import type { Project } from "../types/Project";

// Projects.tsx와 동일한 SVG 플레이스홀더
const SVG_PLACEHOLDER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">
  <rect width="100%" height="100%" fill="#E5E7EB"/>
  <g font-family="system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Arial" font-size="56" fill="#9CA3AF">
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">No Image</text>
  </g>
</svg>`;
const PLACEHOLDER_THUMBNAIL = `data:image/svg+xml;utf8,${encodeURIComponent(
  SVG_PLACEHOLDER
)}`;
const withFallback = (src?: string) =>
  src && src.trim() ? src : PLACEHOLDER_THUMBNAIL;

// 기간 문자열에서 정렬용 key 추출
function getPeriodEndKey(period?: string): number {
  if (!period) return 0;

  // 숫자만 남기고 나머지는 공백 처리 (., -, ~ 등 혼합 대응)
  const cleaned = period.replace(/[^\d]/g, " ");
  const parts = cleaned
    .split(" ")
    .map((p) => p.trim())
    .filter(Boolean);

  if (parts.length === 0) return 0;

  if (parts.length === 1) {
    const only = parts[0];
    if (only.length === 4) {
      const year = Number(only) || 0;
      return year * 100 + 12;
    }
    const val = Number(only) || 0;
    return val;
  }

  const last = parts[parts.length - 1];
  const prev = parts[parts.length - 2];

  if (prev.length === 4 && last.length <= 2) {
    const year = Number(prev) || 0;
    const month = Number(last) || 1;
    return year * 100 + month;
  }

  if (last.length === 4) {
    const year = Number(last) || 0;
    return year * 100 + 12;
  }

  const y = Number(last.slice(0, 4)) || 0;
  const m = Number(last.slice(4)) || 12;
  return y * 100 + m;
}

export default function Home() {
  const { projects, loading, error } = useProjectsData();

  const selectedProjects: Project[] = 
    !loading && !error && projects
      ? projects
          .filter((p) => p.featured)
          .sort((a, b) => getPeriodEndKey(b.period) - getPeriodEndKey(a.period))
          .slice(0, 3)
      : [];

  return (
    <div id="home-page">
      {/* Hero Section */}
      <section
        className="
          relative
          flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center
          px-6 text-center
          md:px-10
        "
      >
        <h1
          className="
            mb-5
            text-[42px] tracking-[-0.06em]
            md:text-[72px]
            lg:text-[96px]
          "
        >
          IdoWWW
        </h1>

        <div
          className="
            mb-2
            text-lg text-body
            md:text-2xl
          "
        >
          UI/UX Designer &amp; Publishing
        </div>

        <div
          className="
            pointer-events-none
            absolute bottom-10
            text-sm text-neutral-500
            animate-bounce
          "
        >
          ↓ Scroll to explore
        </div>
      </section>

      {/* Featured Works (Selected Works) */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <h2
          className="
            mb-12 text-center
            text-[32px] font-light
            md:mb-16 md:text-[40px]
            lg:text-[48px]
          "
        >
          Selected Works
        </h2>

        {/* 로딩 상태: 카드 그리드 스켈레톤 */}
        {loading && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <article
                key={i}
                className="card-portfolio card--list animate-pulse"
              >
                <div className="card-media bg-neutral/10" />
                <div className="card-body space-y-2">
                  <div className="h-3 w-24 rounded bg-neutral/10" />
                  <div className="h-4 w-40 rounded bg-neutral/10" />
                  <div className="h-3 w-32 rounded bg-neutral/10" />
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="h-6 w-12 rounded-full bg-neutral/10" />
                    <span className="h-6 w-10 rounded-full bg-neutral/10" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* 에러 or featured 없음 */}
        {!loading && (error || selectedProjects.length === 0) && (
          <div className="text-center text-sm text-neutral">
            표시할 대표 프로젝트가 없습니다.
          </div>
        )}

        {/* 실제 featured 프로젝트 3개 */}
        {!loading && !error && selectedProjects.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {selectedProjects.map((p) => {
              // role 문자열을 칩용 배열로 변환 (중복 제거)
              const roleChips = Array.from(
                new Set(
                  (p.role ?? "")
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                )
              );

              return (
                <Link
                  key={p.slug}
                  to={`/projects/${p.slug}`}
                  className="block"
                >
                  {/* Projects.tsx 카드와 동일한 마크업/클래스 */}
                  <article className="card-portfolio card--list">
                    <div className="card-media">
                      <img
                        src={withFallback(p.thumbnail)}
                        alt={p.title}
                        loading="lazy"
                      />
                    </div>

                    <div className="card-body">
                      <div
                        className="text-sm text-neutral truncate"
                        title={p.period}
                      >
                        {p.period}
                      </div>

                      <h2
                        className="text-xl font-semibold truncate"
                        title={p.title}
                      >
                        {p.title}
                      </h2>

                      {p.impact && (
                        <div
                          className="text-sm text-primary/80 truncate"
                          title={p.impact}
                        >
                          {p.impact}
                        </div>
                      )}

                      <div className="mt-3 flex flex-wrap gap-2">
                        {roleChips.map((r) => (
                          <span key={r} className="tag-chip">
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Brief Introduction */}
      <section className="mx-auto max-w-[800px] px-6 py-24 text-center md:px-10 md:py-32">
        <h2
          className="
            mb-10
            text-[28px] font-light
            md:text-[32px]
            lg:text-[36px]
          "
        >
          Hello, I'm idoWWW
        </h2>
        <p className="mb-10 text-body leading-relaxed md:text-lg">
          I'm a creative developer based in Seoul, specializing in translating
          ideas into elegant digital solutions. With a background in both design
          and development, I bridge the gap between aesthetics and
          functionality.
        </p>

        <Link
          to="/about"
          className="
            inline-block
            border border-primary px-10 py-4
            text-sm font-medium
            transition-colors
            hover:bg-primary hover:text-white
          "
        >
          More About Me →
        </Link>
      </section>

      {/* Contact Section */}
      <section className="bg-muted/40 px-6 py-24 text-center md:px-10 md:py-32">
        <h2
          className="
            mb-8
            text-[32px] font-light
            md:text-[40px]
            lg:text-[48px]
          "
        >
          Let's work together
        </h2>

        <a
          href="mailto:idowww11@gmail.com"
          className="
            mb-10 inline-block
            text-2xl
            text-primary
            transition-opacity
            hover:opacity-70
          "
        >
          idowww11@gmail.com
        </a>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-neutral">
          <a
            href="#"
            className="transition-colors hover:text-primary"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="#"
            className="transition-colors hover:text-primary"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            href="#"
            className="transition-colors hover:text-primary"
            target="_blank"
            rel="noreferrer"
          >
            Behance
          </a>
          <a
            href="#"
            className="transition-colors hover:text-primary"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </div>
      </section>
    </div>
  );
}
```

# `D:\idowww\src\pages\ProjectDetail.tsx`

```typescript
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useProjectsData } from "../utils/useProjectsData";

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { projects, loading } = useProjectsData();
  const { revealed } = useScrollReveal();
  const [imgFailed, setImgFailed] = useState(false);

  if (loading || !projects) {
    return (
      <div className="mx-auto max-w-4xl py-16 px-4">
        <div className="mb-6 h-8 w-2/3 animate-pulse rounded bg-neutral/30" />
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl border bg-neutral/10" />
          ))}
        </div>
        <div className="aspect-video w-full animate-pulse rounded-xl bg-neutral/20" />
      </div>
    );
  }

  const project = projects.find((p) => p.slug === slug) || null;

  if (!project) {
    return (
      <div className="mx-auto max-w-4xl py-20 px-4">
        <p className="mb-8 text-xl font-semibold">프로젝트를 찾을 수 없습니다.</p>
        <button
          onClick={() => navigate(-1)}
          className="rounded border px-4 py-2 transition hover:bg-neutral/10"
        >
          이전 페이지로
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Sticky header */}
      <div className={`sticky ${revealed ? "top-16" : "top-0"} z-40 w-full`}>
        <div className="h-12 border-b border-neutral/15 bg-white/70 backdrop-blur">
          <div className="mx-auto max-w-7xl h-full px-4 md:px-6 lg:px-8 flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="rounded border px-3 py-1 text-sm transition hover:bg-neutral/10"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl py-16 px-4">
        {/* Client */}
        {project.client && (
          <div className="mb-1 text-[clamp(18px,1.25vw,20px)] leading-[1.5] text-neutral">
            {project.client}
          </div>
        )}

        {/* Title */}
        <h1 className="mb-4 text-h1 font-condor">{project.title}</h1>

        {/* 기간 / 역할 / 소속 */}
        <div className="mb-10 grid gap-4 sm:grid-cols-3">

          {/* 기간 */}
          <div className="card-portfolio card--detail">
            <div className="card-body">
              <div className="text-sm text-neutral">기간</div>
              <div className="mt-1 font-semibold truncate">{project.period}</div>
            </div>
          </div>

          {/* 역할 + 포지션 */}
          <div className="card-portfolio card--detail">
            <div className="card-body">
              <div className="text-sm text-neutral">역할</div>
              <div className="mt-1 font-semibold truncate">{project.role}</div>

              {/* parsedPositions */}
              {project.parsedPositions.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-6">
                  {project.parsedPositions.map((pos) => (
                    <span key={pos} className="tag-chip">{pos}</span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 소속 */}
          <div className="card-portfolio card--detail">
            <div className="card-body">
              <div className="text-sm text-neutral">소속</div>
              <div className="mt-1 font-semibold truncate">
                {project.affiliation || "-"}
              </div>
            </div>
          </div>
        </div>

        {/* 태그 */}
        <div className="mb-10 flex flex-wrap gap-2">
          {project.parsedTags.map((tag) => (
            <span key={tag} className="tag-chip">{tag}</span>
          ))}
        </div>

        {/* 썸네일: 값이 없거나 로드 실패 시 렌더링하지 않음 */}
        {project.thumbnail?.trim() && !imgFailed && (
          <div className="device-bleed mb-10">
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="block h-full w-full object-cover"
                loading="lazy"
                onError={() => setImgFailed(true)}
              />
            </div>
          </div>
        )}

        {/* Description */}
        <p className="whitespace-pre-line text-body leading-relaxed text-primary/90">
          {project.description}
        </p>

        {/* Awards */}
        {project.parsedAwards && project.parsedAwards.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-4 text-xl font-semibold text-primary">🏆 수상내역</h2>
            <ul className="space-y-2 text-sm leading-relaxed text-primary/90">
              {project.parsedAwards.map((aw, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-2 size-1.5 rounded-full bg-primary/60" />
                  <span>{aw}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related Links */}
        {project.parsedUrls.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-4 text-xl font-semibold text-primary">⚓ Links</h2>

            <div className="flex flex-wrap gap-4">
              {project.parsedUrls.map((u, i) => (
                <a
                  key={i}
                  href={u.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded border px-4 py-2 text-sm 
                             transition bg-white hover:bg-neutral/10"
                >
                  {u.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
```

# `D:\idowww\src\pages\Projects.tsx`

```typescript
// Projects.tsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import type React from "react";
import { useProjectsData } from "../utils/useProjectsData";
import { RoleTabs } from "../components/RoleTabs";
import type { RoleKey } from "../components/RoleTabs";
import type { Project } from "../types/Project";

// 16:9 비율 SVG 플레이스홀더 (카드 뷰 전용)
const SVG_PLACEHOLDER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">
  <rect width="100%" height="100%" fill="#E5E7EB"/>
  <g font-family="system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Arial" font-size="56" fill="#9CA3AF">
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">No Image</text>
  </g>
</svg>`;
const PLACEHOLDER_THUMBNAIL = `data:image/svg+xml;utf8,${encodeURIComponent(SVG_PLACEHOLDER)}`;
const withFallback = (src?: string) => (src && src.trim() ? src : PLACEHOLDER_THUMBNAIL);
const onImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  if (e.currentTarget.src !== PLACEHOLDER_THUMBNAIL) {
    e.currentTarget.src = PLACEHOLDER_THUMBNAIL;
  }
};

// --- Icons (텍스트 대신 사용) ---
const IconGrid = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" strokeWidth="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" strokeWidth="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" strokeWidth="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" strokeWidth="1.5" />
  </svg>
);
const IconTable = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
    <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="1.5" />
    <path d="M3 10h18M9 19V5" strokeWidth="1.5" />
  </svg>
);

// 목록 카드에서 노출할 최대 태그 개수
const TAG_VISIBLE_LIMIT = 5;

// 역할 토큰 → 표준 카테고리 매핑
const CORE = new Set<RoleKey>(["Design", "Publishing", "Development"]);
function mapRoleTokenToCategory(token: string): RoleKey {
  const k = token.replace(/\s+/g, "").toLowerCase();
  if (k === "ui/uxdesign" || k === "uiuxdesign") return "Design";
  if (k === "webdesign" || k === "branddesign") return "Design";
  if (k === "front-enddev" || k === "frontenddev" || k === "frontend" || k === "front-end") return "Development";
  if (k === "flash") return "Etc";
  if (k === "publishing" || k === "webpublishing") return "Publishing";
  if (k.includes("design")) return "Design";
  if (k.includes("dev")) return "Development";
  if (k.includes("publish")) return "Publishing";
  return "Etc";
}

function hasRole(pRole: string, selected: RoleKey): boolean {
  if (selected === "ALL") return true;
  const roles = (pRole ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const categories = new Set<RoleKey>(roles.map(mapRoleTokenToCategory));
  if (selected === "Etc") {
    const hasCore = [...categories].some((c) => CORE.has(c));
    return !hasCore && categories.size > 0;
  }
  return categories.has(selected);
}

export default function Projects() {
  const { projects, loading, error } = useProjectsData();
  const location = useLocation();
  const navigate = useNavigate();

  // URL ?role=... ↔ 상태
  const initialRole = (new URLSearchParams(location.search).get("role") as RoleKey) || "ALL";
  const [role, setRole] = useState<RoleKey>(initialRole);
  useEffect(() => {
    const qRole = (new URLSearchParams(location.search).get("role") as RoleKey) || "ALL";
    if (qRole !== role) setRole(qRole);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  // URL ?view=card|table ↔ 상태 (기본값 table)
  const [view, setView] = useState<"card" | "table">(() => {
    const q = (new URLSearchParams(location.search).get("view") as "card" | "table") || "table";
    return q === "card" ? "card" : "table";
  });
  useEffect(() => {
    const q = (new URLSearchParams(location.search).get("view") as "card" | "table") || "table";
    const next = q === "card" ? "card" : "table";
    if (next !== view) setView(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const filtered: Project[] = useMemo(() => {
    if (!projects) return [];
    return projects.filter((p) => hasRole(p.role, role));
  }, [projects, role]);

  // 카운트 계산(작은 텍스트용)
  const counts = useMemo(() => {
    if (!projects) return undefined;
    const all = projects.length;
    const design = projects.filter((p) => hasRole(p.role, "Design")).length;
    const publishing = projects.filter((p) => hasRole(p.role, "Publishing")).length;
    const dev = projects.filter((p) => hasRole(p.role, "Development")).length;
    const etc = projects.filter((p) => hasRole(p.role, "Etc")).length;
    return { ALL: all, Design: design, Publishing: publishing, Dev: dev, Etc: etc } as const;
  }, [projects]);

  const updateSearch = (nextRole: RoleKey, nextView: "card" | "table") => {
    const q = new URLSearchParams(location.search);
    if (nextRole === "ALL") q.delete("role");
    else q.set("role", nextRole);
    // 기본값 table → table이면 파라미터 제거, card면 설정
    if (nextView === "table") q.delete("view");
    else q.set("view", "card");
    navigate({ pathname: "/projects", search: q.toString() }, { replace: true });
  };

  const handleChangeRole = (next: RoleKey) => {
    setRole(next);
    updateSearch(next, view);
  };
  const handleChangeView = (next: "card" | "table") => {
    setView(next);
    updateSearch(role, next);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl py-20 px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-video animate-pulse rounded-xl bg-neutral/20" />
          ))}
        </div>
      </div>
    );
  }
  if (error) return <div className="mx-auto max-w-7xl py-20 px-4">데이터 로딩 실패</div>;
  if (!projects || projects.length === 0) return <div className="mx-auto max-w-7xl py-20 px-4">데이터가 없습니다.</div>;

  return (
    <div className="mx-auto max-w-7xl py-20 px-4">
      {/* 상단: 역할 탭 + 뷰 토글 */}
      <div className="mb-6 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
        <RoleTabs value={role} onChange={handleChangeRole} counts={counts} />

        {/* 카드|테이블 토글 - 외곽 보더 제거, 가운데 분리선만, 아이콘 사용 */}
        <div className="inline-flex items-stretch rounded-lg bg-muted/60 p-1">
          <button
            type="button"
            aria-label="카드 보기"
            aria-pressed={view === "card"}
            onClick={() => handleChangeView("card")}
            className={[ 
              "px-3 py-2 rounded-md transition",
              view === "card" ? "bg-primary/10 text-primary" : "text-primary/60 hover:text-primary",
            ].join(" ")}
          >
            <IconGrid />
            <span className="sr-only">Card</span>
          </button>
          <div className="w-px self-stretch bg-border/60" />
          <button
            type="button"
            aria-label="테이블 보기"
            aria-pressed={view === "table"}
            onClick={() => handleChangeView("table")}
            className={[ 
              "px-3 py-2 rounded-md transition",
              view === "table" ? "bg-primary/10 text-primary" : "text-primary/60 hover:text-primary",
            ].join(" ")}
          >
            <IconTable />
            <span className="sr-only">Table</span>
          </button>
        </div>
      </div>

      {/* 뷰 모드 분기 */}
      {view === "card" ? (
        /* 카드 그리드 */
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <Link key={p.slug} to={`/projects/${p.slug}`} className="block">
              <article className="card-portfolio card--list">
                <div className="card-media">
                  <img
                    src={withFallback(p.thumbnail)}
                    alt={`${p.title} thumbnail`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    onError={onImgError}
                  />
                </div>
                <div className="card-body">
                  {/* 기간 / 제목 / 임팩트 한 줄 */}
                  <div className="space-y-1.5">
                    <div className="text-sm text-neutral truncate" title={p.period}>
                      {p.period}
                    </div>
                    <h2 className="text-xl font-semibold truncate" title={p.title}>
                      {p.title}
                    </h2>
                    {p.impact && (
                      <div className="text-sm text-neutral-700 dark:text-neutral-200 truncate" title={p.impact}>
                        {p.impact}
                      </div>
                    )}
                  </div>
                  
                  {/* 태그: 최대 5개만 노출. 높이 강제 금지 */}
                  <div className="mt-3 flex flex-wrap gap-2 max-h-12 overflow-hidden">
                    {p.parsedTags.slice(0, TAG_VISIBLE_LIMIT).map((t) => (
                      <span key={t} className="tag-chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        /* 테이블 (디폴트) : 반응형 스택 행 + 색상 요구사항 */
        <div className="mt-6 overflow-x-hidden overflow-y-auto border-t-2 border-primary">
          <table className="w-full table-fixed border-separate border-spacing-0">
            {/* 데스크톱: thead 표시 + sticky, 모바일: 숨김 */}
            <thead className="hidden md:table-header-group md:sticky md:top-0 md:z-10 md:bg-background md:[&>tr>th]:border-b md:[&>tr>th]:border-primary/40">
               <tr className="border-b border-neutral/40 text-left text-sm text-primary">
                <th className="px-4 py-3 font-semibold w-[18%]">기간</th>
                <th className="px-4 py-3 font-semibold w-[34%]">프로젝트명</th>
                <th className="px-4 py-3 font-semibold w-[18%]">고객사</th>
                <th className="px-4 py-3 font-semibold w-[18%]">근무사</th>
                <th className="px-4 py-3 font-semibold w-[12%]">역할</th>
              </tr>
            </thead>

            {/* tr 하단 1px. 모바일에서는 block 행으로 스택 */}
            <tbody className="text-sm text-primary/90 md:table-row-group">
              {filtered.map((p) => (
                <tr
                  key={p.slug}
                  className="block border-b border-neutral/40 py-3 transition hover:bg-muted/40 md:table-row md:py-0 md:[&>td]:border-b md:[&>td]:border-neutral/40"
                >
                  {/* 기간 */}
                  <td className="block px-0 pb-1 pl-4 pr-4 whitespace-pre-wrap break-words md:table-cell md:px-4 md:py-3 md:whitespace-normal">
                    {p.period}
                  </td>

                  {/* 프로젝트명 (링크) */}
                  <td className="block px-0 pb-1 pl-4 pr-4 text-lg text-primary font-semibold whitespace-pre-wrap break-words md:table-cell md:px-4 md:py-3">
                    <Link to={`/projects/${p.slug}`} className="hover:underline">
                      {p.title}
                    </Link>
                  </td>

                  {/* 고객사 */}
                  <td className="block px-0 pb-1 pl-4 pr-4 whitespace-pre-wrap break-words md:table-cell md:px-4 md:py-3">
                    <span className="md:hidden text-primary/60 text-xs">고객사 : </span>
                    {p.client || ""}
                  </td>

                  {/* 근무사 */}
                  <td className="block px-0 pb-1 pl-4 pr-4 whitespace-pre-wrap break-words md:table-cell md:px-4 md:py-3">
                    <span className="md:hidden text-primary/60 text-xs">근무사 : </span>
                    {p.affiliation || ""}
                  </td>

                  {/* 역할 */}
                  <td className="block px-0 pl-4 pr-4 whitespace-pre-wrap break-words md:table-cell md:px-4 md:py-3 md:whitespace-normal">
                    <span className="md:hidden text-primary/60 text-xs">역할 : </span>
                    {p.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
```

# `D:\idowww\src\types\Project.ts`

```typescript
// src/types/Project.ts

/**
 * Excel 시트의 원본 구조 그대로 맵핑되는 타입.
 * fetch(SHEET_URL) → JSON → 여기로 들어온다.
 *
 * 주의:
 * - urls 는 Excel에서 "label|href" 줄바꿈 문자열로 들어오므로 string이다.
 */
export type RawProject = {
  slug: string;
  title: string;
  period: string;
  role: string;          // "Design,Publishing,Dev"
  impact: string;
  tags: string;          // "React,Spring,Figma" (쉼표 구분 문자열)

  description: string;

  client?: string;
  affiliation?: string;
  thumbnail: string;

  // comma 구분 문자열 ("PL,PM")
  positions?: string;

  // 줄바꿈 + "label|href" 형식
  urls?: string;

  // 줄바꿈 텍스트
  awards?: string;

  // 시트 상에서 Y / TRUE / 1 등으로 들어오는 featured 플래그
  featured?: string;
};

export type UrlItem = {
  label: string;
  href: string;
};

/**
 * UI에서 사용하는 최종 가공 타입.
 * RawProject + Parsed fields (tags, positions, urls, awards, featured 플래그)
 */
export type Project = {
  slug: string;
  title: string;
  period: string;
  role: string;
  impact: string;
  tags: string;
  description: string;

  client?: string;
  affiliation?: string;
  thumbnail: string;
  positions?: string;
  urls?: string;
  awards?: string;

  // 파싱된 필드들
  parsedTags: string[];        // ["React", "Spring", "Figma"]
  parsedPositions: string[];   // ["PL", "PM"]
  parsedUrls: UrlItem[];       // [{label, href}, ...]
  parsedAwards: string[];      // ["수상1", "수상2", ...]

  // boolean 으로 정리된 featured 플래그
  featured: boolean;
};
```

# `D:\idowww\src\types\resume.ts`

```typescript
export type Resume = {
  experience: { company: string; role: string; start: string; end?: string;
    location?: string; summary?: string; stack?: string[]; achievements?: string[];
  }[];
  education: { school: string; degree?: string; start?: string; end?: string; note?: string }[];
  skills: { category: string; items: string[] }[];
  highlights?: { slug: string; title: string; oneLiner: string }[];
};
```

# `D:\idowww\src\utils\parseProject.ts`

```typescript
// utils/parseProject.ts

import type { RawProject, Project, UrlItem } from "../types/Project";

/**
 * 줄바꿈 기반 "label|href" 문자열을 UrlItem[]으로 변환한다.
 */
function parseUrls(raw?: string): UrlItem[] {
  if (!raw) return [];

  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, href] = line.split("|").map((s) => s.trim());
      return { label, href };
    })
    .filter((u) => u.href);
}

/**
 * 줄바꿈 기반 텍스트를 배열로 변환한다.
 * - 한 줄 = 한 항목
 */
function parseMultiline(raw?: string): string[] {
  if (!raw) return [];
  return raw
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * 쉼표 구분 문자열을 string[]로 변환한다.
 * 예: "React,Spring,ERP" → ["React","Spring","ERP"]
 */
function parseCsvList(raw?: string): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * 시트의 플래그 문자열(Y / TRUE / 1 등)을 boolean 으로 변환.
 */
function parseBooleanFlag(raw?: string): boolean {
  if (!raw) return false;
  const v = raw.toString().trim().toLowerCase();
  return v === "y" || v === "yes" || v === "true" || v === "1";
}

/**
 * RawProject → Project 변환 함수 (UI에서 쓰는 최종 구조).
 */
export function parseProject(raw: RawProject): Project {
  return {
    // 원본 필드 그대로 복사
    ...raw,

    // 태그/포지션/URL/어워드 파싱 결과
    parsedTags: parseCsvList(raw.tags),
    parsedPositions: parseCsvList(raw.positions),
    parsedUrls: parseUrls(raw.urls),
    parsedAwards: parseMultiline(raw.awards),

    // featured 플래그
    featured: parseBooleanFlag(raw.featured),
  };
}

/**
 * RawProject[] → Project[] 일괄 변환
 */
export function parseProjectList(rawList: RawProject[]): Project[] {
  return rawList.map((raw) => parseProject(raw));
}
```