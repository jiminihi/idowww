import { Link } from "react-router-dom";
import { useProjectsData } from "../utils/useProjectsData";
import type { Project } from "../types/Project";

// Projects.tsx와 동일한 SVG 플레이스홀더
const SVG_PLACEHOLDER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">
  <rect width="100%" height="100%" fill="#E5E7EB"/>
  <g font-family="system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Arial" font-size="56" fill="#9CA3AF">
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">No Image</text>
  </g>
</svg>`;
const PLACEHOLDER_THUMBNAIL = `data:image/svg+xml;utf8,${encodeURIComponent(SVG_PLACEHOLDER)}`;
const withFallback = (src?: string) =>
  src && src.trim() ? src : PLACEHOLDER_THUMBNAIL;

// 기간 문자열에서 정렬용 key 추출
function getPeriodEndKey(period?: string): number {
  if (!period) return 0;
  const cleaned = period.replace(/[^\d]/g, " ");
  const parts = cleaned.split(" ").map((p) => p.trim()).filter(Boolean);
  if (parts.length === 0) return 0;
  if (parts.length === 1) {
    const only = parts[0];
    if (only.length === 4) return (Number(only) || 0) * 100 + 12;
    return Number(only) || 0;
  }
  const last = parts[parts.length - 1];
  const prev = parts[parts.length - 2];
  if (prev.length === 4 && last.length <= 2)
    return (Number(prev) || 0) * 100 + (Number(last) || 1);
  if (last.length === 4) return (Number(last) || 0) * 100 + 12;
  return (Number(last.slice(0, 4)) || 0) * 100 + (Number(last.slice(4)) || 12);
}

// ─── SNS 링크 ────────────────────────────────────────────────
// TODO: 실제 프로필 URL로 교체하세요
const SNS_LINKS = [
  { label: "LinkedIn",  href: "" }, // 예: "https://linkedin.com/in/idowww"
  { label: "GitHub",    href: "" }, // 예: "https://github.com/idowww"
  { label: "Behance",   href: "" }, // 예: "https://behance.net/idowww"
  { label: "Instagram", href: "" }, // 예: "https://instagram.com/idowww"
] as const;

export default function Home() {
  const { projects, loading, error } = useProjectsData();

  const selectedProjects: Project[] =
    !loading && !error && projects
      ? projects
          .filter((p) => p.featured)
          .sort((a, b) => getPeriodEndKey(b.period) - getPeriodEndKey(a.period))
          .slice(0, 3)
      : [];

  return (
    <div id="home-page">
      {/* Hero Section */}
      <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 text-center md:px-10">
        <h1 className="mb-5 text-[42px] tracking-[-0.06em] md:text-[72px] lg:text-[96px]">
          IdoWWW
        </h1>
        <div className="mb-2 text-lg text-body md:text-2xl">
          UI/UX Designer &amp; Publishing
        </div>
        <div className="text-sm text-subtext">
          Crafting digital experiences through code and design
        </div>
        <div className="pointer-events-none absolute bottom-10 text-sm text-neutral-500 animate-bounce">
          ↓ Scroll to explore
        </div>
      </section>

      {/* Featured Works */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <h2 className="mb-12 text-center text-[32px] font-light md:mb-16 md:text-[40px] lg:text-[48px]">
          Selected Works
        </h2>

        {loading && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <article key={i} className="card-portfolio card--list animate-pulse">
                <div className="card-media bg-neutral/10" />
                <div className="card-body space-y-2">
                  <div className="h-3 w-24 rounded bg-neutral/10" />
                  <div className="h-4 w-40 rounded bg-neutral/10" />
                  <div className="h-3 w-32 rounded bg-neutral/10" />
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="h-6 w-12 rounded-full bg-neutral/10" />
                    <span className="h-6 w-10 rounded-full bg-neutral/10" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && (error || selectedProjects.length === 0) && (
          <div className="text-center text-sm text-neutral">
            표시할 대표 프로젝트가 없습니다.
          </div>
        )}

        {!loading && !error && selectedProjects.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {selectedProjects.map((p) => {
              const roleChips = Array.from(
                new Set(
                  (p.role ?? "").split(",").map((s) => s.trim()).filter(Boolean)
                )
              );
              return (
                <Link key={p.slug} to={`/projects/${p.slug}`} className="block">
                  <article className="card-portfolio card--list">
                    <div className="card-media">
                      <img src={withFallback(p.thumbnail)} alt={p.title} loading="lazy" />
                    </div>
                    <div className="card-body">
                      <div className="text-sm text-neutral truncate" title={p.period}>{p.period}</div>
                      <h2 className="text-xl font-semibold truncate" title={p.title}>{p.title}</h2>
                      {p.impact && (
                        <div className="text-sm text-primary/80 truncate" title={p.impact}>{p.impact}</div>
                      )}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {roleChips.map((r) => (
                          <span key={r} className="tag-chip">{r}</span>
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
      <section className="mx-auto max-w-[800px] px-6 py-24 text-center md:px-10 md:py-32">
        <h2 className="mb-10 text-[28px] font-light md:text-[32px] lg:text-[36px]">
          Hello, I&apos;m idoWWW
        </h2>
        <p className="mb-10 text-body leading-relaxed md:text-lg">
          I'm a creative developer based in Seoul, specializing in translating
          ideas into elegant digital solutions. With a background in both design
          and development, I bridge the gap between aesthetics and functionality.
        </p>
        <Link
          to="/about"
          className="inline-block border border-primary px-10 py-4 text-sm font-medium transition-colors hover:bg-primary hover:text-white"
        >
          More About Me →
        </Link>
      </section>

      {/* Contact Section */}
      <section className="bg-muted/40 px-6 py-24 text-center md:px-10 md:py-32">
        <h2 className="mb-8 text-[32px] font-light md:text-[40px] lg:text-[48px]">
          Let&apos;s work together
        </h2>
        <a
          href="mailto:idowww11@gmail.com"
          className="mb-10 inline-block text-2xl text-primary transition-opacity hover:opacity-70"
        >
          idowww11@gmail.com
        </a>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-neutral">
          {SNS_LINKS.filter((s) => s.href).map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="transition-colors hover:text-primary"
              target="_blank"
              rel="noreferrer"
            >
              {label}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
