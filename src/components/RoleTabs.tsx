import { memo } from "react";

export type RoleKey = "ALL" | "Design" | "Publishing" | "Development" | "Etc";

type Props = {
  value: RoleKey;
  onChange: (next: RoleKey) => void;
  counts?: Partial<Record<RoleKey, number>>;
};

const TABS: RoleKey[] = ["ALL", "Design", "Publishing", "Development", "Etc"];

function RoleTabsBase({ value, onChange, counts }: Props) {
  return (
    <div className="role-tabs">
      {TABS.map((tab) => {
        const active = value === tab;
        const n = counts?.[tab];
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onChange(tab)}
            aria-pressed={active}
            className={["role-tab", active ? "active" : ""].join(" ").trim()}
          >
            {tab}
            {typeof n === "number" && (
              <span className="tab-count">({n})</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export const RoleTabs = memo(RoleTabsBase);
