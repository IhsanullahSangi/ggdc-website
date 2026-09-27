import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, ChevronRight, ChevronDown, ArrowLeft } from "lucide-react";
import { navLinks } from "../utils/navData";
import collegeLogo from "../assets/college-logo.jpeg";
import collegeLogoNav from "/college-logo.jpeg";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const currentSubMenuData = navLinks.find(
    (link) => link.name === activeSubMenu,
  );

  const location = useLocation();

  // 1. This handles smoothly scrolling to sections (like Principal's Message)
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  // 2. This tracks the scroll to make the Nav sticky and trigger the pop-up
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="font-body w-full relative">
      {/* TIER 1: BRANDING (Visible initially, scrolls naturally out of view) */}
      <div className="bg-white py-3 md:py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-3 md:gap-5 w-max group cursor-pointer"
        >
          <img
            src={collegeLogo}
            alt="GGDC Logo"
            className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain flex-shrink-0 drop-shadow-sm transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col justify-center">
            <h1 className="font-heading font-bold text-collegeDark text-base sm:text-lg md:text-2xl lg:text-3xl uppercase tracking-wide leading-tight group-hover:text-collegeCyan transition-colors">
              Government Girls Degree College Ghotki
            </h1>
            <p className="text-collegeGreen italic text-[10px] sm:text-xs md:text-sm lg:text-base font-medium mt-0.5 md:mt-1">
              "Empowering Women Through Education"
            </p>
          </div>
        </Link>
      </div>

      {/* Spacer prevents layout jumping when navbar becomes fixed */}
      {isScrolled && <div className="h-14 lg:h-16 w-full" />}

      {/* TIER 2: NAVIGATION (Bulletproof Fixed on scroll) */}
      <nav
        className={`bg-collegeDark text-white shadow-md transition-all duration-300 w-full ${
          isScrolled ? "fixed top-0 left-0 z-50" : "relative z-50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Flex container holding Desktop Menu OR Mobile Header components */}
          <div className="flex justify-between items-center h-14 lg:h-16 w-full">
            {/* --- MOBILE MAGIC POP-UP (Left Side) --- */}
            <Link
              to="/"
              className={`lg:hidden flex items-center gap-2 transition-all duration-500 ease-out overflow-hidden hover:opacity-80 ${
                isScrolled
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3 pointer-events-none"
              }`}
            >
              <div className="shrink-0 w-8 h-8 flex items-center justify-center">
                <img
                  src={collegeLogoNav}
                  alt="GGDC Compact Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-heading font-bold text-white text-[10px] min-[375px]:text-[11px] sm:text-xs tracking-wide whitespace-nowrap">
                GOVERNMENT GIRLS DEGREE COLLEGE GHOTKI
              </span>
            </Link>

            {/* --- DESKTOP MENU (Center) --- */}
            <div className="hidden lg:flex space-x-8 w-full justify-center h-full">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative group cursor-pointer flex items-center h-full"
                >
                  {link.subLinks ? (
                    <>
                      {/* Dropdown Trigger */}
                      <span className="flex items-center gap-1 hover:text-collegeCyan transition-colors font-semibold tracking-wider text-sm py-5">
                        {link.name}
                        <ChevronDown
                          size={16}
                          className="text-gray-300 group-hover:text-collegeCyan"
                        />
                      </span>

                      {/* Dropdown List */}
                      <div className="absolute left-0 top-full mt-0 w-64 bg-white text-collegeDark shadow-xl rounded-b-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border-t-4 border-collegeCyan z-50">
                        {link.subLinks.map((sub) => {
                          const actualHref = sub.href;

                          return actualHref?.startsWith("http") ? (
                            <a
                              href={actualHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              key={sub.label}
                              className="block px-5 py-3 hover:bg-slate-50 hover:text-collegeCyan transition-colors border-b border-gray-100 last:border-0 text-sm font-medium"
                            >
                              {sub.label}
                            </a>
                          ) : (
                            <Link
                              to={actualHref || "#"}
                              key={sub.label}
                              className="block px-5 py-3 hover:bg-slate-50 hover:text-collegeCyan transition-colors border-b border-gray-100 last:border-0 text-sm font-medium"
                            >
                              {sub.label}
                            </Link>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    /* Direct Link for items without subLinks (like CONTACT US) */
                    <Link
                      to={link.href || "#"}
                      className="flex items-center hover:text-collegeCyan transition-colors font-semibold tracking-wider text-sm py-5"
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* --- MOBILE MENU TOGGLE (Right Side) --- */}
            <div className="lg:hidden flex items-center justify-end shrink-0">
              <button
                onClick={() => {
                  setIsOpen(!isOpen);
                  setActiveSubMenu(null);
                }}
                className="flex items-center gap-2 text-collegeCyan hover:text-white transition-colors py-2"
              >
                <span className="font-body font-medium text-lg tracking-wide">
                  {isOpen ? "Close" : "Menu"}
                </span>
                {isOpen ? (
                  <X size={32} strokeWidth={2.5} />
                ) : (
                  <Menu size={32} strokeWidth={2.5} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drill-Down Overlay */}
        {isOpen && (
          <div className="absolute left-0 top-full w-full h-[calc(100vh-56px)] bg-collegeDark z-40 lg:hidden overflow-y-auto shadow-inner">
            <div className="px-4 py-2 pb-20">
              {!activeSubMenu ? (
                <ul className="flex flex-col">
                  {navLinks.map((link) => (
                    <li key={link.name} className="border-b border-gray-700/50">
                      {link.subLinks ? (
                        <button
                          onClick={() => setActiveSubMenu(link.name)}
                          className="w-full flex justify-between items-center py-4 text-collegeCyan font-semibold text-lg hover:text-white"
                        >
                          {link.name} <ChevronRight size={20} />
                        </button>
                      ) : (
                        <Link
                          to={link.href || "#"}
                          onClick={() => setIsOpen(false)}
                          className="w-full flex justify-between items-center py-4 text-collegeCyan font-semibold text-lg hover:text-white"
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="animate-in slide-in-from-right-4 duration-300">
                  <button
                    onClick={() => setActiveSubMenu(null)}
                    className="flex items-center gap-2 py-4 mb-2 text-white font-bold border-b border-gray-600 w-full"
                  >
                    <ArrowLeft size={20} /> Back to Main Menu
                  </button>
                  <h2 className="text-gray-400 text-sm font-bold tracking-wider mb-2 mt-4 px-2 uppercase">
                    {activeSubMenu}
                  </h2>
                  <ul className="flex flex-col">
                    {currentSubMenuData?.subLinks?.map((sub) => {
                      const actualHref = sub.href;

                      return (
                        <li
                          key={sub.label}
                          className="border-b border-gray-800"
                        >
                          {actualHref?.startsWith("http") ? (
                            <a
                              href={actualHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setIsOpen(false)}
                              className="block py-4 px-2 text-collegeCyan hover:text-white cursor-pointer text-lg"
                            >
                              {sub.label}
                            </a>
                          ) : (
                            <Link
                              to={actualHref || "#"}
                              onClick={() => setIsOpen(false)}
                              className="block py-4 px-2 text-collegeCyan hover:text-white cursor-pointer text-lg"
                            >
                              {sub.label}
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;