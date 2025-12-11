import React from "react";
import { Mail } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Contact: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer
      id="contact"
      className="px-6 md:px-12 py-24 flex flex-col justify-between min-h-[60vh]"
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
        borderTop: "1px solid var(--border-color)",
      }}
    >
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-between flex-grow">
        <div className="flex flex-col gap-12 max-w-2xl">
          <h2 className="text-5xl md:text-7xl font-display font-medium tracking-tight">
            Let's talk.
          </h2>

          <a
            href="mailto:alex@designstudio.com"
            className="inline-flex items-center gap-4 text-xl md:text-2xl font-sans transition-colors"
            style={{ color: "var(--text-primary)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--text-secondary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-primary)")
            }
          >
            alex@designstudio.com
            <Mail size={24} />
          </a>

          <button
            className="self-start px-8 py-4 rounded-full font-accent uppercase text-sm tracking-[0.15em] font-semibold hover:scale-105 transition-transform duration-300"
            style={{
              backgroundColor: "var(--text-primary)",
              color: "var(--bg-primary)",
            }}
          >
            Start a Project
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mt-24">
          <div
            className="flex gap-8 text-sm font-accent uppercase tracking-[0.12em]"
            style={{ color: "var(--text-secondary)" }}
          >
            <a
              href="#"
              className="transition-colors"
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--text-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-secondary)")
              }
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="transition-colors"
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--text-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-secondary)")
              }
            >
              Twitter
            </a>
            <a
              href="#"
              className="transition-colors"
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--text-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-secondary)")
              }
            >
              Dribbble
            </a>
          </div>

          <div className="text-right">
            <img
              src="/assets/signature.png"
              alt="Alex Carter Signature"
              className="w-48 h-auto mb-4 opacity-80"
              style={{ filter: theme === "dark" ? "invert(1)" : "none" }}
            />
            <p
              className="text-xs font-accent uppercase tracking-[0.12em]"
              style={{ color: "var(--text-secondary)" }}
            >
              © {new Date().getFullYear()} Alex Carter. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
