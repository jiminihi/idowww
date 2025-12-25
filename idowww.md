## src\App.tsx

```tsx
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
          <Route path="*" element={<>Not Found</>}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
```

## src\App.css

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

## src\index.css

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
  transition: border-color: 0.25s;
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

## src\main.tsx

```tsx
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

## src\assets\react.svg

```svg
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="35.93" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 228"><path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848a155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165a167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923a168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345a134.17 134.17 0 0 1 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212 37.076-29.293c2.813-.98 5.757-1.905 8.812-2.773c3.204 10.42 7.406 21.315 12.477 32.332c-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789c8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988c-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08c-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192 9.899.29 14.978.29c5.218 0 10.376-.117 15.453-.343c-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52c-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026a347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815a329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627a310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695a358.489 358.489 0 0 1 11.036 20.54a329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026c-.344 1.668-.73 3.367-1.15 5.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3 lazım}"</path></svg>
```

## src\components\AppLayout.tsx

```tsx
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

## src\components\DarkToggle.tsx

```tsx
// src/components/DarkToggle.tsx
import { useEffect, useState } from "react";

const hasDOM = typeof window !== "undefined" && typeof document !== "undefined";

function getInitialDark(): boolean {
  if (!hasDOM) return false;
  const saved = localStorage.getItem("theme");
  if (saved === "dark") return true;
  if (saved === "light") return false;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}

export default function DarkToggle() {
  const [dark, setDark] = useState<boolean>(getInitialDark);

  // 초기 1회 동기화
  useEffect(() => {
    if (!hasDOM) return;
    document.documentElement.classList.toggle("dark", dark);
  }, []); // 의도적 1회

  // 상태 변경 시 동기화
  useEffect(() => {
    if (!hasDOM) return;
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      /* noop */
    }
  }, [dark]);

  return (
    <button
      type="button"
      aria-pressed={dark}
      aria-label={dark ? "라이트 모드로" : "다크 모드로"}
      title={dark ? "라이트 모드로" : "다크 모드로"}
      onClick={() => setDark(v => !v)}
      className="
        inline-flex h-6 w-6 items-center justify-center
        rounded border border-neutral/40 bg-transparent
        hover:bg-neutral/10 dark:hover:bg-primary-dark/30
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40
        transition
      "
    >
      {dark ? (
        /* Sun (라이트로 전환 안내) */
        <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 18a6 6 0 1 0 0-12a6 6 0 0 0 0 12m0-16a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1m0 18a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1m10-7a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1M4 12a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1m14.95 6.536a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 1 1 1.414-1.415l.707.708a1 1 0 0 1 0 1.414M6.171 6.171a1 1 0 0 1-1.414 0l-.707-.707A1 1 0 1 1 5.464 4.05l.707.707a1 1 0 0 1 0 1.414m12.021-1.414a1 1 0 0 1 0 1.414l-.707.707a1 1 0 0 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0M6.171 19.95a1 1 0 0 1 0-1.414l.707-.707a1 1 0 1 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414 0"
          />
        </svg>
      ) : (
        /* Moon (다크로 전환 안내) */
        <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M21 12.79A9 9 0 1 1 11.21 3a.75.75 0 0 1 .92.92A7.5 7.5 0 1 0 21 12a.75.75 0 0 1 0 .79"
          />
        </svg>
      )}
    </button>
  );
}
```

## src\components\RoleTabs.tsx

```tsx
import { memo } from "react";

export type RoleKey = "ALL" | "Design" | "Publishing" | "Dev" | "Etc";

type Props = {
  value: RoleKey;
  onChange: (next: RoleKey) => void;
  counts?: Partial<Record<RoleKey, number>>;
};

const TABS: RoleKey[] = ["ALL", "Design", "Publishing", "Dev", "Etc"];

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

## src\components\Timeline.tsx

```tsx
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

## src\hooks\useScrollReveal.ts

```ts
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

## src\layout\Footer.tsx

```tsx
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

## src\layout\Header.tsx

```tsx
import { Link, NavLink } from "react-router-dom";
import DarkToggle from "../components/DarkToggle";
import { useScrollReveal } from "../hooks/useScrollReveal";

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
          <Link to="/">IdoWWW</Link>
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
          
          <DarkToggle />
        </nav>
      </div>
    </header>
  );
}
```

## src\layout\Layout.tsx

```tsx
import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = { children?: ReactNode };

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      {/* 고정 헤더 높이 보정 *\/
      <div className="h-16" />
      <main className="flex-1 overflow-x-clip">{children}</main>
      <Footer />
    </div>
  );
}
```

## src\lib\data.ts

```ts
export async function loadProjects(){
  const r = await fetch("/data/projects.json");
  return r.json();
}
```

## src\lib\types.ts

```ts
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

## src\pages\About.tsx

```tsx
import { useEffect, useState } from "react";

type Resume = {
  experience: { company: string; role: string; start: string; end?: string; summary?: string; stack?: string[]; achievements?: string[] }[];
  education: { school: string; degree?: string; start?: string; end?: string; note?: string }[];
  skills: { category: string; items: string[] }[];
};

export default function About() {
  const [resume, setResume] = useState<Resume | null>(null);

  useEffect(() => {
    fetch("/data/resume.json")
      .then(r => r.json())
      .then(setResume)
      .catch(console.error);
  }, []);

  if (!resume) return <div>Loading…</div>;

  return (
    <div className="container">
      
      <h1>About</h1>

      {resume.experience?.length ? (
        <section>
          <h2>Experience</h2>
          <ul>
            {resume.experience.map((e, i) => (
              <li key={i}>
                <strong>{e.role}</strong> · {e.company} ({e.start}–{e.end || "Present"})
                {e.summary && <div>{e.summary}</div>}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {resume.skills?.length ? (
        <section>
          <h2>Skills</h2>
          <ul>
            {resume.skills.map((s, i) => (
              <li key={i}><strong>{s.category}</strong>: {s.items.join(" · ")}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {resume.education?.length ? (
        <section>
          <h2>Education</h2>
          <ul>
            {resume.education.map((e, i) => (
              <li key={i}>
                <strong>{e.school}</strong> {e.degree ? `· ${e.degree}` : ""} ({e.start}–{e.end})
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
```

## src\pages\Home.tsx

```tsx

export default function Home() {
  return <div>Home</div>;
}
```

## src\pages\ProjectDetail.tsx

```tsx
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
      {/* Sticky header *\/
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
        {/* Client *\/
        {project.client && (
          <div className="mb-1 text-[clamp(18px,1.25vw,20px)] leading-[1.5] text-neutral">
            {project.client}
          </div>
        )}

        {/* Title *\/
        <h1 className="mb-4 text-h1 font-condor">{project.title}</h1>

        {/* 기간 / 역할 / 소속 *\/
        <div className="mb-10 grid gap-4 sm:grid-cols-3">

          {/* 기간 *\/
          <div className="card-portfolio card--detail">
            <div className="card-body">
              <div className="text-sm text-neutral">기간</div>
              <div className="mt-1 font-semibold truncate">{project.period}</div>
            </div>
          </div>

          {/* 역할 + 포지션 *\/
          <div className="card-portfolio card--detail">
            <div className="card-body">
              <div className="text-sm text-neutral">역할</div>
              <div className="mt-1 font-semibold truncate">{project.role}</div>

              {/* parsedPositions *\/
              {project.parsedPositions.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-6">
                  {project.parsedPositions.map((pos) => (
                    <span key={pos} className="tag-chip">{pos}</span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 소속 *\/
          <div className="card-portfolio card--detail">
            <div className="card-body">
              <div className="text-sm text-neutral">소속</div>
              <div className="mt-1 font-semibold truncate">
                {project.affiliation || "-"}
              </div>
            </div>
          </div>
        </div>

        {/* 태그 *\/
        <div className="mb-10 flex flex-wrap gap-2">
          {project.parsedTags.map((tag) => (
            <span key={tag} className="tag-chip">{tag}</span>
          ))}
        </div>

        {/* 썸네일: 값이 없거나 로드 실패 시 렌더링하지 않음 *\/
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

        {/* Description *\/
        <p className="whitespace-pre-line text-body leading-relaxed text-primary/90">
          {project.description}
        </p>

        {/* Awards *\/
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

        {/* Related Links *\/
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

## src\pages\Projects.tsx

```tsx
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
    <rect x="3" y="3" width="7" height="7" rx="1.5" stroke-width="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" stroke-width="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" stroke-width="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" stroke-width="1.5" />
  </svg>
);
const IconTable = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
    <rect x="3" y="5" width="18" height="14" rx="2" stroke-width="1.5" />
    <path d="M3 10h18M9 19V5" stroke-width="1.5" />
  </svg>
);

// 목록 카드에서 노출할 최대 태그 개수
const TAG_VISIBLE_LIMIT = 5;

// 역할 토큰 → 표준 카테고리 매핑
const CORE = new Set<RoleKey>(["Design", "Publishing", "Dev"]);
function mapRoleTokenToCategory(token: string): RoleKey {
  const k = token.replace(/\s+/g, "").toLowerCase();
  if (k === "ui/uxdesign" || k === "uiuxdesign") return "Design";
  if (k === "webdesign" || k === "branddesign") return "Design";
  if (k === "front-enddev" || k === "frontenddev" || k === "frontend" || k === "front-end") return "Dev";
  if (k === "flash") return "Etc";
  if (k === "publishing" || k === "webpublishing") return "Publishing";
  if (k.includes("design")) return "Design";
  if (k.includes("dev")) return "Dev";
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
    const dev = projects.filter((p) => hasRole(p.role, "Dev")).length;
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
            <Link key={p.slug} to={`/projects/${p.slug}`} className="block h-full">
              <article className="card-portfolio card--list h-full">
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
                      <div className="text-sm text-primary/80 truncate" title={p.impact}>
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

## src\types\Project.ts

```ts
// types/Project.ts

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
  awards?: string;       // 줄바꿈 구분 텍스트 (한 줄 = 한 수상 내역)
  thumbnail: string;
  description: string;

  client?: string;
  affiliation?: string;
  positions?: string;    // "PL,PM,Lead"
  urls?: string;         // "GitHub|https://...\nDemo|https://..."
};


/**
 * 파싱된 URL(item) 구조.
 * ProjectDetail 내에서 사용되는 형태.
 */
export type UrlItem = {
  label: string;
  href: string;
};


/**
 * UI에서 사용하는 최종 가공 타입.
 * RawProject + Parsed fields (tags, positions, urls 파싱 결과)
 */
export type Project = RawProject & {
  parsedTags: string[];        // ["React", "Spring", "Figma"]
  parsedPositions: string[];   // ["PL", "PM"]
  parsedUrls: UrlItem[];       // [{label, href}, ...]
  parsedAwards: string[];      // ["2013 · 웹어워드코리아 대상 (...)", ...]
};
```

## src\types\resume.ts

```ts
export type Resume = {
  experience: {
    company: string; role: string; start: string; end?: string;
    location?: string; summary?: string; stack?: string[]; achievements?: string[];
  }[];
  education: { school: string; degree?: string; start?: string; end?: string; note?: string }[];
  skills: { category: string; items: string[] }[];
  highlights?: { slug: string; title: string; oneLiner: string }[];
};
```

## src\utils\parseProject.ts

```ts
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
 * 쉼표 구분 문자열을 string[]으로 변환한다.
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
 * RawProject → Project 변환 함수 (UI에서 쓰는 최종 구조).
 */
export function parseProject(raw: RawProject): Project {
  return {
    ...raw,

    // 태그/포지션/URL 파싱 결과
    parsedTags: parseCsvList(raw.tags),
    parsedPositions: parseCsvList(raw.positions),
    parsedUrls: parseUrls(raw.urls),
    parsedAwards: parseMultiline(raw.awards),
  };
}

/**
 * RawProject[] → Project[] 일괄 변환
 */
export function parseProjectList(rawList: RawProject[]): Project[] {
  return rawList.map((raw) => parseProject(raw));
}
```

## src\utils\useProjectsData.ts

```ts
import { useEffect, useState } from "react";
import type { RawProject, Project } from "../types/Project";
import { parseProjectList } from "./parseProject";

const SHEET_URL =
  "https://opensheet.elk.sh/1Z1JXAZLivcAmA79pm_m57jXmPEQqPzUrszRl23l8jBU/1";

export function useProjectsData() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch(SHEET_URL, { cache: "no-store" });
        const raw = (await r.json()) as RawProject[];
        const parsed = parseProjectList(raw);

        if (alive) setProjects(parsed);
      } catch (e) {
        if (alive) setError(e);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return { projects, loading, error };
}
```