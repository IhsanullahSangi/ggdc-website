import { useState, useEffect, useRef } from "react";
import { Users } from "lucide-react";

const EnrollmentStats = () => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // 🌟 STATIC DATA: Hardcoded target number instead of fetching from DB
  const [targetNumber] = useState(551);

  const sectionRef = useRef(null);

  const animationDuration = 2000;

  // 1. Detect when section scrolls into view (RUNS ONLY ONCE NOW)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.disconnect(); // 🌟 THE FIX: Stops observing after the first trigger
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 2. Run the counting animation
  useEffect(() => {
    if (!isVisible || targetNumber === 0) return;

    let start = 0;
    const increment = targetNumber / (animationDuration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetNumber) {
        setCount(targetNumber);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, targetNumber]);

  return (
    <section
      ref={sectionRef}
      className="bg-collegeDark py-16 md:py-24 relative overflow-hidden border-t-4 border-collegeCyan"
    >
      <div className="absolute -right-20 -top-40 w-96 h-96 bg-collegeCyan opacity-10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -left-20 -bottom-40 w-96 h-96 bg-collegeGreen opacity-10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white/5 p-4 md:p-5 rounded-full mb-6 border border-white/10 shadow-lg">
            <Users size={40} className="text-collegeCyan md:w-12 md:h-12" />
          </div>
          <div className="text-6xl md:text-7xl lg:text-8xl font-bold font-heading text-white tracking-tight mb-2 drop-shadow-lg flex items-center justify-center">
            {count}
            <span className="text-collegeCyan">+</span>
          </div>
          <div className="text-xl md:text-2xl font-body font-bold text-gray-300 tracking-[0.25em] uppercase mt-2">
            Enrolled Girls
          </div>
          <div className="mt-8 w-20 h-1.5 bg-collegeGreen mx-auto rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default EnrollmentStats;
