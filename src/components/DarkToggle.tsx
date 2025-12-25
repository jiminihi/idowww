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
