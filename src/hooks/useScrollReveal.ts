import { useEffect, useRef, useState } from "react";

export function useScrollReveal(delta = 8, topThreshold = 8) {
  const lastY = useRef(0);
  const [revealed, setRevealed] = useState(true);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      setAtTop(y <= topThreshold);

      const diff = y - lastY.current;
      if (Math.abs(diff) > delta) {
        // 스크롤 다운 → 숨김 / 업 → 표시
        setRevealed(diff < 0 || y <= topThreshold);
        lastY.current = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [delta, topThreshold]);

  return { revealed, atTop };
}
