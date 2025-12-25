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
          
          {/* 런타임 환경 보정: 빌드/SSR 단계 보호 */}
          {typeof window !== "undefined" ? <DarkToggle /> : null}
        </nav>
      </div>
    </header>
  );
}
