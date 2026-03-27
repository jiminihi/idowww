import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import DarkToggle from "../components/DarkToggle";
import { useScrollReveal } from "../hooks/useScrollReveal";
import IdoWWWLogo from "../components/IdoWWWLogo";

type NavItem = { to: string; label: string };
const NAV: NavItem[] = [
  { to: "/projects", label: "Works" },
  { to: "/about",    label: "About" },
];

/** html.dark 클래스 변화를 감지해 현재 테마 반환 */
function useThemeMode(): "light" | "dark" {
  const [mode, setMode] = useState<"light" | "dark">(() =>
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark")
      ? "dark"
      : "light"
  );

  useEffect(() => {
    const el = document.documentElement;
    const observer = new MutationObserver(() => {
      setMode(el.classList.contains("dark") ? "dark" : "light");
    });
    observer.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return mode;
}

export default function Header() {
  const { revealed, atTop } = useScrollReveal();
  const logoMode = useThemeMode();

  return (
    <header
      className={[
        "site-header fixed inset-x-0 top-0 z-50",
        "transition-transform duration-300 will-change-transform",
        revealed ? "translate-y-0" : "-translate-y-full",
        atTop ? "" : "site-header--floating",
      ].join(" ")}
    >
      <div className="site-header__inner">
        <h1 className="site-logo">
          <Link to="/">
            {/* ✅ 다크모드에 따라 로고 mode 자동 전환 */}
            <IdoWWWLogo size="medium" mode={logoMode} animated />
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
          {typeof window !== "undefined" ? <DarkToggle /> : null}
        </nav>
      </div>
    </header>
  );
}
