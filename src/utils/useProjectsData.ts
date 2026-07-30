import { useEffect, useState } from "react";
import type { Project, ProjectRaw } from "../types/Project";
import { parseProject } from "./parseProject";

// ─── 데이터 소스 ─────────────────────────────────────────────
const SHEET_ID  = "1Z1JXAZLivcAmA79pm_m57jXmPEQqPzUrszRl23l8jBU";
const SHEET_URL = `https://opensheet.elk.sh/${SHEET_ID}/1`;
const GVIZ_URL  = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=0`;

/** CORS 없이 동작하는 Google GViz API 폴백 */
async function fetchViaGviz(): Promise<ProjectRaw[]> {
  const res = await fetch(GVIZ_URL);
  if (!res.ok) throw new Error(`GViz HTTP ${res.status}`);
  const text = await res.text();
  // 응답: /*O_o*/\ngoogle.visualization.Query.setResponse({...});
  const jsonStr = text.replace(/^[^{]*/, "").replace(/\);\s*$/, "");
  const json = JSON.parse(jsonStr);
  const cols: { label: string }[] = json.table.cols;
  const rows: { c: ({ v: unknown } | null)[] }[] = json.table.rows;
  const headers = cols.map((c) => c.label);
  return rows.map((row) => {
    const obj: Record<string, unknown> = {};
    headers.forEach((h, i) => { obj[h] = row.c[i]?.v ?? ""; });
    return obj as unknown as ProjectRaw;
  });
}

async function fetchProjects(): Promise<Project[]> {
  try {
    const res = await fetch(SHEET_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const raw: ProjectRaw[] = await res.json();
    return raw.map(parseProject);
  } catch {
    // opensheet.elk.sh 실패 시 GViz API로 폴백
    const raw = await fetchViaGviz();
    return raw.map(parseProject);
  }
}

interface UseProjectsDataResult {
  projects: Project[] | null;
  loading: boolean;
  error: Error | null;
}

export function useProjectsData(): UseProjectsDataResult {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchProjects()
      .then((data) => {
        if (!cancelled) {
          setProjects(data);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { projects, loading, error };
}
