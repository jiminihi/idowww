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
