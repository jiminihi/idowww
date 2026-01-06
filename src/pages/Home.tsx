// src/pages/Home.tsx
import { Link } from "react-router-dom";
import { useProjectsData } from "../utils/useProjectsData";
import type { Project } from "../types/Project";

const SVG_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500'%3E%3Crect fill='%23f0f0f0' width='800' height='500'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-family='Arial' font-size='24'%3ENo%20Image%3C/text%3E%3C/svg%3E";

// "2025.09–2025.09", "2023.10~2023.12", "2019~2021" 같은 문자열에서
// 끝나는 년/월 기준 정렬 키(YYYYMM)를 만든다.
function getPeriodEndKey(period?: string): number {
  if (!period) return 0;

  const cleaned = period.replace(/[^\d]/g, " ");
  const nums = cleaned
    .split(" ")
    .map((n) => n.trim())
    .filter(Boolean);

  if (nums.length >= 2) {
    const last = nums[nums.length - 1];
    const prev = nums[nums.length - 2];

    // "2023 12" → 202312
    if (prev.length === 4 && last.length <= 2) {
      const year = Number(prev) || 0;
      const month = Number(last) || 1;
      return year * 100 + month;
    }

    // "2019 2021" → 끝나는 연도 기준 202112
    if (last.length === 4) {
      const year = Number(last) || 0;
      return year * 100 + 12;
    }
  }

  if (nums.length === 1 && nums[0].length === 4) {
    const year = Number(nums[0]) || 0;
    return year * 100 + 12;
  }

  return 0;
}

export default function Home() {
  const { projects, loading, error } = useProjectsData();

  // featured = true 인 프로젝트 중 최신 3개
  const selectedProjects: Project[] =
    !loading && !error && projects
      ? projects
          .filter((p) => p.featured)
          .sort(
            (a, b) => getPeriodEndKey(b.period) - getPeriodEndKey(a.period)
          )
          .slice(0, 3)
      : [];

  return (
    <div id="home-page" className="bg-white text-black">
      {/* Hero Section */}
      <section
        className="
          relative
          flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center
          px-6 text-center
          md:px-10
        "
      >
        <h1
          className="
            mb-5
            text-[42px] font-light tracking-[-0.06em]
            md:text-[72px]
            lg:text-[96px]
          "
        >
          IdoWWW
        </h1>

        <div
          className="
            mb-2
            text-lg text-[#666666]
            md:text-2xl
          "
        >
          UI/UX Designer &amp; Publishing
        </div>

        <div className="text-sm text-[#999999] md:text-base">
          Crafting digital experiences through code and design
        </div>

        <div
          className="
            pointer-events-none
            absolute bottom-10
            text-sm text-[#999999]
            animate-bounce
          "
        >
          ↓ Scroll to explore
        </div>
      </section>

      {/* Featured Works (Selected Works) */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <h2
          className="
            mb-12 text-center
            text-[32px] font-light
            md:mb-16 md:text-[40px]
            lg:text-[48px]
          "
        >
          Selected Works
        </h2>

        {/* 로딩 상태: 카드 그리드 스켈레톤 */}
        {loading && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <article
                key={i}
                className="card-portfolio card--list animate-pulse"
              >
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

        {/* 에러 or featured 없음 */}
        {!loading && (error || selectedProjects.length === 0) && (
          <div className="text-center text-sm text-neutral">
            표시할 대표 프로젝트가 없습니다.
          </div>
        )}

        {/* 실제 featured 프로젝트 3개 */}
        {!loading && !error && selectedProjects.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {selectedProjects.map((p) => {
              // role 문자열을 칩용 배열로 변환 (중복 제거)
              const roleChips = Array.from(
                new Set(
                  (p.role ?? "")
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                )
              );

              return (
                <Link
                  key={p.slug}
                  to={`/projects/${p.slug}`}
                  className="block"
                >
                  {/* Projects.tsx 카드와 동일한 마크업/클래스 */}
                  <article className="card-portfolio card--list">
                    <div className="card-media">
                      <img
                        src={p.thumbnail || SVG_PLACEHOLDER}
                        alt={p.title}
                        loading="lazy"
                      />
                    </div>

                    <div className="card-body">
                      <div
                        className="text-sm text-neutral truncate"
                        title={p.period}
                      >
                        {p.period}
                      </div>

                      <h2
                        className="text-xl font-semibold truncate"
                        title={p.title}
                      >
                        {p.title}
                      </h2>

                      {p.impact && (
                        <div
                          className="text-sm text-primary/80 truncate"
                          title={p.impact}
                        >
                          {p.impact}
                        </div>
                      )}

                      <div className="mt-3 flex flex-wrap gap-2">
                        {roleChips.map((r) => (
                          <span key={r} className="tag-chip">
                            {r}
                          </span>
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
        <h2
          className="
            mb-10
            text-[28px] font-light
            md:text-[32px]
            lg:text-[36px]
          "
        >
          Hello, I&apos;m idoWWW
        </h2>
        <p className="mb-10 text-base leading-relaxed text-[#333333] md:text-lg">
          I&apos;m a creative developer based in Seoul, specializing in
          translating ideas into elegant digital solutions. With a background in
          both design and development, I bridge the gap between aesthetics and
          functionality.
        </p>

        <Link
          to="/about"
          className="
            inline-block
            border border-black px-10 py-4
            text-sm
            transition-colors
            hover:bg-black hover:text-white
          "
        >
          More About Me →
        </Link>
      </section>

      {/* Contact Section */}
      <section className="bg-[#FAFAFA] px-6 py-24 text-center md:px-10 md:py-32">
        <h2
          className="
            mb-8
            text-[32px] font-light
            md:text-[40px]
            lg:text-[48px]
          "
        >
          Let&apos;s work together
        </h2>

        <a
          href="mailto:hello@idowww.com"
          className="
            mb-10 inline-block
            text-2xl
            text-black
            transition-opacity
            hover:opacity-50
          "
        >
          hello@idowww.com
        </a>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-[#666666]">
          <a
            href="#"
            className="transition-colors hover:text-black"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="#"
            className="transition-colors hover:text-black"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            href="#"
            className="transition-colors hover:text-black"
            target="_blank"
            rel="noreferrer"
          >
            Behance
          </a>
          <a
            href="#"
            className="transition-colors hover:text-black"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </div>
      </section>
    </div>
  );
}
