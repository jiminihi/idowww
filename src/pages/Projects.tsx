// Projects.tsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import type React from "react";
import { useProjectsData } from "../utils/useProjectsData";
import { RoleTabs } from "../components/RoleTabs";
import type { RoleKey } from "../components/RoleTabs";
import type { Project } from "../types/Project";

// 16:9 비율 SVG 플레이스홀더 (카드 뷰 전용)
const SVG_PLACEHOLDER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">
  <rect width="100%" height="100%" fill="#E5E7EB"/>
  <g font-family="system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Arial" font-size="56" fill="#9CA3AF">
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">No Image</text>
  </g>
</svg>`;
const PLACEHOLDER_THUMBNAIL = `data:image/svg+xml;utf8,${encodeURIComponent(SVG_PLACEHOLDER)}`;
const withFallback = (src?: string) => (src && src.trim() ? src : PLACEHOLDER_THUMBNAIL);
const onImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  if (e.currentTarget.src !== PLACEHOLDER_THUMBNAIL) {
    e.currentTarget.src = PLACEHOLDER_THUMBNAIL;
  }
};

// --- Icons (텍스트 대신 사용) ---
const IconGrid = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" strokeWidth="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" strokeWidth="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" strokeWidth="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" strokeWidth="1.5" />
  </svg>
);
const IconTable = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
    <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="1.5" />
    <path d="M3 10h18M9 19V5" strokeWidth="1.5" />
  </svg>
);

// 목록 카드에서 노출할 최대 태그 개수
const TAG_VISIBLE_LIMIT = 5;

// 역할 토큰 → 표준 카테고리 매핑
const CORE = new Set<RoleKey>(["Design", "Publishing", "Development"]);
function mapRoleTokenToCategory(token: string): RoleKey {
  const k = token.replace(/\s+/g, "").toLowerCase();
  if (k === "ui/uxdesign" || k === "uiuxdesign") return "Design";
  if (k === "webdesign" || k === "branddesign") return "Design";
  if (k === "front-enddev" || k === "frontenddev" || k === "frontend" || k === "front-end") return "Development";
  if (k === "flash") return "Etc";
  if (k === "publishing" || k === "webpublishing") return "Publishing";
  if (k.includes("design")) return "Design";
  if (k.includes("dev")) return "Development";
  if (k.includes("publish")) return "Publishing";
  return "Etc";
}

function hasRole(pRole: string, selected: RoleKey): boolean {
  if (selected === "ALL") return true;
  const roles = (pRole ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const categories = new Set<RoleKey>(roles.map(mapRoleTokenToCategory));
  if (selected === "Etc") {
    const hasCore = [...categories].some((c) => CORE.has(c));
    return !hasCore && categories.size > 0;
  }
  return categories.has(selected);
}

export default function Projects() {
  const { projects, loading, error } = useProjectsData();
  const location = useLocation();
  const navigate = useNavigate();

  // URL ?role=... ↔ 상태
  const initialRole = (new URLSearchParams(location.search).get("role") as RoleKey) || "ALL";
  const [role, setRole] = useState<RoleKey>(initialRole);
  useEffect(() => {
    const qRole = (new URLSearchParams(location.search).get("role") as RoleKey) || "ALL";
    if (qRole !== role) setRole(qRole);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  // URL ?view=card|table ↔ 상태 (기본값 table)
  const [view, setView] = useState<"card" | "table">(() => {
    const q = (new URLSearchParams(location.search).get("view") as "card" | "table") || "table";
    return q === "card" ? "card" : "table";
  });
  useEffect(() => {
    const q = (new URLSearchParams(location.search).get("view") as "card" | "table") || "table";
    const next = q === "card" ? "card" : "table";
    if (next !== view) setView(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const filtered: Project[] = useMemo(() => {
    if (!projects) return [];
    return projects.filter((p) => hasRole(p.role, role));
  }, [projects, role]);

  // 카운트 계산(작은 텍스트용)
  const counts = useMemo(() => {
    if (!projects) return undefined;
    const all = projects.length;
    const design = projects.filter((p) => hasRole(p.role, "Design")).length;
    const publishing = projects.filter((p) => hasRole(p.role, "Publishing")).length;
    const dev = projects.filter((p) => hasRole(p.role, "Development")).length;
    const etc = projects.filter((p) => hasRole(p.role, "Etc")).length;
    return { ALL: all, Design: design, Publishing: publishing, Dev: dev, Etc: etc } as const;
  }, [projects]);

  const updateSearch = (nextRole: RoleKey, nextView: "card" | "table") => {
    const q = new URLSearchParams(location.search);
    if (nextRole === "ALL") q.delete("role");
    else q.set("role", nextRole);
    // 기본값 table → table이면 파라미터 제거, card면 설정
    if (nextView === "table") q.delete("view");
    else q.set("view", "card");
    navigate({ pathname: "/projects", search: q.toString() }, { replace: true });
  };

  const handleChangeRole = (next: RoleKey) => {
    setRole(next);
    updateSearch(next, view);
  };
  const handleChangeView = (next: "card" | "table") => {
    setView(next);
    updateSearch(role, next);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl py-20 px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-video animate-pulse rounded-xl bg-neutral/20" />
          ))}
        </div>
      </div>
    );
  }
  if (error) return <div className="mx-auto max-w-7xl py-20 px-4">데이터 로딩 실패</div>;
  if (!projects || projects.length === 0) return <div className="mx-auto max-w-7xl py-20 px-4">데이터가 없습니다.</div>;

  return (
    <div className="mx-auto max-w-7xl py-20 px-4">
      {/* 상단: 역할 탭 + 뷰 토글 */}
      <div className="mb-6 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
        <RoleTabs value={role} onChange={handleChangeRole} counts={counts} />

        {/* 카드|테이블 토글 - 외곽 보더 제거, 가운데 분리선만, 아이콘 사용 */}
        <div className="inline-flex items-stretch rounded-lg bg-muted/60 p-1">
          <button
            type="button"
            aria-label="카드 보기"
            aria-pressed={view === "card"}
            onClick={() => handleChangeView("card")}
            className={[
              "px-3 py-2 rounded-md transition",
              view === "card" ? "bg-primary/10 text-primary" : "text-primary/60 hover:text-primary",
            ].join(" ")}
          >
            <IconGrid />
            <span className="sr-only">Card</span>
          </button>
          <div className="w-px self-stretch bg-border/60" />
          <button
            type="button"
            aria-label="테이블 보기"
            aria-pressed={view === "table"}
            onClick={() => handleChangeView("table")}
            className={[
              "px-3 py-2 rounded-md transition",
              view === "table" ? "bg-primary/10 text-primary" : "text-primary/60 hover:text-primary",
            ].join(" ")}
          >
            <IconTable />
            <span className="sr-only">Table</span>
          </button>
        </div>
      </div>

      {/* 뷰 모드 분기 */}
      {view === "card" ? (
        /* 카드 그리드 */
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <Link key={p.slug} to={`/projects/${p.slug}`} className="block h-full">
              <article className="card-portfolio card--list h-full">
                <div className="card-media">
                  <img
                    src={withFallback(p.thumbnail)}
                    alt={`${p.title} thumbnail`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    onError={onImgError}
                  />
                </div>
                <div className="card-body">
                  {/* 기간 / 제목 / 임팩트 한 줄 */}
                  <div className="space-y-1.5">
                    <div className="text-sm text-neutral truncate" title={p.period}>
                      {p.period}
                    </div>
                    <h2 className="text-xl font-semibold truncate" title={p.title}>
                      {p.title}
                    </h2>
                    {p.impact && (
                      <div className="text-sm text-primary/80 truncate" title={p.impact}>
                        {p.impact}
                      </div>
                    )}
                  </div>
                  
                  {/* 태그: 최대 5개만 노출. 높이 강제 금지 */}
                  <div className="mt-3 flex flex-wrap gap-2 max-h-12 overflow-hidden">
                    {p.parsedTags.slice(0, TAG_VISIBLE_LIMIT).map((t) => (
                      <span key={t} className="tag-chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        /* 테이블 (디폴트) : 반응형 스택 행 + 색상 요구사항 */
        <div className="mt-6 overflow-x-hidden overflow-y-auto border-t-2 border-primary">
          <table className="w-full table-fixed border-separate border-spacing-0">
            {/* 데스크톱: thead 표시 + sticky, 모바일: 숨김 */}
            <thead className="hidden md:table-header-group md:sticky md:top-0 md:z-10 md:bg-background md:[&>tr>th]:border-b md:[&>tr>th]:border-primary/40">
               <tr className="border-b border-neutral/40 text-left text-sm text-primary">
                <th className="px-4 py-3 font-semibold w-[18%]">기간</th>
                <th className="px-4 py-3 font-semibold w-[34%]">프로젝트명</th>
                <th className="px-4 py-3 font-semibold w-[18%]">고객사</th>
                <th className="px-4 py-3 font-semibold w-[18%]">근무사</th>
                <th className="px-4 py-3 font-semibold w-[12%]">역할</th>
              </tr>
            </thead>

            {/* tr 하단 1px. 모바일에서는 block 행으로 스택 */}
            <tbody className="text-sm text-primary/90 md:table-row-group">
              {filtered.map((p) => (
                <tr
                  key={p.slug}
                  className="block border-b border-neutral/40 py-3 transition hover:bg-muted/40 md:table-row md:py-0 md:[&>td]:border-b md:[&>td]:border-neutral/40"
                >
                  {/* 기간 */}
                  <td className="block px-0 pb-1 pl-4 pr-4 whitespace-pre-wrap break-words md:table-cell md:px-4 md:py-3 md:whitespace-normal">
                    {p.period}
                  </td>

                  {/* 프로젝트명 (링크) */}
                  <td className="block px-0 pb-1 pl-4 pr-4 text-lg text-primary font-semibold whitespace-pre-wrap break-words md:table-cell md:px-4 md:py-3">
                    <Link to={`/projects/${p.slug}`} className="hover:underline">
                      {p.title}
                    </Link>
                  </td>

                  {/* 고객사 */}
                  <td className="block px-0 pb-1 pl-4 pr-4 whitespace-pre-wrap break-words md:table-cell md:px-4 md:py-3">
                    <span className="md:hidden text-primary/60 text-xs">고객사 : </span>
                    {p.client || ""}
                  </td>

                  {/* 근무사 */}
                  <td className="block px-0 pb-1 pl-4 pr-4 whitespace-pre-wrap break-words md:table-cell md:px-4 md:py-3">
                    <span className="md:hidden text-primary/60 text-xs">근무사 : </span>
                    {p.affiliation || ""}
                  </td>

                  {/* 역할 */}
                  <td className="block px-0 pl-4 pr-4 whitespace-pre-wrap break-words md:table-cell md:px-4 md:py-3 md:whitespace-normal">
                    <span className="md:hidden text-primary/60 text-xs">역할 : </span>
                    {p.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
