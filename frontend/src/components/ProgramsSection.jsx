import {
  Microscope,
  Settings,
  Monitor,
  Briefcase,
  GraduationCap,
  Leaf,
} from "lucide-react";

const ProgramsSection = () => {
  const programs = [
    {
      category: "Intermediate Programs (HSC)",
      items: [
        { title: "Pre-Medical", icon: Microscope },
        { title: "Pre-Engineering", icon: Settings },
        { title: "ICS (Computer Science)", icon: Monitor },
        { title: "ICom (Commerce)", icon: Briefcase },
      ],
    },
    {
      category: "Associate Degree Programs (ADP)",
      items: [
        {
          title: "Associate Degree in Science (ADS) – 2 Years",
          icon: GraduationCap,
        },
      ],
    },
    {
      category: "Undergraduate Programs (BS)",
      items: [{ title: "BS Botany – 4 Years", icon: Leaf }],
    },
  ];

  return (
    <section
      id="programs"
      className="scroll-mt-24 py-16 md:py-24 bg-white relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Outer Box */}
        <div className="bg-white border border-gray-200 rounded-sm p-6 md:p-10 lg:p-14 shadow-sm">
          {/* Header fixed to ALWAYS be left-aligned, matching "MESSAGE" */}
          <h2 className="text-gray-400 font-bold text-xl md:text-2xl tracking-[0.2em] uppercase mb-10">
            Our Programs
          </h2>

          <div className="space-y-16">
            {programs.map((group, index) => (
              <div key={index}>
                {/* Centered and Responsive Category Title */}
                <h3 className="font-heading font-bold text-lg sm:text-xl md:text-2xl text-black text-center border-b border-gray-100 pb-4 mb-8">
                  {group.category}
                </h3>

                {/* Dynamic Grid */}
                <div
                  className={`grid gap-6 ${
                    group.items.length > 1
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                      : "grid-cols-1"
                  }`}
                >
                  {group.items.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        className="bg-[#f4f5f7] py-10 px-6 flex flex-col items-center justify-center hover:bg-[#e4e7ec] transition-colors duration-300 group"
                      >
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-collegeGreen rounded-full flex items-center justify-center mb-5 shadow-sm group-hover:scale-105 transition-transform duration-300">
                          <Icon
                            size={28}
                            strokeWidth={2}
                            className="text-white md:w-8 md:h-8"
                          />
                        </div>

                        <h4 className="font-body text-black text-base md:text-lg font-medium text-center leading-snug">
                          {item.title}
                        </h4>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
