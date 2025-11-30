// utils/parseProject.ts

import type { RawProject, Project, UrlItem } from "../types/Project";

/**
 * 줄바꿈 기반 "label|href" 문자열을 UrlItem[]으로 변환한다.
 */
function parseUrls(raw?: string): UrlItem[] {
  if (!raw) return [];

  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, href] = line.split("|").map((s) => s.trim());
      return { label, href };
    })
    .filter((u) => u.href);
}

/**
 * 줄바꿈 기반 텍스트를 배열로 변환한다.
 * - 한 줄 = 한 항목
 */
function parseMultiline(raw?: string): string[] {
  if (!raw) return [];
  return raw
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * 쉼표 구분 문자열을 string[]로 변환한다.
 * 예: "React,Spring,ERP" → ["React","Spring","ERP"]
 */
function parseCsvList(raw?: string): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * RawProject → Project 변환 함수 (UI에서 쓰는 최종 구조).
 */
export function parseProject(raw: RawProject): Project {
  return {
    ...raw,

    // 태그/포지션/URL 파싱 결과
    parsedTags: parseCsvList(raw.tags),
    parsedPositions: parseCsvList(raw.positions),
    parsedUrls: parseUrls(raw.urls),
    parsedAwards: parseMultiline(raw.awards),
  };
}

/**
 * RawProject[] → Project[] 일괄 변환
 */
export function parseProjectList(rawList: RawProject[]): Project[] {
  return rawList.map((raw) => parseProject(raw));
}
