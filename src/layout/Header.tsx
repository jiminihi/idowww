import { Link, NavLink } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";

const NAV = [
  { to: "/about",    label: "ABOUT" },
  { to: "/projects", label: "WORKS" },
];

export default function Header() {
  const { revealed, atTop } = useScrollReveal();

  return (
    <header
      className={[
        "site-header",
        revealed ? "" : "hidden",
        atTop ? "" : "site-header--floating",
      ].join(" ").trim()}
    >
      <div className="site-header__inner">
        <h1 className="site-logo">
          <Link to="/">idoWWW</Link>
        </h1>

        <nav className="site-nav" aria-label="Primary">
          <ul>
            {NAV.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) => isActive ? "is-active" : ""}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
