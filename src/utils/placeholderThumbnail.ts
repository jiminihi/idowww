import type React from "react";

// 썸네일이 없는 프로젝트 카드에 사용하는 대체 이미지.
// public/images/no-image.jpg — 1600x900(작업 화면 일러스트, 여니 제공 이미지를 크롭)
export const PLACEHOLDER_THUMBNAIL = "/images/no-image.jpg";
export const hasImage = (src?: string) => !!(src && src.trim());
export const withFallback = (src?: string) => (hasImage(src) ? src! : PLACEHOLDER_THUMBNAIL);

// thumbnail 값은 있지만(워드프레스 미디어 URL 등) 실제 로드가 실패하는 경우(삭제된 파일 등)
// 런타임에 no-image 이미지로 교체 + 카드에 no-image 스타일 적용
export const onImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const card = e.currentTarget.closest(".work-card");
  if (card) card.classList.add("work-card--no-image");
  if (e.currentTarget.src !== PLACEHOLDER_THUMBNAIL) e.currentTarget.src = PLACEHOLDER_THUMBNAIL;
};
