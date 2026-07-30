import { Link } from "react-router-dom";
import { useProjectsData } from "../utils/useProjectsData";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import type { Project } from "../types/Project";
import { hasImage, withFallback, onImgError } from "../utils/placeholderThumbnail";

function getPeriodEndKey(period?: string): number {
  if (!period) return 0;
  const cleaned = period.replace(/[^\d]/g, " ");
  const parts = cleaned.split(" ").map((p) => p.trim()).filter(Boolean);
  if (parts.length === 0) return 0;
  if (parts.length === 1) {
    const only = parts[0];
    return only.length === 4 ? (Number(only) || 0) * 100 + 12 : Number(only) || 0;
  }
  const last = parts[parts.length - 1];
  const prev = parts[parts.length - 2];
  if (prev.length === 4 && last.length <= 2) return (Number(prev) || 0) * 100 + (Number(last) || 1);
  if (last.length === 4) return (Number(last) || 0) * 100 + 12;
  return (Number(last.slice(0, 4)) || 0) * 100 + (Number(last.slice(4)) || 12);
}

export default function Home() {
  const { projects, loading, error } = useProjectsData();
  useScrollAnimation();

  const selectedProjects: Project[] =
    !loading && !error && projects
      ? projects
          .filter((p) => p.featured)
          .sort((a, b) => getPeriodEndKey(b.period) - getPeriodEndKey(a.period))
          .slice(0, 4)
      : [];

  return (
    <div id="home-page">

      {/* Hero */}
      <section className="hero">
        <h1>idoWWW</h1>
        <div className="subtitle">UI/UX 디자인부터 웹퍼블리싱까지</div>
        <div className="description">웹 하는 사람</div>
        <div className="scroll-indicator">↓ Scroll to explore</div>
      </section>

      {/* Selected Works */}
      <section className="featured-works">
        <h2 className="section-title" data-reveal>Selected Works</h2>

        {loading && (
          <div className="works-grid">
            {[0, 1, 2].map((i) => (
              <div key={i} className="skeleton" style={{ aspectRatio: "16/10" }} />
            ))}
          </div>
        )}

        {!loading && (error || selectedProjects.length === 0) && (
          <p style={{ textAlign: "center", fontSize: "14px", color: "#999999" }}>
            표시할 대표 프로젝트가 없습니다.
          </p>
        )}

        {!loading && !error && selectedProjects.length > 0 && (
          <div className="works-grid">
            {selectedProjects.map((p, i) => {
              const roleChips = Array.from(
                new Set((p.role ?? "").split(",").map((s) => s.trim()).filter(Boolean))
              );
              return (
                <Link key={p.slug} to={`/projects/${p.slug}`} style={{ textDecoration: "none" }}>
                  <article className={`work-card${hasImage(p.thumbnail) ? "" : " work-card--no-image"}`} data-reveal data-delay={String(i * 100)}>
                    <img src={withFallback(p.thumbnail)} alt={p.title} loading="lazy" onError={onImgError} />
                    <div className="work-overlay">
                      <div className="work-overlay-title">{p.title}</div>
                      <div className="work-overlay-meta">{p.period}</div>
                      <div className="work-overlay-tags">
                        {roleChips.map((r) => (
                          <span key={r} className="work-overlay-tag">{r}</span>
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
      <section className="brief-intro">
        <h2 className="section-title" data-reveal>Hello, I'm idoWWW</h2>
        <p data-reveal data-delay="100">
          디자이너와 개발자 사이, 의도를 기술 언어로 정리해 프로젝트를 완성하는 20년 경력의 웹 하는 사람입니다.<br/> 
          기준을 세우고 실행합니다.
        </p>
        <div data-reveal data-delay="200">
          <Link to="/about" className="btn">More About Me →</Link>
        </div>
      </section>

      {/* Contact */}
      <section className="contact-section">
        <h2 className="section-title" data-reveal>Let's work together</h2>
        <a href="mailto:idowww11@gmail.com" className="contact-email" data-reveal data-delay="100">idowww11@gmail.com</a>
        <div className="social-links" data-reveal data-delay="200">
          <a href="https://linkedin.com/in/idowww" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/jiminihi" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://behance.net/idowww" target="_blank" rel="noreferrer">Behance</a>
          <a href="https://instagram.com/idowww" target="_blank" rel="noreferrer">Instagram</a>
        </div>
      </section>

    </div>
  );
}
