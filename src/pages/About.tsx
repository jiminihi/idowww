import { useEffect, useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

// ── 구글 시트 연동 ───────────────────────────────────────────────────────────
const SHEET_ID   = "18a_8ZZu5eHhhkaWzc3hJcgYoxnqrQJkF9KJj8swslCM";
const SHEET_BASE = `https://opensheet.elk.sh/${SHEET_ID}`;

type RawExperience = {
  company: string; role: string; start: string; end?: string;
  location?: string; summary?: string; achievements?: string; stack?: string;
};
type RawEducation = { school: string; degree?: string; start?: string; end?: string; note?: string };
type RawSkill     = { category: string; items: string };
type Experience   = {
  company: string; role: string; start: string; end?: string;
  location?: string; summary?: string; achievements: string[]; stack: string[];
};
type Education    = { school: string; degree?: string; start?: string; end?: string; note?: string };
type SkillGroup   = { category: string; items: string[] };
type ResumeData   = { experience: Experience[]; education: Education[]; skills: SkillGroup[] };

const splitLines = (s?: string) => s ? s.split(/\n/).map((l) => l.trim()).filter(Boolean) : [];
const splitCsv   = (s?: string) => s ? s.split(",").map((l) => l.trim()).filter(Boolean) : [];
const fmt = (s?: string) => s ? s.replace("-", ".") : "";
const formatPeriod = (start: string, end?: string) =>
  end && end.trim() ? `${fmt(start)} – ${fmt(end)}` : `${fmt(start)} – 현재`;

async function fetchResumeFromSheet(): Promise<ResumeData> {
  const [expRaw, eduRaw, skillRaw] = await Promise.all([
    fetch(`${SHEET_BASE}/experience`).then((r) => r.json()) as Promise<RawExperience[]>,
    fetch(`${SHEET_BASE}/education`).then((r)  => r.json()) as Promise<RawEducation[]>,
    fetch(`${SHEET_BASE}/skills`).then((r)     => r.json()) as Promise<RawSkill[]>,
  ]);
  const experience: Experience[] = expRaw
    .filter((r) => r.company && r.role && r.start)
    .map((r) => ({
      company: r.company, role: r.role, start: r.start,
      ...(r.end      && { end: r.end }),
      ...(r.location && { location: r.location }),
      ...(r.summary  && { summary: r.summary }),
      achievements: splitLines(r.achievements),
      stack: splitCsv(r.stack),
    }));
  return {
    experience,
    education: eduRaw.filter((e) => e.school),
    skills: skillRaw.filter((s) => s.category).map((s) => ({
      category: s.category, items: splitCsv(s.items),
    })),
  };
}

// ── 폴백 데이터 ──────────────────────────────────────────────────────────────
const FALLBACK: ResumeData = {
  experience: [
    { company: "한봄스튜디오", role: "퍼블리싱팀 팀장", start: "2020-03", end: "2025-05", location: "서울",
      summary: "최대 5명 규모의 퍼블리싱팀을 리딩하며 산출물 기준·코딩 컨벤션 수립.",
      achievements: ["최대 5명 규모 퍼블리싱팀 리딩 및 코딩 컨벤션 수립", "코딩 컨벤션·업무 프로세스·협업 가이드 매뉴얼화로 온보딩 시간 단축", "삼성·LG전자·현대자동차 등 대형 클라이언트 프로젝트 다수 수행"], stack: ["HTML", "CSS", "JavaScript"] },
    { company: "주식회사 비즈니스인사이트", role: "ICT팀 과장 / 디자인 & 퍼블리싱", start: "2016-04", end: "2019-12", location: "서울",
      achievements: ["이랜드닷 BackOffice 구축", "FreshMan App 구축 및 운영", "TaxFreeMall App / SSGFOOD KIOSK UI Design & Publishing", "장보자닷컴 구축"], stack: ["Figma", "HTML", "CSS", "JavaScript"] },
    { company: "(주)브레이브이노베이션", role: "TX실 PE팀 책임 / 퍼블리싱", start: "2013-05", end: "2013-08", location: "서울", achievements: ["SSG.com 구축", "KT&G 상상UNIV 모바일 리뉴얼"], stack: [] },
    { company: "(주)엠피알디", role: "SI사업부 개발팀 대리 / 퍼블리싱", start: "2012-08", end: "2012-12", location: "서울", achievements: ["BMW, SK플래닛, 롯데백화점 등 다수 SI 프로젝트 퍼블리싱"], stack: [] },
    { company: "(주)소프트아이", role: "SI사업부 과장 / 디자인 & 퍼블리싱", start: "2011-11", end: "2012-04", location: "서울", achievements: ["퍼블리싱 가이드 제작 및 디자이너 대상 퍼블리싱 교육", "외국인고용관리시스템 구축", "우수숙련종합정보망 구축"], stack: [] },
    { company: "(주)연일커뮤니케이션", role: "디자인팀 대리 / 디자인 & 퍼블리싱", start: "2010-12", end: "2011-09", location: "서울", achievements: [], stack: [] },
    { company: "(주)한경닷컴", role: "개발팀 사원 / 디자인 & 퍼블리싱", start: "2007-02", end: "2010-05", location: "서울", achievements: ["한경닷컴 유지보수, 한국경제 주식왕·증권·재테크·골프 리뉴얼 등 다수 수행"], stack: [] },
    { company: "(주)다리커뮤니케이션", role: "사원 / 디자인 & 퍼블리싱", start: "2005-10", end: "2007-02", location: "서울", achievements: ["골프용품닷컴 운영디자인 및 리뉴얼", "랭스필드 운영디자인"], stack: [] },
  ],
  education: [
    { school: "한국사이버대학교", degree: "디지털디자인학과", start: "2008-03", end: "2014-02" },
    { school: "김해한일여자상업고등학교", degree: "정보처리과", start: "1996-03", end: "1999-02" },
  ],
  skills: [
    { category: "Design",      items: ["UI/UX 디자인", "반응형 웹 디자인", "모바일 앱 UI", "키오스크 UI", "디자인 시스템", "브랜드 아이덴티티"] },
    { category: "Publishing",  items: ["HTML5 / CSS3", "웹표준 & 웹접근성", "크로스브라우징", "퍼블리싱 가이드 제작", "코딩 컨벤션 수립", "PC·모바일·앱·하이브리드"] },
    { category: "Tools & Dev", items: ["Figma / Adobe CC", "React / Vue", "JavaScript / TypeScript", "클라우드 기반 AI 서비스", "Git / GitHub", "Notion / Jira"] },
  ],
};

const PROFILE_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500'%3E%3Crect fill='%23FAFAFA' width='400' height='500'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-family='Arial' font-size='20'%3EProfile Image%3C/text%3E%3C/svg%3E";

const CERTIFICATIONS = [
  { name: "웹디자인기능사",    org: "산업인력관리공단", date: "2006.12.29" },
  { name: "정보기기운용기능사", org: "산업인력관리공단", date: "1998.07.22" },
  { name: "부기 2급",          org: "대한상공회의소",   date: "1998.05.28" },
  { name: "워드프로세서 2급",  org: "대한상공회의소",   date: "1996.12.06" },
];

const WHAT_I_DO = [
  { num: "01.", title: "Web Publishing",       desc: "웹표준·접근성을 준수하며 PC웹·모바일웹·앱·하이브리드앱·키오스크 등 다양한 플랫폼에서 사용자 중심 퍼블리싱을 수행합니다. 퍼블리싱 가이드 제작과 코딩 컨벤션 수립으로 팀 품질의 일관성을 확보합니다." },
  { num: "02.", title: "UI/UX Design",         desc: "사용성과 미학에 중점을 둔 웹사이트 및 앱 인터페이스를 제작합니다. GDWEB DESIGN AWARDS 등 다수의 디자인 어워드 수상 프로젝트에 퍼블리셔로 참여한 경험을 보유하고 있습니다." },
  // { num: "03.", title: "Project Coordination", desc: "디자이너가 제안한 아이디어의 기술적 구현 가능성을 검토하고, 개발자에게는 디자인 의도를 명확히 전달하는 중간 조율자 역할을 합니다." },
  { num: "03.", title: "Team Leadership",      desc: "5년간 퍼블리싱팀을 리딩하며 체계를 만들었습니다. 코딩 컨벤션·업무 프로세스·협업 가이드·보고 체계를 매뉴얼로 정리해 팀원 온보딩 시간을 단축하고 코드 품질의 일관성을 확보했습니다." },
];

// ── 컴포넌트 ─────────────────────────────────────────────────────────────────
export default function About() {
  const [resume, setResume]   = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  useScrollAnimation();

  useEffect(() => {
    fetchResumeFromSheet()
      .then((data) => setResume(data))
      .catch(() => setResume(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  const data = resume ?? FALLBACK;
  const sortedExp = [...data.experience].sort((a, b) => {
    const toMs = (s?: string) => s ? new Date(s).getTime() : 99999999999;
    return (b.end ? toMs(b.end) : 99999999999) - (a.end ? toMs(a.end) : 99999999999);
  });

  if (loading) {
    return (
      <div className="experience-section">
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton" style={{ height: "20px", marginBottom: "16px" }} />
        ))}
      </div>
    );
  }

  return (
    <div id="about-page">

      {/* Profile */}
      <section className="profile-section">
        <div className="profile-image" data-reveal>
          <img src={PROFILE_PLACEHOLDER} alt="김주연 프로필" />
        </div>
        <div className="profile-content" data-reveal data-delay="150">
          <h1>김주연</h1>
          <div className="role">UI/UX Designer &amp; Web Publisher</div>
          <div className="status">구직중</div>
          <p>20년간 웹디자인·웹퍼블리싱 실무를 수행하며 기획–디자인–구현–검수 흐름을 이해하고, 디자이너와 개발자 사이에서 의도를 기술 언어로 정리해 프로젝트 완성도를 높여 왔습니다.</p>
          <p>취미로 시작한 웹디자인이 직업이 되었고, 웹표준과 접근성에 관심을 가지며 퍼블리싱 전문성을 더했습니다. 최근에는 클라우드 기반 AI 대화형 서비스 웹개발자 양성 교육과정을 수료하며 프론트엔드·백엔드 구조 이해까지 확장했습니다.</p>
          <p>삼성·LG·현대자동차 등 대기업 프로젝트부터 다양한 스타트업까지, IT·테크·금융·유통·제조·법률·의료·게임·교육·공공 등 다양한 산업 분야에서 경험을 쌓았습니다.</p>
          <div className="cv-download">
            <a href="/data/IdoWWW_Resume.pdf" className="btn">이력서 다운로드</a>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="skills-section">
        <h2 className="section-title" data-reveal>Skills &amp; Expertise</h2>
        <div className="skills-grid">
          {data.skills.map((sg, i) => (
            <div key={sg.category} className="skill-column" data-reveal data-delay={String(i * 100)}>
              <h3>{sg.category}</h3>
              <ul className="skill-list">
                {sg.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="experience-section">
        <h2 className="section-title" data-reveal>Experience</h2>
        {sortedExp.map((e, idx) => (
          <div key={`${e.company}-${idx}`} className="experience-item" data-reveal data-delay={String(Math.min(idx * 80, 300))}>
            <div className="experience-date">{formatPeriod(e.start, e.end)}</div>
            <div className="experience-content">
              <h3>{e.role}</h3>
              <div className="company">{e.company}{e.location ? ` / ${e.location}` : ""}</div>
              {e.summary && <p className="experience-summary">{e.summary}</p>}
              {e.achievements.length > 0 && (
                <ul>{e.achievements.map((a, i) => <li key={i}>{a}</li>)}</ul>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Education & Certifications */}
      <section className="edu-cert-section">
        <div className="edu-cert-grid">
          <div data-reveal>
            <h2 className="edu-sub-title">Education</h2>
            {data.education.map((ed, i) => (
              <div key={i} className="edu-item">
                <div className="edu-school">{ed.school}</div>
                {ed.degree && <div className="edu-degree">{ed.degree}</div>}
                {(ed.start || ed.end) && (
                  <div className="edu-period">{fmt(ed.start)}{ed.end ? ` – ${fmt(ed.end)}` : ""}</div>
                )}
              </div>
            ))}
          </div>
          <div data-reveal data-delay="150">
            <h2 className="edu-sub-title">Certifications</h2>
            <ul className="cert-list">
              {CERTIFICATIONS.map((c, i) => (
                <li key={i} className="cert-item">
                  <div>
                    <div className="cert-name">{c.name}</div>
                    <div className="cert-org">{c.org}</div>
                  </div>
                  <div className="cert-date">{c.date}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What I Do */}
      <section className="services-section">
        <h2 className="section-title" data-reveal>What I Do</h2>
        {WHAT_I_DO.map((s, i) => (
          <div key={s.num} className="service-item" data-reveal data-delay={String(i * 100)}>
            <h3><span>{s.num}</span>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </section>

      {/* Contact */}
      <section className="contact-section">
        <h2 className="section-title" data-reveal>Let's work together</h2>
        <p data-reveal data-delay="100">기준을 세우고 끝까지 마감하는 힘으로, 완성도 높은 서비스를 만들겠습니다.</p>
        <a href="mailto:idowww11@gmail.com" className="contact-email" data-reveal data-delay="150">idowww11@gmail.com</a>
        <div className="social-links" data-reveal data-delay="200">
          <a href="https://linkedin.com/in/idowww" target="_blank" rel="noreferrer">LinkedIn — linkedin.com/in/idowww</a>
          <a href="https://github.com/jiminihi" target="_blank" rel="noreferrer">GitHub — github.com/jiminihi</a>
          <a href="https://behance.net/idowww" target="_blank" rel="noreferrer">Behance — behance.net/idowww</a>
          <a href="https://instagram.com/idowww" target="_blank" rel="noreferrer">Instagram — @idowww</a>
        </div>
      </section>

    </div>
  );
}
