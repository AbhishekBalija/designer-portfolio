import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Philosophy: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    const words = text.innerText.split(" ");
    text.innerHTML = "";
    words.forEach((word) => {
      const span = document.createElement("span");
      span.innerText = word + " ";
      span.style.opacity = "0.1"; // Start almost invisible
      text.appendChild(span);
    });

    const spans = text.querySelectorAll("span");

    gsap.to(spans, {
      opacity: 1,
      stagger: 0.1,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "bottom 70%",
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      ref={containerRef}
      id="philosophy"
      className="min-h-[80vh] flex items-center justify-center px-6 md:px-12 py-24"
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2
          ref={textRef}
          className="text-4xl md:text-6xl lg:text-8xl font-display font-medium leading-tight tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Good design is invisible. Great design feels inevitable.
        </h2>
        <div className="mt-16 flex justify-center">
          <div
            className="w-1 h-24 opacity-20"
            style={{
              background:
                "linear-gradient(to bottom, var(--text-primary), transparent)",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
