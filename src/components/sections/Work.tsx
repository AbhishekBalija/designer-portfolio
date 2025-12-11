import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Project Alpha",
    category: "Fintech Mobile App",
    image: "/assets/project1.png",
    description:
      "Redefining mobile banking with a focus on trust and transparency.",
  },
  {
    id: 2,
    title: "Project Nova",
    category: "SaaS Dashboard",
    image: "/assets/project2.png",
    description: "Turning complex data analytics into actionable insights.",
  },
  {
    id: 3,
    title: "Project Echo",
    category: "E-commerce Experience",
    image: "/assets/project3.png",
    description:
      "A minimal shopping journey that puts the product center stage.",
  },
];

const Work: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

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
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    cardsRef.current.forEach((card) => {
      gsap.fromTo(
        card,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section
      ref={containerRef}
      id="work"
      className="min-h-screen py-24 md:py-32 px-6 md:px-12 w-full"
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-32">
        <div
          className="flex flex-col md:flex-row justify-between items-end gap-6 pb-12"
          style={{ borderBottom: "1px solid var(--border-color)" }}
        >
          <div className="space-y-4">
            <h2
              ref={titleRef}
              className="text-4xl md:text-7xl font-display font-medium tracking-tight"
            >
              Selected Work
            </h2>
          </div>
          <p
            className="font-sans text-sm md:text-base max-w-sm pb-2"
            style={{ color: "var(--text-secondary)" }}
          >
            A collection of projects where simplicity meets functionality.
          </p>
        </div>

        <div className="flex flex-col gap-24 md:gap-32">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={addToRefs}
              className={`group flex flex-col md:flex-row gap-8 md:gap-16 items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image Part */}
              <div className="w-full md:w-1/2 aspect-[4/3] relative overflow-hidden rounded-lg cursor-pointer">
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundColor: "var(--bg-secondary)" }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Text Part */}
              <div className="w-full md:w-1/2 flex flex-col items-start gap-6">
                <span
                  className="text-xs font-accent uppercase tracking-[0.15em] px-4 py-1.5 rounded-full"
                  style={{
                    color: "var(--text-secondary)",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "var(--border-color)",
                  }}
                >
                  {project.category}
                </span>
                <h3
                  className="text-3xl md:text-5xl font-display font-medium transition-colors"
                  style={{ color: "var(--text-primary)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--text-secondary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-primary)")
                  }
                >
                  {project.title}
                </h3>
                <p
                  className="font-sans text-lg leading-relaxed max-w-md"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {project.description}
                </p>
                <button
                  className="flex items-center gap-2 text-sm font-accent uppercase tracking-[0.12em] mt-4 group/btn transition-colors"
                  style={{ color: "var(--text-primary)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--text-secondary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-primary)")
                  }
                >
                  View Case Study
                  <ArrowUpRight
                    size={16}
                    className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
