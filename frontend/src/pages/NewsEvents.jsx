import {
  Calendar,
  MapPin,
  Clock,
  Bell,
  Megaphone,
  ChevronRight,
} from "lucide-react";

// SVG Icon Helper
const FileTextIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

// 🌟 EXPORT THE DATA
export const announcements = [
  {
    _id: "1",
    title: "Admissions Open for Fall 2026",
    publishedAt: "2026-09-20",
    fileUrl: "#",
  },
  {
    _id: "2",
    title: "Submission of Examination Forms for BS Programs",
    publishedAt: "2026-09-22",
    fileUrl: "#",
  },
  {
    _id: "3",
    title: "Schedule for Practical Examinations - Computer Science",
    publishedAt: "2026-09-25",
    fileUrl: "#",
  },
];

export const newsItems = [
  {
    _id: "4",
    title: "College secures new IT Lab equipment",
    publishedAt: "2026-09-15",
    fileUrl: "#",
  },
];

export const eventsItems = [
  {
    _id: "5",
    title: "Annual Sports Day",
    publishedAt: "2026-11-10",
    fileUrl: "#",
  },
];

const NewsEvents = () => {
  // Date Format Helpers
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  const getDay = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", { day: "2-digit" });
  const getMonth = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", { month: "short" });

  return (
    <main className="font-body w-full min-h-screen bg-slate-50">
      <div className="bg-collegeDark py-10 md:py-14 text-center border-b-4 border-collegeCyan">
        <h1 className="text-2xl md:text-4xl font-heading font-bold text-white uppercase tracking-wider">
          News & Events
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16 md:space-y-20">
        {/* SECTION 1: ANNOUNCEMENTS */}
        <section id="announcements" className="scroll-mt-28">
          <div className="flex items-center gap-2.5 md:gap-3 mb-6 md:mb-8 border-b-2 border-gray-200 pb-3 md:pb-4">
            <Megaphone className="text-collegeDark w-6 h-6 md:w-8 md:h-8" />
            <h2 className="text-xl md:text-3xl font-heading font-bold text-collegeDark uppercase tracking-wide">
              Announcements
            </h2>
          </div>

          <div className="space-y-3 md:space-y-4">
            {announcements.length === 0 ? (
              <p className="text-gray-500 italic">No recent announcements.</p>
            ) : (
              announcements.map((item) => (
                <div
                  key={item._id}
                  // 🌟 THE FIX: Reduced padding from p-5 to p-3.5 on mobile
                  className="flex items-center justify-between p-3.5 md:p-6 rounded-lg shadow-sm border-l-4 bg-white hover:shadow-md transition-shadow border-collegeCyan"
                >
                  {/* 🌟 THE FIX: Added flex-1 to allow text to stretch, gap adjusted */}
                  <div className="flex items-center gap-3 md:gap-4 flex-1">
                    {/* 🌟 THE FIX: Added shrink-0 and made the icon proportionally smaller on mobile */}
                    <div className="p-2 md:p-3 rounded-full bg-cyan-50 text-collegeCyan shrink-0">
                      <Bell className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div className="flex-1">
                      {/* 🌟 THE FIX: Dynamic text sizes and line-heights for natural wrapping */}
                      <h3 className="font-heading font-bold text-[14px] sm:text-base md:text-lg text-collegeDark leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-[11px] sm:text-sm text-gray-500 font-medium mt-0.5 md:mt-1">
                        Published: {formatDate(item.publishedAt)}
                      </p>
                    </div>
                  </div>

                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden md:flex items-center gap-1 text-collegeDark hover:text-collegeCyan font-semibold text-sm transition-colors shrink-0 ml-4"
                  >
                    View Details <ChevronRight size={16} />
                  </a>
                </div>
              ))
            )}
          </div>
        </section>

        {/* SECTION 2: LATEST NEWS */}
        <section id="news" className="scroll-mt-28">
          <div className="flex items-center gap-2.5 md:gap-3 mb-6 md:mb-8 border-b-2 border-gray-200 pb-3 md:pb-4">
            <FileTextIcon className="text-collegeCyan w-6 h-6 md:w-8 md:h-8" />
            <h2 className="text-xl md:text-3xl font-heading font-bold text-collegeDark uppercase tracking-wide">
              Latest News
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {newsItems.length === 0 ? (
              <p className="text-gray-500 italic col-span-2">
                No latest news available.
              </p>
            ) : (
              newsItems.map((news) => (
                <div
                  key={news._id}
                  // Mobile proportion fixes applied here too
                  className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6 flex gap-4 md:gap-6 hover:shadow-md transition-shadow group"
                >
                  <div className="flex flex-col items-center justify-center bg-slate-50 border-2 border-gray-100 rounded-lg min-w-[65px] h-[65px] md:min-w-[80px] md:h-[80px] shrink-0 group-hover:border-collegeCyan transition-colors">
                    <span className="text-xl md:text-2xl font-bold text-collegeDark leading-none">
                      {getDay(news.publishedAt)}
                    </span>
                    <span className="text-[10px] md:text-xs font-bold text-collegeCyan tracking-wider uppercase mt-1">
                      {getMonth(news.publishedAt)}
                    </span>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-[14px] md:text-lg font-heading font-bold text-collegeDark leading-snug mb-1 md:mb-2 group-hover:text-collegeCyan transition-colors">
                      {news.title}
                    </h3>
                    <a
                      href={news.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[12px] md:text-sm text-collegeCyan font-semibold mt-1 inline-block"
                    >
                      Read Full Story &rarr;
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* SECTION 3: EVENTS */}
        <section id="events" className="scroll-mt-28">
          <div className="flex items-center gap-2.5 md:gap-3 mb-6 md:mb-8 border-b-2 border-gray-200 pb-3 md:pb-4">
            <Calendar className="text-collegeGreen w-6 h-6 md:w-8 md:h-8" />
            <h2 className="text-xl md:text-3xl font-heading font-bold text-collegeDark uppercase tracking-wide">
              Upcoming Events
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {eventsItems.length === 0 ? (
              <p className="text-gray-500 italic col-span-3">
                No upcoming events scheduled.
              </p>
            ) : (
              eventsItems.map((event) => (
                <div
                  key={event._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-collegeGreen hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="p-5 md:p-6">
                    <h3 className="text-lg md:text-xl font-heading font-bold text-collegeDark mb-4 text-center leading-snug">
                      {event.title}
                    </h3>

                    <div className="space-y-3 mb-5 md:mb-6">
                      <div className="flex items-center justify-center gap-2 text-[13px] md:text-sm text-gray-600 bg-slate-50 p-2 rounded">
                        <Calendar
                          size={16}
                          className="text-collegeCyan shrink-0"
                        />
                        <span className="font-medium">
                          {formatDate(event.publishedAt)}
                        </span>
                      </div>
                    </div>

                    <a
                      href={event.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex justify-center bg-slate-100 text-collegeDark py-2 rounded font-bold text-[13px] md:text-sm tracking-wide hover:bg-collegeDark hover:text-white transition-colors"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default NewsEvents;
