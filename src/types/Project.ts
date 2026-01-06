// src/types/Project.ts

/**
 * Excel 시트의 원본 구조 그대로 맵핑되는 타입.
 * fetch(SHEET_URL) → JSON → 여기로 들어온다.
 *
 * 주의:
 * - urls 는 Excel에서 "label|href" 줄바꿈 문자열로 들어오므로 string이다.
 */
export type RawProject = {
  slug: string;
  title: string;
  period: string;
  role: string;          // "Design,Publishing,Dev"
  impact: string;
  tags: string;          // "React,Spring,Figma" (쉼표 구분 문자열)

  description: string;

  client?: string;
  affiliation?: string;
  thumbnail: string;

  // comma 구분 문자열 ("PL,PM")
  positions?: string;

  // 줄바꿈 + "label|href" 형식
  urls?: string;

  // 줄바꿈 텍스트
  awards?: string;

  // 시트 상에서 Y / TRUE / 1 등으로 들어오는 featured 플래그
  featured?: string;
};

export type UrlItem = {
  label: string;
  href: string;
};

/**
 * UI에서 사용하는 최종 가공 타입.
 * RawProject + Parsed fields (tags, positions, urls, awards, featured 플래그)
 */
export type Project = {
  slug: string;
  title: string;
  period: string;
  role: string;
  impact: string;
  tags: string;
  description: string;

  client?: string;
  affiliation?: string;
  thumbnail: string;
  positions?: string;
  urls?: string;
  awards?: string;

  // 파싱된 필드들
  parsedTags: string[];        // ["React", "Spring", "Figma"]
  parsedPositions: string[];   // ["PL", "PM"]
  parsedUrls: UrlItem[];       // [{label, href}, ...]
  parsedAwards: string[];      // ["수상1", "수상2", ...]

  // boolean 으로 정리된 featured 플래그
  featured: boolean;
};
