import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const SHEET_URL =
  "https://opensheet.elk.sh/1Z1JXAZLivcAmA79pm_m57jXmPEQqPzUrszRl23l8jBU/1";

type Project = {
  slug: string;
  title: string;
  period: string;
  role: string;       // "Dev,Publishing,Design"
  impact: string;
  tags: string;       // "#React,#Spring,#ERP"
  thumbnail: string;
  description: string;
};

const TABS = ["All", "Design", "Publishing", "Dev"] as const;

export default function Projects() {
  const [list, setList] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>("All");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch(SHEET_URL, { cache: "no-store" });
        const data = (await r.json()) as Project[];
        if (alive) setList(data);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const filtered = useMemo(() => {
    if (activeTab === "All") return list;
    return list.filter((p) =>
      p.role.split(",").map((v) => v.trim()).includes(activeTab)
    );
  }, [list, activeTab]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-h1 font-condor mb-10">Projects</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse space-y-4">
              <div className="w-full aspect-video rounded-xl bg-neutral/30" />
              <div className="h-4 w-3/4 rounded bg-neutral/30" />
              <div className="h-4 w-1/2 rounded bg-neutral/30" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-h1 font-condor mb-10">Projects</h1>

      {/* 역할 탭 */}
      <div className="mb-12 flex flex-wrap gap-3">
        {TABS.map((tab) => {
          const active = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={[
                "px-5 py-2 rounded-full border transition",
                active
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-primary border-neutral/40 hover:bg-neutral/10 dark:bg-transparent dark:hover:bg-primary-dark/30",
              ].join(" ")}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* 카드 그리드 */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filtered.map((p) => (
          <Link key={p.slug} to={`/projects/${p.slug}`} className="block">
            <article className="card-portfolio card--list">
              {/* 이미지: 카드 안에 꽉 차게 */}
              <div className="card-media">
                <img src={p.thumbnail} alt={p.title} loading="lazy" />
              </div>

              {/* 텍스트 패딩 32px */}
              <div className="card-body">
                {/* 기간/제목/임팩트 한 줄 … */}
                <div className="space-y-1.5">
                  <div className="text-sm text-neutral truncate" title={p.period}>{p.period}</div>
                  <h2 className="text-xl font-semibold truncate" title={p.title}>{p.title}</h2>
                  <div className="text-sm text-primary/80 truncate" title={p.impact}>{p.impact}</div>
                </div>

                {/* 태그(배경색 칩) */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.split(",").map((tag) => (
                    <span key={tag} className="tag-chip">{tag.trim()}</span>
                  ))}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
