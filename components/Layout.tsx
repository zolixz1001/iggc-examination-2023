import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type LayoutProps = {
  children: ReactNode;
  bgColor?: string;
}

export default function Layout({ children, bgColor }: LayoutProps) {
  return (
    <>
      <Header />
      <main className={`h-[100%] ${bgColor && bgColor}`}>
        <div className="container mx-auto min-h-[88dvh] relative">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
