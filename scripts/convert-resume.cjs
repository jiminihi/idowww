// 실행: npm run resume:build
const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

function readSheet(wb, name) {
  const ws = wb.Sheets[name];
  if (!ws) return [];
  return XLSX.utils.sheet_to_json(ws, { defval: "" });
}

// --- guard: if resume.xlsx is missing, write empty skeleton and exit ---
const xlsxPath = path.resolve("resume.xlsx");
if (!fs.existsSync(xlsxPath)) {
  console.log("ℹ️ resume.xlsx not found — writing empty public/data/resume.json and skipping.");
  const out = { experience: [], education: [], skills: [], highlights: [], generatedAt: new Date().toISOString() };
  fs.mkdirSync(path.resolve("public/data"), { recursive: true });
  fs.writeFileSync(path.resolve("public/data/resume.json"), JSON.stringify(out, null, 2), "utf8");
  process.exit(0);
}

const wb = XLSX.readFile(xlsxPath);

const exp = readSheet(wb, "Experience").map(r => ({
  company: r.company, role: r.role, start: r.start, end: r.end, location: r.location,
  summary: r.summary,
  stack: String(r.stack || "").split(",").map(s => s.trim()).filter(Boolean),
  achievements: String(r.achievements || "").split(";").map(s => s.trim()).filter(Boolean),
}));
const education = readSheet(wb, "Education").map(r => ({
  school: r.school, degree: r.degree, start: r.start, end: r.end, note: r.note
}));
const skills = readSheet(wb, "Skills").map(r => ({
  category: r.category,
  items: String(r.items || "").split(",").map(s => s.trim()).filter(Boolean),
}));
const highlights = readSheet(wb, "Highlights").map(r => ({
  slug: r.slug, title: r.title, oneLiner: r.oneLiner
}));

const out = { experience: exp, education, skills, highlights, generatedAt: new Date().toISOString() };
fs.mkdirSync(path.resolve("public/data"), { recursive: true });
fs.writeFileSync(path.resolve("public/data/resume.json"), JSON.stringify(out, null, 2), "utf8");
console.log("✅ Wrote public/data/resume.json");
