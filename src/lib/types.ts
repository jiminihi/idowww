export type ProjectType = "dev" | "design";
export interface Project {
  slug: string; title: string; type: ProjectType;
  period?: string; roles?: string[]; stack?: string[];
  tags?: string[]; summary?: string; thumb?: string;
  detail?: {
    overview?: string; problem?: string; approach?: string;
    implementation?: { title: string; desc: string; image?: string }[];
    result?: string; links?: { github?: string; demo?: string };
  };
}
