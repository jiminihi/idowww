import { memo } from "react";

export type RoleKey = "ALL" | "Design" | "Publishing" | "Dev" | "Etc";

type Props = {
  value: RoleKey;
  onChange: (next: RoleKey) => void;
  counts?: Partial<Record<RoleKey, number>>;
};

const TABS: RoleKey[] = ["ALL", "Design", "Publishing", "Dev", "Etc"];

function RoleTabsBase({ value, onChange, counts }: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {TABS.map((tab) => {
        const active = value === tab;
        const n = counts?.[tab];

        return (
          <button
            key={tab}
            type="button"
            onClick={() => onChange(tab)}
            aria-pressed={active}
            className={[
              // 공통
              "px-5 py-2 rounded-full border-2 leading-none transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",

              // 기본(비활성): 투명 배경 + 2px 아웃라인
              // 호버: bg-primary, 텍스트 white, 보더 primary
              !active
                ? "bg-transparent text-primary border-primary/60 hover:bg-primary hover:text-white hover:border-primary"
                // 활성: 채움 상태
                : "bg-primary text-white border-primary",
            ].join(" ")}
          >
            {tab}
            {typeof n === "number" && (
              <span className={["ml-1 text-xs", active ? "text-white/90" : "opacity-70"].join(" ")}>
                ({n})
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export const RoleTabs = memo(RoleTabsBase);
