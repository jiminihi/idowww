/**
 * convert-resume.cjs
 *
 * 구글 시트에서 내보낸 CSV → public/data/resume.json 변환 스크립트
 *
 * 사용법:
 *   node scripts/convert-resume.cjs
 *
 * 구글 시트 구조:
 *   시트1: experience  (경력)
 *   시트2: education   (학력)
 *   시트3: skills      (스킬)
 *
 * 각 시트를 CSV로 내보내서 scripts/data/ 폴더에 저장 후 실행:
 *   scripts/data/experience.csv
 *   scripts/data/education.csv
 *   scripts/data/skills.csv
 */

const fs = require("fs");
const path = require("path");

// ── CSV 파서 (큰따옴표 내 쉼표/줄바꿈 처리) ─────────────────────────────────
function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuote = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (inQuote) {
      if (ch === '"' && next === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') {
        inQuote = false;
      } else {
        cell += ch;
      }
    } else {
      if (ch === '"') {
        inQuote = true;
      } else if (ch === ",") {
        row.push(cell.trim());
        cell = "";
      } else if (ch === "\r" && next === "\n") {
        row.push(cell.trim());
        rows.push(row);
        row = [];
        cell = "";
        i++;
      } else if (ch === "\n" || ch === "\r") {
        row.push(cell.trim());
        rows.push(row);
        row = [];
        cell = "";
      } else {
        cell += ch;
      }
    }
  }
  // 마지막 행
  if (cell || row.length) {
    row.push(cell.trim());
    rows.push(row);
  }

  return rows;
}

// 헤더 행 + 데이터 행 → 객체 배열
function csvToObjects(rows) {
  if (rows.length < 2) return [];
  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1).filter((r) => r.some((c) => c)).map((r) => {
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = (r[i] ?? "").trim();
    });
    return obj;
  });
}

// CSV 파일 읽기
function readCsv(filename) {
  const filepath = path.join(__dirname, "data", filename);
  if (!fs.existsSync(filepath)) {
    console.warn(`⚠️  ${filename} 없음 → 건너뜀`);
    return [];
  }
  const text = fs.readFileSync(filepath, "utf-8");
  return csvToObjects(parseCsv(text));
}

// 쉼표 구분 문자열 → 배열 (빈 항목 제거)
function splitCsv(str) {
  if (!str) return [];
  return str.split(",").map((s) => s.trim()).filter(Boolean);
}

// 줄바꿈 구분 문자열 → 배열
function splitLines(str) {
  if (!str) return [];
  return str.split(/\n|\\n/).map((s) => s.trim()).filter(Boolean);
}

// ── experience 변환 ────────────────────────────────────────────────────────
// 시트 컬럼: company | role | start | end | location | summary | achievements | stack
function parseExperience(rows) {
  return rows.map((r) => {
    const obj = {
      company: r.company || "",
      role: r.role || "",
      start: r.start || "",
    };
    if (r.end)          obj.end          = r.end;
    if (r.location)     obj.location     = r.location;
    if (r.summary)      obj.summary      = r.summary;

    const achievements = splitLines(r.achievements);
    if (achievements.length) obj.achievements = achievements;

    const stack = splitCsv(r.stack);
    if (stack.length) obj.stack = stack;

    return obj;
  }).filter((e) => e.company && e.role && e.start);
}

// ── education 변환 ─────────────────────────────────────────────────────────
// 시트 컬럼: school | degree | start | end | note
function parseEducation(rows) {
  return rows.map((r) => {
    const obj = { school: r.school || "" };
    if (r.degree) obj.degree = r.degree;
    if (r.start)  obj.start  = r.start;
    if (r.end)    obj.end    = r.end;
    if (r.note)   obj.note   = r.note;
    return obj;
  }).filter((e) => e.school);
}

// ── skills 변환 ────────────────────────────────────────────────────────────
// 시트 컬럼: category | items
// items 는 쉼표 구분 문자열. 예: "HTML5 / CSS3, 웹표준 & 접근성, 크로스브라우징"
function parseSkills(rows) {
  const map = new Map();
  rows.forEach((r) => {
    const cat = (r.category || "").trim();
    if (!cat) return;
    const items = splitCsv(r.items);
    if (!map.has(cat)) map.set(cat, []);
    map.get(cat).push(...items);
  });
  return [...map.entries()].map(([category, items]) => ({ category, items }));
}

// ── 메인 ──────────────────────────────────────────────────────────────────
function main() {
  console.log("📄 CSV → resume.json 변환 시작...\n");

  const experience = parseExperience(readCsv("experience.csv"));
  const education  = parseEducation(readCsv("education.csv"));
  const skills     = parseSkills(readCsv("skills.csv"));

  // 경력 최신순 정렬 (end 없으면 현재 재직 → 맨 앞)
  experience.sort((a, b) => {
    const toNum = (s) => {
      if (!s) return 99999999;
      const d = new Date(s);
      return isNaN(d.getTime()) ? 0 : d.getTime();
    };
    const ae = toNum(a.end);
    const be = toNum(b.end);
    // end 없음(현재) → 가장 최신
    const aVal = a.end ? ae : 99999999;
    const bVal = b.end ? be : 99999999;
    return bVal - aVal;
  });

  const resume = { experience, education, skills };

  const outDir  = path.join(__dirname, "..", "public", "data");
  const outPath = path.join(outDir, "resume.json");

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(resume, null, 2), "utf-8");

  console.log(`✅ 완료: ${outPath}`);
  console.log(`   experience : ${experience.length}건`);
  console.log(`   education  : ${education.length}건`);
  console.log(`   skills     : ${skills.length}개 카테고리`);
}

main();
