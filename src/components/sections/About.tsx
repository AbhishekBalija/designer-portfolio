import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom bottom",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      imageRef.current,
      { clipPath: "inset(100% 0 0 0)", scale: 1.1 },
      {
        clipPath: "inset(0% 0 0 0)",
        scale: 1,
        duration: 1.5,
        ease: "power4.out",
      }
    ).fromTo(
      textRef.current?.children || [],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" },
      "-=1"
    );
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="min-h-screen flex items-center justify-center px-6 py-24 md:px-12 md:py-32 w-full overflow-hidden"
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-center">
        {/* Image Column */}
        <div className="md:col-span-5 relative order-2 md:order-1">
          <div className="relative overflow-hidden aspect-[3/4] rounded-sm">
            <img
              ref={imageRef}
              src="/assets/portrait.png"
              alt="Alex Carter Portrait"
              className="w-full h-full object-cover grayscale opacity-90 hover:opacity-100 transition-opacity duration-500"
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-50" />
          </div>
        </div>

        {/* Text Column */}
        <div
          ref={textRef}
          className="md:col-span-7 flex flex-col gap-8 order-1 md:order-2"
        >
          <h2
            className="text-xs font-accent uppercase tracking-[0.3em]"
            style={{ color: "var(--text-secondary)" }}
          >
            About
          </h2>

          <p className="text-3xl md:text-5xl lg:text-6xl font-display font-medium leading-[1.1] tracking-tight">
            Removing friction. Amplifying clarity.
          </p>

          <p
            className="font-sans text-lg md:text-xl font-light leading-relaxed max-w-xl"
            style={{ color: "var(--text-secondary)" }}
          >
            8+ years designing systems, interactions, and emotions.
          </p>

          <div className="pt-8">
            <div
              className="h-[1px] w-full mb-8"
              style={{ backgroundColor: "var(--border-color)" }}
            />
            <div className="flex gap-12">
              <div>
                <h3
                  className="text-xs font-accent uppercase tracking-[0.2em] mb-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Location
                </h3>
                <p className="font-display text-lg">San Francisco, CA</p>
              </div>
              <div>
                <h3
                  className="text-xs font-accent uppercase tracking-[0.2em] mb-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Focus
                </h3>
                <p className="font-display text-lg">Product & Strategy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
