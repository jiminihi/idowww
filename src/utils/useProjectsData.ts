import { useEffect, useState } from "react";
import type { RawProject, Project } from "../types/Project";
import { parseProjectList } from "./parseProject";

const SHEET_URL =
  "https://opensheet.elk.sh/1Z1JXAZLivcAmA79pm_m57jXmPEQqPzUrszRl23l8jBU/1";

export function useProjectsData() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch(SHEET_URL, { cache: "no-store" });
        const raw = (await r.json()) as RawProject[];
        const parsed = parseProjectList(raw);

        if (alive) setProjects(parsed);
      } catch (e) {
        if (alive) setError(e);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return { projects, loading, error };
}
