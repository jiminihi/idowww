import { useCallback, useEffect, useMemo, useState } from "react";

type Experience = {
  company: string;
  role: string;
  start: string;
  end?: string;
  location?: string;
  summary?: string;
  stack?: string[];
  achievements?: string[];
};

type Education = {
  school: string;
  degree?: string;
  start?: string;
  end?: string;
  note?: string;
};

type SkillGroup = { category: string; items: string[] };

type Highlight = { slug: string; title: string; oneLiner: string };

type Resume = {
  experience: Experience[];
  education: Education[];
  skills: SkillGroup[];
  highlights?: Highlight[];
};

export default function About() {
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // BASE_URL-safe: 서브경로 배포 대비
  const jsonUrl = useMemo(
    () => new URL("data/resume.json", import.meta.env.BASE_URL).toString(),
    []
  );

  // 비동기 fetch 로직
  const fetchResume = useCallback(
    async (signal?: AbortSignal) => {
      try {
        const r = await fetch(jsonUrl, { cache: "no-store", signal });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data: Resume = await r.json();
        setResume(data);
        setError(null);
      } catch (err: unknown) {
        // AbortController로 취소된 요청은 에러로 노출하지 않음
        if ((err as { name?: string })?.name !== "AbortError") {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        setLoading(false);
      }
    },
    [jsonUrl]
  );

  // 사용자 인터랙션(버튼)에서만 동기 setState 허용
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

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl py-16 px-4">
        <div className="mb-8 h-9 w-32 animate-pulse rounded bg-neutral/30" />
        <div className="mb-12 h-6 w-64 animate-pulse rounded bg-neutral/20" />
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl border p-6">
              <div className="mb-3 h-5 w-24 animate-pulse rounded bg-neutral/20" />
              <div className="h-4 w-full animate-pulse rounded bg-neutral/10" />
            </div>
          ))}
        </div>
        <div className="mb-4 h-6 w-28 animate-pulse rounded bg-neutral/20" />
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="h-8 animate-pulse rounded bg-neutral/10" />
          ))}
        </div>
        <div className="mb-4 h-6 w-36 animate-pulse rounded bg-neutral/20" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl border p-6">
              <div className="mb-2 h-4 w-40 animate-pulse rounded bg-neutral/10" />
              <div className="mb-2 h-4 w-2/3 animate-pulse rounded bg-neutral/10" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-neutral/10" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl py-16 px-4">
        <h1 className="mb-2 text-2xl font-semibold">About</h1>
        <p className="mb-6 text-sm text-red-600">
          데이터를 불러오는 중 오류가 발생했습니다. ({error.message})
        </p>
        <button
          onClick={retry}
          className="rounded border px-4 py-2 text-sm transition bg-white hover:bg-neutral/10"
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="mx-auto max-w-4xl py-16 px-4">
        <h1 className="mb-2 text-2xl font-semibold">About</h1>
        <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-300">
          표시할 데이터가 없습니다. <code>public/data/resume.json</code>을 확인한 뒤
          다시 시도하세요.
        </p>
        <button
          onClick={retry}
          className="rounded border px-4 py-2 text-sm transition bg-white hover:bg-neutral/10"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl py-16 px-4">
      {/* Hero */}
      <header className="mb-12">
        <h1 className="text-3xl font-bold">About</h1>
        {resume.highlights?.length ? (
          <p className="mt-2 text-neutral-600 dark:text-neutral-300">
            {resume.highlights[0].oneLiner}
          </p>
        ) : null}
      </header>

      {/* Quick highlights */}
      {resume.highlights?.length ? (
        <section className="mb-12">
          <ul className="grid gap-4 sm:grid-cols-3">
            {resume.highlights.map((h) => (
              <li
                key={h.slug}
                className="rounded-2xl border p-6 bg-white/60 dark:bg-neutral-900/40"
              >
                <div className="mb-2 text-xs uppercase tracking-wide text-neutral-500">
                  {h.slug}
                </div>
                <div className="font-medium">{h.title}</div>
                <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                  {h.oneLiner}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Skills */}
      {resume.skills?.length ? (
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold">Skills</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {resume.skills.map((sg) => (
              <div key={sg.category} className="rounded-2xl border p-6">
                <div className="mb-3 text-sm font-medium text-neutral-500">
                  {sg.category}
                </div>
                <div className="flex flex-wrap gap-2">
                  {sg.items.map((it) => (
                    <span key={it} className="tag-chip">
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Experience (cards, no hover) */}
      {sortedExp.length ? (
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold">Experience</h2>
          <div className="space-y-4">
            {sortedExp.map((e, idx) => (
              <article
                key={`${e.company}-${e.role}-${idx}`}
                className="rounded-2xl border p-6"
              >
                <header className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-medium">
                    {e.role} · <span className="font-normal">{e.company}</span>
                  </h3>
                  <span className="text-sm text-neutral-500">
                    {e.start}
                    {e.end ? ` – ${e.end}` : " – Present"}
                  </span>
                </header>
                {e.location ? (
                  <div className="mb-3 text-sm text-neutral-500">
                    {e.location}
                  </div>
                ) : null}
                {e.summary ? (
                  <p className="mb-3 leading-relaxed whitespace-pre-line">
                    {e.summary}
                  </p>
                ) : null}
                {e.achievements?.length ? (
                  <ul className="mb-3 list-disc pl-5">
                    {e.achievements.map((a, i) => (
                      <li key={i} className="leading-relaxed">
                        {a}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {e.stack?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {e.stack.map((s) => (
                      <span key={s} className="tag-chip">
                        {s}
                      </span>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {/* Education */}
      {resume.education?.length ? (
        <section>
          <h2 className="mb-4 text-xl font-semibold">Education</h2>
          <ul className="space-y-2">
            {resume.education.map((e, i) => (
              <li key={`${e.school}-${i}`} className="rounded-2xl border p-6">
                <div className="font-medium">{e.school}</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-300">
                  {[e.degree, e.note].filter(Boolean).join(" · ")}
                </div>
                <div className="mt-1 text-sm text-neutral-500">
                  {e.start || e.end
                    ? `${e.start ?? ""}${e.end ? ` – ${e.end}` : ""}`
                    : ""}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
