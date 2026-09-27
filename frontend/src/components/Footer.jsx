import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-collegeDark pt-16 font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-12">
          {/* Column 1: Logo & Map */}
          <div className="flex flex-col gap-6">
            {/* Logo & Name wrapped collectively in a very thin line */}
            <div className="flex items-center gap-4 md:gap-5 border border-white/20 p-3 md:p-4 rounded-md w-fit">
              {/* Raw Logo with no white background */}
              <div className="shrink-0 w-16 h-16 md:w-[75px] md:h-[75px] flex items-center justify-center">
                <img
                  src="/college-logo.jpeg"
                  alt="GGDC Ghotki Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/100x100/0F2841/FFFFFF?text=GGDC";
                  }}
                />
              </div>

              {/* Text locked to 2 lines */}
              <div className="flex flex-col justify-center">
                <h3 className="font-heading font-bold text-white text-base md:text-[19px] tracking-wide leading-[1.3] md:whitespace-nowrap">
                  GOVERNMENT GIRLS DEGREE COLLEGE
                  <br />
                  GHOTKI
                </h3>
              </div>
            </div>

            <div className="w-full h-56 md:h-64 rounded-md overflow-hidden border border-white/25 shadow-inner mt-2 flex">
              <iframe
                src="https://maps.google.com/maps?q=Government+Girls+Degree+College+Ghotki&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 block"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Column 2: Contact Details & Working Hours */}
          <div className="flex flex-col justify-center">
            <h4 className="text-white font-bold text-xl mb-6 tracking-wide">
              Contact
            </h4>
            <ul className="flex flex-col gap-5 text-gray-300 text-sm md:text-base mb-10">
              <li className="flex items-start gap-4">
                <Phone size={20} className="text-collegeCyan shrink-0 mt-0.5" />
                <span>0723-XXXXXX</span>
              </li>
              <li className="flex items-start gap-4">
                <MapPin
                  size={20}
                  className="text-collegeCyan shrink-0 mt-0.5"
                />
                <span className="leading-relaxed">
                  Government Girls Degree College Ghotki, Sindh, Pakistan
                </span>
              </li>
              <li className="flex items-start gap-4">
                <Mail size={20} className="text-collegeCyan shrink-0 mt-0.5" />
                <a
                  href="mailto:girlsdegreecollegeghotki@gmail.com"
                  className="hover:text-collegeCyan transition-colors"
                >
                  girlsdegreecollegeghotki@gmail.com
                </a>
              </li>
            </ul>

            <h4 className="text-white font-bold text-xl mb-4 tracking-wide">
              College Working Hours
            </h4>
            <ul className="flex flex-col gap-2 text-gray-300 text-sm md:text-base">
              <li>Mon - Thu: 08:30 AM to 01:30 PM</li>
              <li>Fri: 08:30 AM to 12:00 PM</li>
              <li>Sat - Sun: Closed</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#0a1b2d] py-6 px-4 border-t border-white/10 mt-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-3">
          <p className="text-gray-500 text-xs tracking-wide text-center w-full">
            All rights Reserved © GGDC Ghotki 2026
          </p>

          <div className="w-full flex flex-col justify-center items-center gap-3 text-gray-400 text-xs md:text-sm">
            {/* 🌟 THE FIX: Added 'text-center' to handle multiline wrapping perfectly */}
            <p className="text-center leading-relaxed">
              Developed & Managed by{" "}
              <span className="text-collegeCyan font-medium tracking-wide">
                Ihsanullah Sangi
              </span>
              , Lecturer CS @ GGDC Ghotki
            </p>

            {/* <div className="flex items-center gap-4 mt-1">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <span className="text-gray-600">|</span>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Services
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
