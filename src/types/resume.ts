export type Resume = {
  experience: {
    company: string; role: string; start: string; end?: string;
    location?: string; summary?: string; stack?: string[]; achievements?: string[];
  }[];
  education: { school: string; degree?: string; start?: string; end?: string; note?: string }[];
  skills: { category: string; items: string[] }[];
  highlights?: { slug: string; title: string; oneLiner: string }[];
};
