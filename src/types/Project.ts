// types/Project.ts

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
  awards?: string;       // 줄바꿈 구분 텍스트 (한 줄 = 한 수상 내역)
  thumbnail: string;
  description: string;

  client?: string;
  affiliation?: string;
  positions?: string;    // "PL,PM,Lead"
  urls?: string;         // "GitHub|https://...\nDemo|https://..."
};


/**
 * 파싱된 URL(item) 구조.
 * ProjectDetail 내에서 사용되는 형태.
 */
export type UrlItem = {
  label: string;
  href: string;
};


/**
 * UI에서 사용하는 최종 가공 타입.
 * RawProject + Parsed fields (tags, positions, urls 파싱 결과)
 */
export type Project = RawProject & {
  parsedTags: string[];        // ["React", "Spring", "Figma"]
  parsedPositions: string[];   // ["PL", "PM"]
  parsedUrls: UrlItem[];       // [{label, href}, ...]
  parsedAwards: string[];      // ["2013 · 웹어워드코리아 대상 (...)", ...]
};
