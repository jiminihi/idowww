// ============================================================
// types/Project.ts  — 단일 소스 of truth
// (구) lib/types.ts + types/Project.ts 통합
// ============================================================

/** 구글시트 원본 행 (fetch 직후 raw 데이터) */
export interface ProjectRaw {
  slug: string;
  title: string;
  period?: string;
  client?: string;
  affiliation?: string;
  role?: string;        // 쉼표 구분 문자열 "UI/UX Design, Publishing"
  tags?: string;        // 쉼표/줄바꿈/세미콜론 구분 문자열
  thumbnail?: string;
  description?: string;
  impact?: string;
  awards?: string;      // 쉼표/줄바꿈/세미콜론 구분 문자열
  urls?: string;        // "label::href" 쉼표/줄바꿈/세미콜론 구분 (예: "사이트::https://a.com, 깃허브::https://b.com")
  featured?: boolean | string; // "TRUE"/"FALSE" 또는 boolean
}

/** parseProject() 후 컴포넌트에서 사용하는 완성형 */
export interface Project {
  slug: string;
  title: string;
  period?: string;
  client?: string;
  affiliation?: string;
  role: string;
  thumbnail?: string;
  description?: string;
  impact?: string;
  featured: boolean;

  /** parseProject()가 생성하는 파생 필드 */
  parsedTags: string[];
  parsedPositions: string[];
  parsedAwards: string[];
  parsedUrls: { label: string; href: string }[];
}
