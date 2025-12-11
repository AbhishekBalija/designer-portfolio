import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface LoadingProps {
  onComplete: () => void;
}

const Loading: React.FC<LoadingProps> = ({ onComplete }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
          onComplete,
        });
      },
    });

    tl.to(barRef.current, {
      width: "100%",
      duration: 1.5,
      ease: "power2.inOut",
    });
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div
        className="w-64 h-[2px] rounded-full overflow-hidden relative"
        style={{ backgroundColor: "var(--border-color)" }}
      >
        <div
          ref={barRef}
          className="absolute top-0 left-0 h-full w-0"
          style={{ backgroundColor: "var(--text-primary)" }}
        />
      </div>
      <p
        className="mt-4 font-sans text-xs uppercase tracking-widest animate-pulse"
        style={{ color: "var(--text-secondary)" }}
      >
        Loading Portfolio
      </p>
    </div>
  );
};

export default Loading;
