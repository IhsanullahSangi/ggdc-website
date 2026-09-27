import { useState } from "react";
import { X, Bell, Info } from "lucide-react";

const NotificationPopup = () => {
  // Set to true manually in code if you want to display an urgent notice
  const [isOpen, setIsOpen] = useState(false);

  // Hardcoded static data for when isOpen is set to true
  const [popupData] = useState({
    title: "Important Update",
    content: "Please note that college admissions are currently ongoing.",
    imageUrl: "",
    linkText: "Click here for more details",
    linkUrl: "#",
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-collegeDark/85 backdrop-blur-sm p-4 print:hidden">
      <div className="bg-white rounded-md shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300 border border-collegeDark/20">
        <div className="bg-collegeDark text-white px-4 py-3 flex justify-between items-center border-b-2 border-collegeCyan">
          <div className="flex items-center gap-2 font-heading font-bold text-lg tracking-wide">
            <Bell size={20} className="text-collegeCyan animate-bounce" />
            <span>{popupData.title}</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:text-collegeCyan p-1 rounded transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        <div className="p-4 md:p-6 font-body text-center flex flex-col items-center max-h-[80vh] overflow-y-auto">
          {popupData.imageUrl ? (
            <img
              src={popupData.imageUrl}
              alt="Popup Notice Banner"
              className="w-full h-auto max-h-64 object-contain rounded-md mb-4 border border-gray-100 shadow-sm"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = "none";
              }}
            />
          ) : (
            <Info className="w-12 h-12 text-collegeCyan mb-4 shrink-0" />
          )}

          {popupData.content && (
            <p className="text-slate-700 leading-relaxed text-lg whitespace-pre-wrap">
              {popupData.content}
            </p>
          )}

          {popupData.linkUrl && (
            <a
              href={popupData.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-collegeCyan font-bold hover:text-collegeDark underline underline-offset-4 transition-colors"
            >
              {popupData.linkText}
            </a>
          )}

          <button
            onClick={() => setIsOpen(false)}
            className="mt-6 bg-collegeDark text-white px-8 py-2 rounded font-bold hover:bg-collegeCyan transition-colors w-full shrink-0"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPopup;
