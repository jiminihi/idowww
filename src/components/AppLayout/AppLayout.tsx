import { Outlet, NavLink } from "react-router-dom";
export default function AppLayout(){
  return (
    <>
      <header>
        <nav>
          <NavLink to="/">Home</NavLink>{" "}
          <NavLink to="/projects">Projects</NavLink>{" "}
          <NavLink to="/about">About</NavLink>
        </nav>
      </header>
      <main><Outlet /></main>
      <footer>© 포트폴리오</footer>
    </>
  );
}
