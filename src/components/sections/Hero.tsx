import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  const name = "Alex Carter";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate background gradient orbs
      gsap.fromTo(
        bgRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 2, ease: "power2.out" }
      );

      // Floating animation for orbs
      gsap.to(orb1Ref.current, {
        x: 30,
        y: -20,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(orb2Ref.current, {
        x: -40,
        y: 30,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Stagger animation for each letter
      gsap.fromTo(
        lettersRef.current,
        { y: 100, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          delay: 0.3,
          stagger: 0.05,
          ease: "back.out(1.7)",
        }
      );

      // Fade-in for title
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 1.2, ease: "power3.out" }
      );

      // CTA button entrance
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.5, ease: "power3.out" }
      );

      // Parallax on scroll
      gsap.to(bgRef.current, {
        yPercent: 40,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Animated Gradient Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-30 dark:opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: "url(/assets/hero-bg.jpg)",
          }}
        />

        {/* Gradient Orb 1 */}
        <div
          ref={orb1Ref}
          className="absolute w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] rounded-full blur-[120px] opacity-30"
          style={{
            background:
              "radial-gradient(circle, var(--text-secondary) 0%, transparent 70%)",
            top: "-10%",
            left: "-10%",
          }}
        />
        {/* Gradient Orb 2 */}
        <div
          ref={orb2Ref}
          className="absolute w-[50vw] h-[50vw] md:w-[35vw] md:h-[35vw] rounded-full blur-[100px] opacity-20"
          style={{
            background:
              "radial-gradient(circle, var(--text-secondary) 0%, transparent 70%)",
            bottom: "-5%",
            right: "-5%",
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center flex flex-col items-center">
        <h1 className="text-[15vw] md:text-[12vw] font-display font-bold tracking-tighter leading-none uppercase overflow-hidden">
          {name.split("").map((letter, index) => (
            <span
              key={index}
              ref={(el) => {
                if (el) lettersRef.current[index] = el;
              }}
              className="inline-block"
              style={{
                display: letter === " " ? "inline" : "inline-block",
                width: letter === " " ? "0.3em" : "auto",
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </h1>

        <p
          ref={titleRef}
          className="font-accent text-sm md:text-base mt-6 tracking-[0.25em] uppercase"
          style={{ color: "var(--text-secondary)" }}
        >
          UI/UX Designer
        </p>

        <a
          ref={ctaRef}
          href="#work"
          className="mt-12 px-10 py-4 border text-sm font-accent tracking-[0.15em] uppercase rounded-full transition-all duration-300"
          style={{
            borderColor: "var(--border-color)",
            color: "var(--text-primary)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--text-primary)";
            e.currentTarget.style.color = "var(--bg-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "var(--text-primary)";
          }}
        >
          View Work
        </a>
      </div>
    </section>
  );
};

export default Hero;
