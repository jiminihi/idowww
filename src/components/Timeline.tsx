
import type { Resume } from "../types/resume";

export function Timeline({ data }: { data: Resume["experience"] }) {
  return (
    <ol className="timeline">
      {data.map((e, i) => (
        <li key={i} className="timeline-item">
          <div className="timeline-head">
            <strong>{e.role}</strong> · {e.company}
            <span className="period">{e.start}–{e.end || "Present"}</span>
          </div>
          {e.summary && <p className="summary">{e.summary}</p>}
          {e.stack?.length ? <div className="stack">{e.stack.join(" · ")}</div> : null}
          {e.achievements?.length ? (
            <ul className="bullets">
              {e.achievements.map((a, j) => <li key={j}>{a}</li>)}
            </ul>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
