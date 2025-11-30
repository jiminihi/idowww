import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useProjectsData } from "../utils/useProjectsData";

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { projects, loading } = useProjectsData();
  const { revealed } = useScrollReveal();
  const [imgFailed, setImgFailed] = useState(false);

  if (loading || !projects) {
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

  const project = projects.find((p) => p.slug === slug) || null;

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

  return (
    <>
      {/* Sticky header */}
      <div className={`sticky ${revealed ? "top-16" : "top-0"} z-40 w-full`}>
        <div className="h-12 border-b border-neutral/15 bg-white/70 backdrop-blur">
          <div className="mx-auto max-w-7xl h-full px-4 md:px-6 lg:px-8 flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="rounded border px-3 py-1 text-sm transition hover:bg-neutral/10"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl py-16 px-4">
        {/* Client */}
        {project.client && (
          <div className="mb-1 text-[clamp(18px,1.25vw,20px)] leading-[1.5] text-neutral">
            {project.client}
          </div>
        )}

        {/* Title */}
        <h1 className="mb-4 text-h1 font-condor">{project.title}</h1>

        {/* 기간 / 역할 / 소속 */}
        <div className="mb-10 grid gap-4 sm:grid-cols-3">

          {/* 기간 */}
          <div className="card-portfolio card--detail">
            <div className="card-body">
              <div className="text-sm text-neutral">기간</div>
              <div className="mt-1 font-semibold truncate">{project.period}</div>
            </div>
          </div>

          {/* 역할 + 포지션 */}
          <div className="card-portfolio card--detail">
            <div className="card-body">
              <div className="text-sm text-neutral">역할</div>
              <div className="mt-1 font-semibold truncate">{project.role}</div>

              {/* parsedPositions */}
              {project.parsedPositions.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-6">
                  {project.parsedPositions.map((pos) => (
                    <span key={pos} className="tag-chip">{pos}</span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 소속 */}
          <div className="card-portfolio card--detail">
            <div className="card-body">
              <div className="text-sm text-neutral">소속</div>
              <div className="mt-1 font-semibold truncate">
                {project.affiliation || "-"}
              </div>
            </div>
          </div>
        </div>

        {/* 태그 */}
        <div className="mb-10 flex flex-wrap gap-2">
          {project.parsedTags.map((tag) => (
            <span key={tag} className="tag-chip">{tag}</span>
          ))}
        </div>

        {/* 썸네일: 값이 없거나 로드 실패 시 렌더링하지 않음 */}
        {project.thumbnail?.trim() && !imgFailed && (
          <div className="device-bleed mb-10">
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="block h-full w-full object-cover"
                loading="lazy"
                onError={() => setImgFailed(true)}
              />
            </div>
          </div>
        )}

        {/* Description */}
        <p className="whitespace-pre-line text-body leading-relaxed text-primary/90">
          {project.description}
        </p>

        {/* Awards */}
        {project.parsedAwards && project.parsedAwards.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-4 text-xl font-semibold text-primary">🏆 수상내역</h2>
            <ul className="space-y-2 text-sm leading-relaxed text-primary/90">
              {project.parsedAwards.map((aw, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-2 size-1.5 rounded-full bg-primary/60" />
                  <span>{aw}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related Links */}
        {project.parsedUrls.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-4 text-xl font-semibold text-primary">⚓ Links</h2>

            <div className="flex flex-wrap gap-4">
              {project.parsedUrls.map((u, i) => (
                <a
                  key={i}
                  href={u.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded border px-4 py-2 text-sm 
                             transition bg-white hover:bg-neutral/10"
                >
                  {u.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
