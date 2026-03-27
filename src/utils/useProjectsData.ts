import { useEffect, useState } from "react";
import type { Project, ProjectRaw } from "../types/Project";
import { parseProject } from "./parseProject";

/** projects.json의 각 항목을 ProjectRaw로 간주하고 파싱 */
// ─── 데이터 소스 ─────────────────────────────────────────────
const SHEET_URL =
  "https://opensheet.elk.sh/1Z1JXAZLivcAmA79pm_m57jXmPEQqPzUrszRl23l8jBU/1";

async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(SHEET_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const raw: ProjectRaw[] = await res.json();
  return raw.map(parseProject);
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
