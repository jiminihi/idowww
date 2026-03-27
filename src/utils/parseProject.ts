import type { Project, ProjectRaw } from "../types/Project";

/** "label::https://..." 또는 "https://..." 형태 파싱 */
function parseUrls(raw?: string): { label: string; href: string }[] {
  if (!raw?.trim()) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((item) => {
      const sep = item.indexOf("::");
      if (sep !== -1) {
        return { label: item.slice(0, sep).trim(), href: item.slice(sep + 2).trim() };
      }
      return { label: item, href: item };
    })
    .filter((u) => u.href && u.href !== "#");
}

/** 쉼표 구분 문자열 → 배열
 *  stripHash: true → 구글시트 tags의 # 기호 제거 */
function splitComma(raw?: string, stripHash = false): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(",")
    .map((s) => (stripHash ? s.replace(/#/g, "").trim() : s.trim()))
    .filter(Boolean);
}

/** "TRUE"/"Y"/"1"/true → boolean */
function parseBool(val?: boolean | string): boolean {
  if (typeof val === "boolean") return val;
  if (typeof val === "string") {
    const v = val.trim().toUpperCase();
    return v === "TRUE" || v === "Y" || v === "1" || v === "YES";
  }
  return false;
}

export function parseProject(raw: ProjectRaw): Project {
  return {
    slug: raw.slug,
    title: raw.title,
    period: raw.period,
    client: raw.client,
    affiliation: raw.affiliation,
    role: raw.role ?? "",
    thumbnail: raw.thumbnail,
    description: raw.description,
    impact: raw.impact,
    featured: parseBool(raw.featured),
    // tags: # 기호 제거 (구글시트에서 "#React, #TypeScript" 형태로 입력)
    parsedTags: splitComma(raw.tags, true),
    // positions: role 컬럼 그대로 분리
    parsedPositions: splitComma(raw.role),
    parsedAwards: splitComma(raw.awards),
    parsedUrls: parseUrls(raw.urls),
  };
}