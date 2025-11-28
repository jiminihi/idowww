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
