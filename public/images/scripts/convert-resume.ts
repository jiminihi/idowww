// 실행: npx ts-node scripts/convert-resume.ts
import * as fs from "fs";
import * as path from "path";
import * as XLSX from "xlsx";

type Exp = {
  company: string; role: string;
  start: string; end?: string; location?: string;
  summary?: string; stack?: string[]; achievements?: string[];
};
type Edu = { school: string; degree?: string; start?: string; end?: string; note?: string };
type Skill = { category: string; items: string[] };
type Highlight = { slug: string; title: string; oneLiner: string };

const wb = XLSX.readFile(path.resolve("resume.xlsx"));

function sheet<T = any>(name: string): T[] {
  const ws = wb.Sheets[name]; if (!ws) return [];
  return XLSX.utils.sheet_to_json<T>(ws, { defval: "" });
}

const experience = sheet<any>("Experience").map((r): Exp => ({
  company: r.company, role: r.role, start: r.start, end: r.end, location: r.location,
  summary: r.summary,
  stack: (r.stack || "").split(",").map((s: string) => s.trim()).filter(Boolean),
  achievements: (r.achievements || "").split(";").map((s: string) => s.trim()).filter(Boolean),
}));

const education = sheet<Edu>("Education");
const skills = sheet<any>("Skills").map((r): Skill => ({
  category: r.category, items: String(r.items || "").split(",").map((s) => s.trim()).filter(Boolean),
}));
const highlights = sheet<Highlight>("Highlights");

const out = { experience, education, skills, highlights, generatedAt: new Date().toISOString() };
fs.mkdirSync(path.resolve("public/data"), { recursive: true });
fs.writeFileSync(path.resolve("public/data/resume.json"), JSON.stringify(out, null, 2), "utf8");
console.log("✅ Wrote public/data/resume.json");
