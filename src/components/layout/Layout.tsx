import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./Navbar";

gsap.registerPlugin(ScrollTrigger);

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Custom Cursor Logic
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: clientX,
          y: clientY,
          duration: 0.1,
          ease: "power2.out",
        });
      }
      if (cursorFollowerRef.current) {
        gsap.to(cursorFollowerRef.current, {
          x: clientX,
          y: clientY,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      lenis.destroy();
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      className="antialiased min-h-screen selection:bg-[var(--text-primary)] selection:text-[var(--bg-primary)] cursor-none"
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      <Navbar />

      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={cursorFollowerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[99] mix-blend-difference hidden md:block -translate-x-1/2 -translate-y-1/2 transition-transform duration-200"
      />

      <main className="relative z-10 w-full overflow-hidden">{children}</main>
    </div>
  );
};

export default Layout;
