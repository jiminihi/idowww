import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = { children?: ReactNode };

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      {/* 고정 헤더 높이 보정 */}
      <div className="h-16" />
      <main className="flex-1 overflow-x-clip">{children}</main>
      <Footer />
    </div>
  );
}
