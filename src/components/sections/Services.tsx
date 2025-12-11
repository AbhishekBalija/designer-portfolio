import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Product Design",
    id: "01",
    description:
      "We build digital products that are not only functional but also delightful to use. From initial concept to final polish, we ensure every detail serves a purpose.",
    highlights: [
      "User Research & Testing",
      "Wireframing & Prototyping",
      "Design Systems",
    ],
    icon: "/assets/icon-product.png",
  },
  {
    title: "Interface Design",
    id: "02",
    description:
      "Crafting pixel-perfect interfaces that are visually stunning and intuitive. We focus on clarity, consistency, and creating a strong visual language.",
    highlights: [
      "Visual Identity",
      "UI Component Libraries",
      "Responsive Layouts",
    ],
    icon: "/assets/icon-interface.png",
  },
  {
    title: "Motion Design",
    id: "03",
    description:
      "Bringing interfaces to life with purposeful motion. We use animation to guide users, provide feedback, and add a layer of polish that sets your product apart.",
    highlights: ["Interaction Design", "Micro-animations", "Storytelling"],
    icon: "/assets/icon-motion.png",
  },
  {
    title: "UX Strategy",
    id: "04",
    description:
      " aligning user needs with business goals. We define the 'why' and 'how' before the 'what', ensuring a solid foundation for your digital product.",
    highlights: [
      "Information Architecture",
      "User Journey Mapping",
      "Conversion Optimization",
    ],
    icon: "/assets/icon-strategy.png",
  },
];

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState<number | null>(null);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-item",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    contentRefs.current.forEach((el, index) => {
      if (!el) return;

      const isOpen = activeService === index;

      if (isOpen) {
        gsap.to(el, {
          height: "auto",
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        });

        const innerElements = el.querySelectorAll(".service-content-inner > *");
        gsap.fromTo(
          innerElements,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.05,
            delay: 0.1,
            ease: "power2.out",
          }
        );
      } else {
        gsap.to(el, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power3.inOut",
        });
      }
    });
  }, [activeService]);

  const toggleService = (index: number) => {
    setActiveService(activeService === index ? null : index);
  };

  return (
    <section
      ref={containerRef}
      id="services"
      className="py-24 md:py-32 px-6 md:px-12"
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 md:mb-24">
          <h2 className="text-4xl md:text-7xl font-display font-medium tracking-tight mb-6">
            Our Services
          </h2>
          <p
            className="font-sans text-lg max-w-xl"
            style={{ color: "var(--text-secondary)" }}
          >
            We combine strategic thinking with premium aesthetics to deliver
            meaningful digital experiences.
          </p>
        </div>

        <div
          className="flex flex-col"
          onMouseLeave={() => setHoveredService(null)}
        >
          {services.map((service, index) => {
            const isActive = activeService === index;
            // Dim if we are hovering something else, OR if something is active and this is not it (optional, but cleaner to just use hover)
            // The user wanted "dim others on hover" specifically.
            const isDimmed =
              hoveredService !== null && hoveredService !== index && !isActive;

            return (
              <div
                key={index}
                className="service-item group relative cursor-pointer transition-all duration-300"
                style={{
                  borderTop: "1px solid var(--border-color)",
                  borderBottom:
                    index === services.length - 1
                      ? "1px solid var(--border-color)"
                      : "none",
                  opacity: isDimmed ? 0.4 : 1,
                }}
                onMouseEnter={() => setHoveredService(index)}
                onClick={() => toggleService(index)}
              >
                <div className="py-10 md:py-14 flex justify-between items-center w-full">
                  <div className="flex items-center gap-8 md:gap-16">
                    <span
                      className="font-accent text-sm w-8"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {service.id}
                    </span>
                    <h3 className="text-3xl md:text-6xl font-display font-medium tracking-tight transition-transform duration-300 group-hover:translate-x-4">
                      {service.title}
                    </h3>
                  </div>

                  <div
                    className={`transition-transform duration-300 ${
                      isActive ? "rotate-90" : "rotate-0"
                    } ${
                      isActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <ArrowUpRight size={32} />
                  </div>
                </div>

                {/* Expanded Content */}
                <div
                  ref={(el) => {
                    contentRefs.current[index] = el;
                  }}
                  className="overflow-hidden h-0 opacity-0"
                >
                  <div className="service-content-inner pb-10 md:pb-14 pl-14 md:pl-28 pr-4 grid md:grid-cols-2 gap-8 md:gap-16 items-start">
                    <div className="order-2 md:order-1">
                      <p
                        className="text-lg leading-relaxed mb-6"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {service.description}
                      </p>

                      <ul className="space-y-3">
                        {service.highlights.map((highlight, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-3 text-sm font-accent tracking-wide"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-white opacity-50"></span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="order-1 md:order-2 flex justify-end">
                      <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl bg-white/5 flex items-center justify-center p-6 backdrop-blur-sm border border-white/10">
                        <img
                          src={service.icon}
                          alt={service.title}
                          className="w-full h-full object-contain opacity-90"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
