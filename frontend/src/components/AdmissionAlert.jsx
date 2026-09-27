import { useState } from "react";
import { Link } from "react-router-dom";
import { FileSignature, FileText, Award, X } from "lucide-react";

const AdmissionAlert = () => {
  // 🌟 STATIC DATA: Manually change admissionPhase to "admission", "admitCard", "result", or "none"
  const [settings] = useState({
    admissionPhase: "none",
    actionTitle: "",
    actionSubtitle: "",
  });

  const [isVisible, setIsVisible] = useState(true);

  // Keep phaseConfig for icons, links, colors, and DEFAULT fallback text
  const phaseConfig = {
    admission: {
      defaultTitle: "BS Admissions Open",
      defaultSubtitle: "Apply online for Fall 2026",
      icon: <FileSignature className="w-6 h-6 animate-pulse" />,
      link: "/admissions/online-apply",
      bgColor: "bg-collegeGreen",
      hoverColor: "hover:bg-green-700",
    },
    admitCard: {
      defaultTitle: "Download Admit Card",
      defaultSubtitle: "Pre-Entry Test BS Programs",
      icon: <FileText className="w-6 h-6 animate-bounce" />,
      link: "/admissions/admit-card",
      bgColor: "bg-collegeCyan",
      hoverColor: "hover:bg-cyan-700",
    },
    result: {
      defaultTitle: "Check Entry Test Result",
      defaultSubtitle: "Merit List Announced",
      icon: <Award className="w-6 h-6" />,
      link: "/admissions/results",
      bgColor: "bg-collegeDark",
      hoverColor: "hover:bg-gray-900",
    },
  };

  // Determine the current phase safely
  const currentPhase =
    settings?.admissionPhase === "none" ? null : settings?.admissionPhase;

  // If settings aren't loaded yet, phase is null, or user clicked close -> render nothing
  if (!settings || !currentPhase || !phaseConfig[currentPhase] || !isVisible)
    return null;

  const activeConfig = phaseConfig[currentPhase];

  // MAGIC LOGIC: Use Admin text if it exists, otherwise use the default fallback
  const displayTitle = settings.actionTitle || activeConfig.defaultTitle;
  const displaySubtitle =
    settings.actionSubtitle || activeConfig.defaultSubtitle;

  return (
    <div className="fixed bottom-0 left-0 w-full md:bottom-8 md:left-auto md:right-8 md:w-auto z-50 print:hidden animate-in slide-in-from-bottom-8 duration-500">
      <div className="relative">
        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-3 -right-3 bg-white text-gray-500 hover:text-red-500 rounded-full p-1 shadow-md z-10 hidden md:block"
          aria-label="Close alert"
        >
          <X size={16} strokeWidth={3} />
        </button>

        {/* The Main Clickable Banner */}
        <Link
          to={activeConfig.link}
          className={`flex items-center gap-4 p-4 md:px-6 md:py-4 md:rounded-full shadow-2xl text-white transition-all duration-300 ${activeConfig.bgColor} ${activeConfig.hoverColor} md:hover:-translate-y-1`}
        >
          <div className="bg-white/20 p-2 rounded-full">
            {activeConfig.icon}
          </div>

          <div className="flex flex-col mr-6 md:mr-2">
            <span className="font-heading font-bold text-sm md:text-base tracking-wide uppercase">
              {displayTitle}
            </span>
            <span className="text-xs md:text-sm font-medium text-white/90">
              {displaySubtitle}
            </span>
          </div>
        </Link>

        {/* Mobile Close Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsVisible(false);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white md:hidden p-2"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default AdmissionAlert;
