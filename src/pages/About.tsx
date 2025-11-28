import { useEffect, useState } from "react";

type Resume = {
  experience: { company: string; role: string; start: string; end?: string; summary?: string; stack?: string[]; achievements?: string[] }[];
  education: { school: string; degree?: string; start?: string; end?: string; note?: string }[];
  skills: { category: string; items: string[] }[];
};

export default function About() {
  const [resume, setResume] = useState<Resume | null>(null);

  useEffect(() => {
    fetch("/data/resume.json")
      .then(r => r.json())
      .then(setResume)
      .catch(console.error);
  }, []);

  if (!resume) return <div>Loading…</div>;

  return (
    <div className="container">
      
      <h1>About</h1>

      {resume.experience?.length ? (
        <section>
          <h2>Experience</h2>
          <ul>
            {resume.experience.map((e, i) => (
              <li key={i}>
                <strong>{e.role}</strong> · {e.company} ({e.start}–{e.end || "Present"})
                {e.summary && <div>{e.summary}</div>}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {resume.skills?.length ? (
        <section>
          <h2>Skills</h2>
          <ul>
            {resume.skills.map((s, i) => (
              <li key={i}><strong>{s.category}</strong>: {s.items.join(" · ")}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {resume.education?.length ? (
        <section>
          <h2>Education</h2>
          <ul>
            {resume.education.map((e, i) => (
              <li key={i}>
                <strong>{e.school}</strong> {e.degree ? `· ${e.degree}` : ""} ({e.start}–{e.end})
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
