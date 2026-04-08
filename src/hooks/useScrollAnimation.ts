import { useEffect } from "react";

type Options = {
  threshold?: number;
  rootMargin?: string;
};

/**
 * AOS 스타일 스크롤 reveal
 * - [data-reveal] 속성이 붙은 요소를 IntersectionObserver로 fade-up 처리
 * - data-delay="200" 으로 딜레이 지정 가능
 * - MutationObserver로 비동기 렌더링 후 추가된 요소도 자동 감지
 */
export function useScrollAnimation(options: Options = {}) {
  const { threshold = 0.12, rootMargin = "0px 0px -60px 0px" } = options;

  useEffect(() => {
    const observed = new WeakSet<Element>();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = el.dataset.delay ? Number(el.dataset.delay) : 0;
          setTimeout(() => el.classList.add("revealed"), delay);
          io.unobserve(el);
        });
      },
      { threshold, rootMargin }
    );

    // [data-reveal] 요소를 observe (중복 방지)
    function observeAll() {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (!observed.has(el)) {
          observed.add(el);
          io.observe(el);
        }
      });
    }

    // 초기 실행
    observeAll();

    // 비동기 렌더링(데이터 로딩 후 카드 등) 대응
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [threshold, rootMargin]);
}
