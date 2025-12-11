import React, { useEffect, useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { gsap } from "gsap";
import { useTheme } from "../../context/ThemeContext";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const links = [
    { name: "Work", href: "#work" },
    { name: "Philosophy", href: "#philosophy" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        ".mobile-menu-item",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" }
      );
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center mix-blend-difference text-white">
        <a href="#" className="hover:opacity-70 transition-opacity">
          <img
            src="/assets/image.png"
            alt="Logo"
            className="h-12 md:h-16 w-auto"
            style={{
              filter:
                theme === "dark" ? "invert(1) saturate(1.5)" : "saturate(1.5)",
            }}
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-12">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-sans uppercase tracking-widest hover:opacity-50 transition-opacity duration-300 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Theme Toggle - Desktop */}
        <button
          onClick={toggleTheme}
          className="hidden md:flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300"
          style={{ border: "1px solid var(--border-color)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--text-primary)";
            e.currentTarget.style.color = "var(--bg-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "inherit";
          }}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-full"
            style={{ border: "1px solid var(--border-color)" }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            className="text-white z-50 relative"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col justify-center items-center md:hidden"
          style={{ backgroundColor: "var(--bg-primary)" }}
        >
          <div className="flex flex-col gap-8 text-center">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="mobile-menu-item text-3xl font-display font-light"
                style={{ color: "var(--text-primary)" }}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
