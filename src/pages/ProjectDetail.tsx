import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";

const SHEET_URL =
  "https://opensheet.elk.sh/1Z1JXAZLivcAmA79pm_m57jXmPEQqPzUrszRl23l8jBU/1";

type Project = {
  slug: string;
  title: string;
  period: string;
  role: string;        // "Design,Publishing,Dev" (기존)
  impact: string;
  tags: string;
  thumbnail: string;
  description: string;

  // 신규(옵셔널)
  client?: string;       // 고객사
  affiliation?: string;  // 소속
  positions?: string;    // "PL,PM,Lead" 등
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const { revealed } = useScrollReveal();             // true: 스크롤업(헤더 보임), false: 스크롤다운(헤더 숨김)

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch(SHEET_URL, { cache: "no-store" });
        const data = (await r.json()) as Project[];
        const found = data.find((p) => p.slug === slug) || null;
        if (alive) setProject(found);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [slug]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl py-16 px-4">
        <div className="mb-6 h-8 w-2/3 animate-pulse rounded bg-neutral/30" />
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl border bg-neutral/10" />
          ))}
        </div>
        <div className="aspect-video w-full animate-pulse rounded-xl bg-neutral/20" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="mx-auto max-w-4xl py-20 px-4">
        <p className="mb-8 text-xl font-semibold">프로젝트를 찾을 수 없습니다.</p>
        <button
          onClick={() => navigate(-1)}
          className="rounded border px-4 py-2 transition hover:bg-neutral/10"
        >
          이전 페이지로
        </button>
      </div>
    );
  }

  // ===== 파생 값 구성 =====
  const positionRoles = (project.positions || "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);
  return (
    <>
      {/* 헤더와 동일 폭/패딩, 스크롤 방향에 따라 위치 변경 */}
      <div className={`sticky ${revealed ? "top-16" : "top-0"} z-40 w-full`}>
        <div className="h-12 border-b border-neutral/15 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-secondary-dark/40">
          <div className="mx-auto max-w-7xl h-full px-4 md:px-6 lg:px-8 flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="rounded border px-3 py-1 text-sm transition hover:bg-neutral/10 dark:hover:bg-secondary-dark/30"
              aria-label="이전 페이지로"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
      
      <div className="mx-auto max-w-4xl py-16 px-4">
        {/* 제목 위 고객사 + 제목 */}
        {project.client && project.client.trim() && (
          <div className="mb-1 text-[clamp(18px, 1.25vw, 20px)] leading-[1.5] text-neutral">{project.client}</div>
        )}
        <h1 className="mb-4 text-h1 font-condor">{project.title}</h1>

        {/* 메타: 기간 - 역할 - 소속 */}
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          <div className="card-portfolio card--detail">
            <div className="card-body">
              <div className="text-sm text-neutral">기간</div>
              <div className="mt-1 font-semibold truncate" title={project.period}>{project.period}</div>
            </div>
          </div>

          <div className="card-portfolio card--detail">
            <div className="card-body">
              <div className="text-sm text-neutral">역할</div>
              <div className="mt-1 font-semibold truncate" title={project.role}>{project.role || "-"}</div>
              {positionRoles.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-6">
                  {positionRoles.map((pos) => (<span key={pos} className="tag-chip">{pos}</span>))}
                </div>
              )}
            </div>
          </div>

          <div className="card-portfolio card--detail">
            <div className="card-body">
              <div className="text-sm text-neutral">소속</div>
              <div className="mt-1 font-semibold truncate" title={project.affiliation || "-"}>
                {project.affiliation && project.affiliation.trim() ? project.affiliation : "-"}
              </div>
            </div>
          </div>
        </div>

        {/* 태그 (기존 유지) */}
        <div className="mb-10 flex flex-wrap gap-8">
          {project.tags.split(",").map((tag) => (
            <span key={tag} className="tag-chip">{tag.trim()}</span>
          ))}
        </div>

        {/* 디바이스 폭 풀블리드 이미지 */}
        <div className="device-bleed mb-10">
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="block h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>


        {/* 본문 */}
        <p className="whitespace-pre-line text-body leading-relaxed text-primary/90 dark:text-secondary">
          {project.description}
        </p>
      </div>
    </>
  );
}
