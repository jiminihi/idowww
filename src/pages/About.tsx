import { useCallback, useEffect, useState, useMemo } from "react";
import type { Resume } from "../types/resume";

const PROFILE_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500'%3E%3Crect fill='%23f0f0f0' width='400' height='500'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-family='Arial' font-size='20'%3EProfile Image%3C/text%3E%3C/svg%3E";

// ─── SNS 링크 ────────────────────────────────────────────────
// TODO: 실제 프로필 URL로 교체하세요
const SNS_LINKS = [
  { label: "LinkedIn — linkedin.com/in/idowww",  href: "https://linkedin.com/in/idowww" }, // 예: "https://linkedin.com/in/idowww"
  { label: "GitHub — github.com/idowww",          href: "https://github.com/idowww" }, // 예: "https://github.com/idowww"
  { label: "Codepen — codepen.io/idowww",          href: "https://codepen.io/idowww" }, // 예: "https://codepen.io/idowww"
  { label: "Behance — behance.net/idowww",        href: "https://behance.net/idowww" }, // 예: "https://behance.net/idowww"
  { label: "Instagram — @idowww", href: "https://instagram.com/idowww" }, // 예: "https://instagram.com/idowww"
] as const;

export default function About() {
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const resumePath = useMemo(() => "/data/resume.json", []);

  const fetchResume = useCallback(
    async (signal?: AbortSignal) => {
      try {
        const r = await fetch(resumePath, { cache: "no-store", signal });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data: Resume = await r.json();
        setResume(data);
        setError(null);
      } catch (err: unknown) {
        if ((err as { name?: string })?.name !== "AbortError") {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        setLoading(false);
      }
    },
    [resumePath]
  );

  const retry = () => {
    setLoading(true);
    setError(null);
    void fetchResume();
  };

  useEffect(() => {
    const ctrl = new AbortController();
    void fetchResume(ctrl.signal);
    return () => ctrl.abort();
  }, [fetchResume]);

  const sortedExp = useMemo(() => {
    if (!resume?.experience) return [];
    const parse = (s?: string) => (s ? Date.parse(s) : 0);
    return [...resume.experience].sort((a, b) => {
      const ae = parse(a.end) || parse(a.start);
      const be = parse(b.end) || parse(b.start);
      return be - ae;
    });
  }, [resume]);

  const formatPeriod = (start: string, end?: string) =>
    end && end.trim() ? `${start} – ${end}` : `${start} – Present`;

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-24">
        <div className="mb-10 h-8 w-32 animate-pulse rounded bg-neutral/20" />
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
          <div className="aspect-[4/5] w-full animate-pulse rounded-2xl bg-neutral/15" />
          <div className="space-y-4">
            <div className="h-7 w-40 animate-pulse rounded bg-neutral/20" />
            <div className="h-4 w-48 animate-pulse rounded bg-neutral/15" />
            <div className="h-3 w-32 animate-pulse rounded bg-neutral/10" />
            <div className="mt-4 space-y-3">
              <div className="h-4 w-full animate-pulse rounded bg-neutral/10" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-neutral/10" />
              <div className="h-4 w-4/6 animate-pulse rounded bg-neutral/10" />
            </div>
            <div className="mt-6 h-10 w-40 animate-pulse rounded-full bg-neutral/15" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-24">
        <h1 className="mb-2 text-2xl font-semibold text-primary">About</h1>
        <p className="mb-6 text-sm text-red-600">
          데이터를 불러오는 중 오류가 발생했습니다. ({error.message})
        </p>
        <button
          type="button"
          onClick={retry}
          className="rounded border bg-surface px-4 py-2 text-sm transition hover:bg-neutral/10"
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-24">
        <h1 className="mb-2 text-2xl font-semibold text-primary">About</h1>
        <p className="mb-6 text-sm text-neutral">
          표시할 데이터가 없습니다.{" "}
          <code>public/data/resume.json</code>을 확인한 뒤 다시 시도하세요.
        </p>
        <button
          type="button"
          onClick={retry}
          className="rounded border bg-surface px-4 py-2 text-sm transition hover:bg-neutral/10"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    // bg-white 하드코딩 제거 → 테마 토큰 사용
    <div className="bg-base text-primary dark:bg-base-dark dark:text-primary-dark">
      <div className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-24">

        {/* Profile Section */}
        <section className="mb-16 grid gap-10 md:mb-24 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] md:items-start">
          <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-neutral/10">
            <img
              src={PROFILE_PLACEHOLDER}
              alt="Profile"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="profile-content">
            <h1 className="mb-2 text-[32px] font-light tracking-tight md:text-[40px]">
              idoWWW
            </h1>
            <div className="mb-2 text-sm uppercase tracking-[0.18em] text-neutral">
              UI/UX Designer &amp; Publishing
            </div>
            <div className="mb-8 text-xs font-medium text-neutral/80">
              프리랜서 프로젝트 진행 가능
            </div>

            <div className="space-y-3 text-sm leading-relaxed text-primary/90 md:text-body">
              <p>
                서울을 기반으로 활동하는 UI/UX 디자이너이자 퍼블리셔로, 사려
                깊은 디지털 경험을 만드는 데 집중하고 있습니다.
              </p>
              <p>
                디자인과 개발을 모두 경험해본 덕분에, 시각적인 완성도와
                인터랙션, 그리고 퍼포먼스를 함께 고려한 웹사이트와
                애플리케이션을 만드는 일을 좋아합니다.
              </p>
              <p>
                깔끔한 미학과 기능적 디자인의 접점을 탐색하면서, 항상 최종
                사용자를 프로세스의 중심에 두는 것을 원칙으로 삼습니다.
              </p>
              <p>
                창의성과 기술, 그리고 문제 해결에 대한 호기심이 만나는 지점에서
                좋은 결과물이 나온다고 믿습니다.
              </p>
            </div>

            {resume.highlights?.length ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {resume.highlights.map((h) => (
                  <span key={h.slug} className="tag-chip">
                    {h.title}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="mt-8">
              <a
                href="/data/IdoWWW_Resume.pdf"
                className="inline-block border border-primary px-8 py-3 text-sm transition-colors hover:bg-primary hover:text-white"
              >
                이력서 다운로드
              </a>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16 rounded-3xl bg-neutral/5 px-6 py-12 md:mb-24 md:px-10 md:py-16">
          <h2 className="mb-10 text-center text-[28px] font-light md:text-[32px]">
            Skills &amp; Expertise
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {resume.skills?.length
              ? resume.skills.map((sg) => (
                  <div key={sg.category}>
                    <h3 className="mb-4 border-b border-primary/40 pb-3 text-sm font-semibold uppercase tracking-[0.14em] text-neutral">
                      {sg.category}
                    </h3>
                    <ul className="space-y-2 text-sm leading-relaxed text-primary/90">
                      {sg.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))
              : null}
          </div>
        </section>

        {/* Experience Section */}
        {sortedExp.length ? (
          <section className="mb-16 md:mb-24">
            <h2 className="mb-10 text-center text-[28px] font-light md:text-[32px]">
              Experience
            </h2>
            <div className="space-y-10">
              {sortedExp.map((e, idx) => (
                <article
                  key={`${e.company}-${e.role}-${idx}`}
                  className="border-b border-neutral/20 pb-10 last:border-b-0 last:pb-0"
                >
                  <div className="grid gap-6 md:grid-cols-[160px_minmax(0,1fr)] md:gap-10">
                    <div className="text-xs uppercase tracking-[0.16em] text-neutral">
                      <div>{formatPeriod(e.start, e.end)}</div>
                      {e.location && (
                        <div className="mt-2 text-[11px] text-neutral/80">
                          {e.location}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="mb-1 text-base font-semibold md:text-lg">
                        {e.role}
                      </h3>
                      <div className="mb-4 text-sm text-neutral">
                        {e.company}
                        {e.location ? ` / ${e.location}` : ""}
                      </div>
                      {e.summary && (
                        <p className="mb-3 whitespace-pre-line text-sm leading-relaxed text-primary/90">
                          {e.summary}
                        </p>
                      )}
                      {e.achievements?.length ? (
                        <ul className="mb-3 space-y-1.5 text-sm leading-relaxed text-primary/90">
                          {e.achievements.map((a, i) => (
                            <li key={i} className="flex gap-2">
                              <span className="mt-1 inline-block h-1 w-1 rounded-full bg-primary/70" />
                              <span>{a}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {e.stack?.length ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {e.stack.map((s) => (
                            <span key={s} className="tag-chip">{s}</span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {/* Education */}
        {resume.education?.length ? (
          <section className="mb-16 md:mb-24">
            <h2 className="mb-6 text-[24px] font-semibold text-primary">
              Education
            </h2>
            <ul className="space-y-4">
              {resume.education.map((ed, i) => (
                <li
                  key={`${ed.school}-${i}`}
                  className="rounded-2xl border border-neutral/20 px-5 py-4"
                >
                  <div className="text-sm font-semibold text-primary">{ed.school}</div>
                  {(ed.degree || ed.note) && (
                    <div className="mt-1 text-xs text-neutral">
                      {[ed.degree, ed.note].filter(Boolean).join(" · ")}
                    </div>
                  )}
                  {(ed.start || ed.end) && (
                    <div className="mt-1 text-xs text-neutral/80">
                      {ed.start ?? ""}{" "}
                      {ed.end ? `– ${ed.end}` : ed.start ? "–" : ""}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* Services Section */}
        <section className="mb-16 rounded-3xl bg-neutral/5 px-6 py-12 md:mb-24 md:px-10 md:py-16">
          <h2 className="mb-10 text-center text-[28px] font-light md:text-[32px]">
            What I Do
          </h2>
          <div className="space-y-10">
            {[
              {
                num: "01.",
                title: "Web Design",
                desc: "사용성과 미학에 중점을 둔 웹사이트 및 웹 애플리케이션을 위한 현대적이고 사용자 중심적인 인터페이스를 제작합니다.",
              },
              {
                num: "02.",
                title: "Frontend Development",
                desc: "최신 프레임워크와 웹 개발의 모범 사례를 활용하여 반응형이며 성능이 우수한 웹사이트를 구축합니다.",
              },
              {
                num: "03.",
                title: "UI/UX Consulting",
                desc: "사용자 경험 전략, 인터페이스 디자인 및 인터랙션 패턴에 대한 전문적인 가이드를 제공합니다.",
              },
              {
                num: "04.",
                title: "Design Systems",
                desc: "디지털 제품 전반에 걸쳐 일관성과 확장성을 보장하는 포괄적인 디자인 시스템을 개발합니다.",
              },
            ].map(({ num, title, desc }) => (
              <div key={num} className="service-item">
                <h3 className="mb-3 text-xl font-medium">
                  <span className="mr-3 text-neutral/60">{num}</span>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-primary/90">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Personal Section */}
        <section className="mb-16 md:mb-24">
          <h2 className="mb-6 text-[28px] font-light md:text-[32px]">일상의 모습</h2>
          <p className="mb-5 text-sm leading-relaxed text-primary/90">
            디자인하거나 코딩하지 않을 때는 이런 것들을 즐깁니다:
          </p>
          <ul className="space-y-2 text-sm leading-relaxed text-primary/90">
            <li>아날로그 사진 촬영</li>
            <li>디자인 철학에 관한 독서</li>
            <li>새로운 요리 레시피 실험</li>
            <li>도시를 걸으며 산책하기</li>
          </ul>
        </section>

        {/* Contact Section */}
        <section className="rounded-3xl bg-neutral/5 px-6 py-12 text-center md:px-10 md:py-16">
          <h2 className="mb-6 text-[28px] font-light md:text-[32px]">함께 해요</h2>
          <p className="mx-auto mb-6 max-w-xl text-sm leading-relaxed text-primary/90">
            새로운 프로젝트, 창의적인 아이디어 또는 비전을 함께할 기회에 대해
            언제나 열려 있습니다.
          </p>
          {/* mailto: 앞 탭 문자 제거 */}
          <a
            href="mailto:idowww11@gmail.com"
            className="mb-6 inline-block text-xl text-primary transition-opacity hover:opacity-60"
          >
            idowww11@gmail.com
          </a>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-neutral md:text-sm">
            {SNS_LINKS.filter((s) => s.href).map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-primary"
              >
                {label}
              </a>
            ))}
            {/* SNS URL이 모두 비어있을 때 임시 안내 */}
            {SNS_LINKS.every((s) => !s.href) && (
              <span className="text-neutral/50 text-xs">
                (SNS 링크는 About.tsx의 SNS_LINKS 배열에서 추가하세요)
              </span>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
