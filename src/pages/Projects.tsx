import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { useProjectsData } from "../utils/useProjectsData";
import { RoleTabs } from "../components/RoleTabs";
import type { RoleKey } from "../components/RoleTabs";
import type { Project } from "../types/Project";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { hasImage, withFallback, onImgError } from "../utils/placeholderThumbnail";

const IconGrid = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="18" height="18">
    <rect x="3" y="3" width="7" height="7" rx="1.5" strokeWidth="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" strokeWidth="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" strokeWidth="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" strokeWidth="1.5" />
  </svg>
);
const IconList = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="18" height="18">
    <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="1.5" />
    <path d="M3 10h18M9 19V5" strokeWidth="1.5" />
  </svg>
);

const TAG_VISIBLE_LIMIT = 5;
const CORE = new Set<RoleKey>(["Design", "Publishing", "Development"]);

function mapRoleTokenToCategory(token: string): RoleKey {
  const k = token.replace(/\s+/g, "").toLowerCase();
  if (k === "ui/uxdesign" || k === "uiuxdesign") return "Design";
  if (k === "webdesign"   || k === "branddesign") return "Design";
  if (["front-enddev","frontenddev","frontend","front-end"].includes(k)) return "Development";
  if (k === "flash") return "Etc";
  if (k === "publishing" || k === "webpublishing") return "Publishing";
  if (k.includes("design"))  return "Design";
  if (k.includes("dev"))     return "Development";
  if (k.includes("publish")) return "Publishing";
  return "Etc";
}

function hasRole(pRole: string, selected: RoleKey): boolean {
  if (selected === "ALL") return true;
  const roles = (pRole ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  const categories = new Set<RoleKey>(roles.map(mapRoleTokenToCategory));
  if (selected === "Etc") return ![...categories].some((c) => CORE.has(c)) && categories.size > 0;
  return categories.has(selected);
}

export default function Projects() {
  const { projects, loading, error } = useProjectsData();
  const location = useLocation();
  const navigate = useNavigate();
  useScrollAnimation();

  const initialRole = (new URLSearchParams(location.search).get("role") as RoleKey) || "ALL";
  const [role, setRole] = useState<RoleKey>(initialRole);
  useEffect(() => {
    const q = (new URLSearchParams(location.search).get("role") as RoleKey) || "ALL";
    if (q !== role) setRole(q);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const [view, setView] = useState<"card" | "table">(() =>
    new URLSearchParams(location.search).get("view") === "card" ? "card" : "table"
  );
  useEffect(() => {
    const next = new URLSearchParams(location.search).get("view") === "card" ? "card" : "table";
    if (next !== view) setView(next);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const filtered: Project[] = useMemo(
    () => (!projects ? [] : projects.filter((p) => hasRole(p.role, role))),
    [projects, role]
  );

  const counts = useMemo(() => {
    if (!projects) return undefined;
    return {
      ALL:         projects.length,
      Design:      projects.filter((p) => hasRole(p.role, "Design")).length,
      Publishing:  projects.filter((p) => hasRole(p.role, "Publishing")).length,
      Development: projects.filter((p) => hasRole(p.role, "Development")).length,
      Etc:         projects.filter((p) => hasRole(p.role, "Etc")).length,
    };
  }, [projects]);

  const updateSearch = (nextRole: RoleKey, nextView: "card" | "table") => {
    const q = new URLSearchParams(location.search);
    if (nextRole === "ALL") q.delete("role"); else q.set("role", nextRole);
    if (nextView === "table") q.delete("view"); else q.set("view", "card");
    navigate({ pathname: "/projects", search: q.toString() }, { replace: true });
  };

  const handleChangeRole = (next: RoleKey) => { setRole(next); updateSearch(next, view); };
  const handleChangeView = (next: "card" | "table") => { setView(next); updateSearch(role, next); };

  if (loading) {
    return (
      <div className="works-page">
        <h2 className="works-page-title">Works</h2>
        <div className="works-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton" style={{ aspectRatio: "16/10" }} />
          ))}
        </div>
      </div>
    );
  }
  if (error) return <div className="works-page"><h2 className="works-page-title">Works</h2><p>데이터 로딩 실패</p></div>;
  if (!projects?.length) return <div className="works-page"><h2 className="works-page-title">Works</h2><p>데이터가 없습니다.</p></div>;

  return (
    <div className="works-page">

      <h2 className="works-page-title">Works</h2>

      {/* 툴바 */}
      <div className="works-toolbar">
        <RoleTabs value={role} onChange={handleChangeRole} counts={counts} />
        <div className="view-toggle">
          <button
            type="button" aria-label="카드 보기"
            className={["view-btn", view === "card" ? "active" : ""].join(" ").trim()}
            onClick={() => handleChangeView("card")}
          >
            <IconGrid />
          </button>
          <button
            type="button" aria-label="테이블 보기"
            className={["view-btn", view === "table" ? "active" : ""].join(" ").trim()}
            onClick={() => handleChangeView("table")}
          >
            <IconList />
          </button>
        </div>
      </div>

      {/* 카드 뷰 */}
      {view === "card" && (
        <div className="works-grid">
          {filtered.map((p, i) => (
            <Link key={p.slug} to={`/projects/${p.slug}`} style={{ textDecoration: "none" }}>
              <article className={`work-card${hasImage(p.thumbnail) ? "" : " work-card--no-image"}`} data-reveal data-delay={String(Math.min(i % 3 * 100, 200))}>
                <img src={withFallback(p.thumbnail)} alt={p.title} loading="lazy" onError={onImgError} />
                <div className="work-overlay">
                  <div className="work-overlay-title">{p.title}</div>
                  <div className="work-overlay-meta">{p.period}</div>
                  <div className="work-overlay-tags">
                    {p.parsedTags.slice(0, TAG_VISIBLE_LIMIT).map((t) => (
                      <span key={t} className="work-overlay-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}

      {/* 테이블 뷰 */}
      {view === "table" && (
        <div className="works-table-wrap">
          <table className="works-table">
            <thead>
              <tr>
                <th style={{ width: "14%" }}>기간</th>
                <th style={{ width: "26%" }}>프로젝트명</th>
                <th style={{ width: "14%" }}>고객사</th>
                <th style={{ width: "14%" }}>근무사</th>
                <th style={{ width: "12%" }}>역할</th>
                <th style={{ width: "20%" }}>기술내역</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.slug}>
                  <td>{p.period}</td>
                  <td className="name-cell">
                    <Link to={`/projects/${p.slug}`}>{p.title}</Link>
                  </td>
                  <td>{p.client || ""}</td>
                  <td>{p.affiliation || ""}</td>
                  <td style={{ fontSize: "12px" }}>
                    {p.role.split(",").map((r) => (
                      <span key={r} style={{ display: "inline-block" }}>{r.trim()}</span>
                    ))}
                  </td>
                  <td style={{ fontSize: "12px" }}>{p.parsedTags.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
