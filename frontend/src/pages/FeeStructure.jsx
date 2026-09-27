import { BookOpen, FileText, ExternalLink, GraduationCap } from "lucide-react";

const FeeStructure = () => {
  // 🌟 STATIC DATA: Paste your actual Google Drive PDF links here
  const links = {
    feeLinkAD: "#",
    feeLinkBS: "#",
  };

  return (
    <main className="font-body w-full min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="bg-collegeDark py-10 md:py-14 text-center border-b-4 border-collegeCyan">
        <h1 className="text-2xl md:text-4xl font-heading font-bold text-white uppercase tracking-wider">
          Fee Structure
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-collegeDark uppercase tracking-wide">
            Academic Programs
          </h2>
          <div className="w-24 h-1 bg-collegeGreen mx-auto mt-4 mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Government Girls Degree College Ghotki is committed to providing
            highly affordable, merit-based education to empower women across the
            region.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Intermediate */}
          <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-collegeGreen flex flex-col">
            <div className="w-16 h-16 bg-[#f0f8fb] rounded-full flex items-center justify-center mx-auto mb-6 text-collegeGreen">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-heading font-bold text-collegeDark mb-2 text-center">
              Intermediate
            </h3>
            <p className="text-sm text-gray-500 mb-4 font-medium text-center">
              Pre-Medical, Pre-Engineering, CS, & Commerce
            </p>
            <div className="bg-green-50 w-full py-4 rounded mb-4 border border-green-100 text-center">
              <span className="block text-2xl font-bold text-collegeGreen tracking-wide">
                ZERO FEE
              </span>
              <span className="text-xs text-green-700 uppercase tracking-wider font-semibold">
                Rs. 0 / Semester
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mt-auto">
              Under the official policy of the Government of Sindh, all
              Intermediate education is provided 100% free of charge to promote
              female literacy and higher education.
            </p>
          </div>

          {/* Card 2: AD */}
          <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-collegeCyan flex flex-col">
            <div className="w-16 h-16 bg-[#f0f8fb] rounded-full flex items-center justify-center mx-auto mb-6 text-collegeCyan">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-heading font-bold text-collegeDark mb-2 text-center">
              Associate Degree (AD)
            </h3>
            <p className="text-sm text-gray-500 mb-6 font-medium text-center">
              Associate Degree of Science (ADS)
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              The fee structure for Associate Degree programs is highly
              subsidized. Please refer to the official document for
              semester-wise breakdown and admission fees.
            </p>
            <a
              href={links.feeLinkAD}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto flex items-center justify-center gap-2 w-full bg-collegeCyan text-white py-3 px-4 rounded hover:bg-opacity-90 transition-colors font-semibold tracking-wide text-sm"
            >
              View PDF Structure <ExternalLink size={18} />
            </a>
          </div>

          {/* Card 3: BS Programs */}
          <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-collegeDark flex flex-col">
            <div className="w-16 h-16 bg-[#f0f8fb] rounded-full flex items-center justify-center mx-auto mb-6 text-collegeDark">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-heading font-bold text-collegeDark mb-2 text-center">
              Undergraduate Programs
            </h3>
            <p className="text-sm text-gray-500 mb-6 font-medium text-center">
              BS-Botany (4 Year)
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              Detailed tuition, examination, and enrollment fee requirements for
              all 4-Year BS Programs affiliated with SALU Khairpur.
            </p>
            <a
              href={links.feeLinkBS}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto flex items-center justify-center gap-2 w-full bg-collegeDark text-white py-3 px-4 rounded hover:bg-opacity-90 transition-colors font-semibold tracking-wide text-sm"
            >
              View PDF Structure <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FeeStructure;
