import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { FaYoutube, FaFacebook, FaEnvelope } from "react-icons/fa";

// 🌟 THE FIX: Import all three data arrays from the NewsEvents page
import { announcements, newsItems, eventsItems } from "../pages/NewsEvents"; // Adjust path if needed

const Hero = () => {
  // 🌟 THE MAGIC LOGIC: Grab the 1st item of each array.
  // .filter(Boolean) safely removes any empty items if a category has no news yet!
  const recentNotices = [announcements[0], newsItems[0], eventsItems[0]].filter(
    Boolean,
  );

  // State variables for the Smart Ticker
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Hardcoded static images to keep the slider animation working smoothly
  const [heroImages] = useState([
    {
      _id: "img1",
      imageUrl:
        "https://res.cloudinary.com/lpoftm4n/image/upload/v1790401101/IMG_20260923_101154.jpg",
      caption: "",
    },
    {
      _id: "img2",
      imageUrl:
        "https://res.cloudinary.com/lpoftm4n/image/upload/v1790401501/IMG_20260923_102124.jpg",
      caption: "",
    },
    {
      _id: "img3",
      imageUrl:
        "https://res.cloudinary.com/lpoftm4n/image/upload/v1790420771/IMG_20260923_102630.jpg",
      caption: "",
    },
  ]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Smart Ticker Timer Logic
  useEffect(() => {
    if (recentNotices.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % recentNotices.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [recentNotices, isHovered]);

  // Dynamic Slider Timer Logic
  useEffect(() => {
    if (heroImages.length <= 1) return;

    const sliderInterval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Changes image every 5 seconds

    return () => clearInterval(sliderInterval);
  }, [heroImages.length]);

  return (
    <section className="w-full bg-slate-100 py-6 md:py-10 relative">
      <div className="absolute top-0 left-0 w-full h-[40%] bg-collegeDark z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-0 sm:px-4 lg:px-8">
        <div className="flex flex-col shadow-2xl bg-white sm:rounded-lg overflow-hidden border border-gray-200">
          {/* TOP HEADER BAR */}
          <div className="w-full flex flex-row">
            <div className="bg-collegeGreen text-white font-heading font-bold px-4 py-3 md:px-6 md:py-4 text-[13px] sm:text-base md:text-xl lg:text-2xl flex items-center">
              Welcome to Government Girls Degree College Ghotki
            </div>

            <div className="bg-collegeDark flex-1 flex justify-end items-center px-4 py-3 md:px-6 md:py-4 gap-4 md:gap-6 text-white border-b-4 border-collegeDark sm:border-none">
              <a
                href="mailto:girlsdegreecollegeghotki@gmail.com?subject=Website Inquiry"
                className="hover:text-collegeCyan transition-colors"
                title="Email the College"
              >
                <FaEnvelope className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a
                href="https://youtube.com/@ggdcghotki?si=PZ0gldvl8-w6omEJ"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-collegeCyan transition-colors"
                title="Official YouTube Channel"
              >
                <FaYoutube className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61573783708422"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-collegeCyan transition-colors"
                title="Official Facebook Page"
              >
                <FaFacebook className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </div>

          {/* MAIN IMAGE CAROUSEL AREA */}
          <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] bg-slate-200 overflow-hidden">
            {heroImages.length > 0 ? (
              <div
                className="w-full h-full flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${currentSlideIndex * 100}%)`,
                }}
              >
                {heroImages.map((img) => (
                  <div key={img._id} className="min-w-full h-full relative">
                    <img
                      src={img.imageUrl}
                      alt={img.caption || "GGDC Campus"}
                      className="w-full h-full object-cover object-center"
                    />
                    {img.caption && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                        <div className="w-full p-6 md:p-10 text-white font-heading font-bold text-xl md:text-3xl drop-shadow-lg md:mb-10">
                          {img.caption}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <img
                src="https://placehold.co/1920x1080/0F2841/FFFFFF?text=GGDC+Campus+Building"
                alt="GGDC Campus Fallback"
                className="w-full h-full object-cover object-center"
              />
            )}

            {/* Clickable Next Button */}
            <div
              onClick={() => {
                if (heroImages.length > 1) {
                  setCurrentSlideIndex(
                    (prev) => (prev + 1) % heroImages.length,
                  );
                }
              }}
              className="absolute right-0 bottom-0 bg-black/60 hover:bg-collegeDark transition-colors cursor-pointer px-4 py-3 md:px-6 md:py-4 flex items-center justify-center backdrop-blur-sm z-20"
              title="Next Image"
            >
              <ArrowRight
                size={24}
                className="text-white md:w-8 md:h-8"
                strokeWidth={2.5}
              />
            </div>
          </div>

          {/* BOTTOM ANNOUNCEMENT BAR */}
          <div className="w-full flex flex-row h-10 md:h-14 border-b-4 border-collegeDark relative">
            {/* Left Indicator Block */}
            <div className="bg-white px-4 md:px-6 flex items-center justify-center gap-1.5 md:gap-2 min-w-[80px] md:min-w-[100px] z-10 border-r border-gray-100 shadow-sm">
              {recentNotices.map((_, index) => (
                <div
                  key={index}
                  className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-sm transition-all duration-500 ${
                    index === activeIndex
                      ? "bg-collegeDark scale-125"
                      : "bg-collegeGreen opacity-30"
                  }`}
                ></div>
              ))}
            </div>

            {/* Right Animated Ticker Block */}
            <div
              className="bg-collegeGreen flex-1 flex items-center overflow-hidden relative cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {recentNotices.length === 0 ? (
                <div className="px-4 text-white text-[12px] sm:text-sm font-body">
                  No new announcements.
                </div>
              ) : (
                recentNotices.map((notice, index) => (
                  <div
                    key={notice._id}
                    className={`absolute w-full px-4 flex items-center h-full transition-all duration-500 ease-in-out ${
                      index === activeIndex
                        ? "opacity-100 translate-y-0 z-10"
                        : "opacity-0 translate-y-4 pointer-events-none z-0"
                    }`}
                  >
                    <a
                      href={notice.fileUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-collegeDark transition-colors text-[12px] sm:text-sm md:text-base font-body font-medium truncate w-full flex items-center gap-2"
                    >
                      <span className="text-collegeCyan text-xs md:text-sm shrink-0">
                        🚨
                      </span>
                      <span className="truncate">{notice.title}</span>
                    </a>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
