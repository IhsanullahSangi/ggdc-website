import { Book, Library, FileText, ExternalLink, Globe } from "lucide-react";

const Curriculum = () => {
  // 🌟 STATIC DATA: Paste your actual Google Drive or board links here
  const links = {
    c11: "#",
    c12: "#",
    cADS: "#",
    cBS: "#",
  };

  return (
    <main className="font-body w-full min-h-screen bg-slate-50">
      <div className="bg-collegeDark py-10 md:py-14 text-center border-b-4 border-collegeCyan">
        <h1 className="text-2xl md:text-4xl font-heading font-bold text-white uppercase tracking-wider">
          Academic Curriculum
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-collegeDark uppercase tracking-wide">
            Course Outlines & Books
          </h2>
          <div className="w-24 h-1 bg-collegeGreen mx-auto mt-4 mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Access official textbooks for Intermediate programs and detailed
            semester-wise course outlines for our degree programs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Class XI */}
          <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-collegeGreen flex flex-col">
            <div className="w-16 h-16 bg-[#f0f8fb] rounded-full flex items-center justify-center mx-auto mb-6 text-collegeGreen">
              <Book className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-heading font-bold text-collegeDark mb-2 text-center">
              Class XI (First Year)
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              Access the official digital textbooks and syllabus outlines
              provided by the Sindh Textbook Board.
            </p>
            <a
              href={links.c11}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto flex items-center justify-center gap-2 w-full bg-collegeGreen text-white py-3 px-4 rounded hover:bg-opacity-90 font-semibold text-sm"
            >
              Visit Board Website <Globe size={18} />
            </a>
          </div>

          {/* Class XII */}
          <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-collegeGreen flex flex-col">
            <div className="w-16 h-16 bg-[#f0f8fb] rounded-full flex items-center justify-center mx-auto mb-6 text-collegeGreen">
              <Book className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-heading font-bold text-collegeDark mb-2 text-center">
              Class XII (Second Year)
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              Download the official second-year curriculum materials and
              textbooks directly from the portal.
            </p>
            <a
              href={links.c12}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto flex items-center justify-center gap-2 w-full bg-collegeGreen text-white py-3 px-4 rounded hover:bg-opacity-90 font-semibold text-sm"
            >
              Visit Board Website <Globe size={18} />
            </a>
          </div>

          {/* ADS */}
          <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-collegeCyan flex flex-col">
            <div className="w-16 h-16 bg-[#f0f8fb] rounded-full flex items-center justify-center mx-auto mb-6 text-collegeCyan">
              <Library className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-heading font-bold text-collegeDark mb-2 text-center">
              Associate Degree in Science
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              Detailed semester-wise course outlines and recommended reading
              materials for the ADS program.
            </p>
            <a
              href={links.cADS}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto flex items-center justify-center gap-2 w-full bg-collegeCyan text-white py-3 px-4 rounded hover:bg-opacity-90 font-semibold text-sm"
            >
              View Curriculum (PDF) <ExternalLink size={18} />
            </a>
          </div>

          {/* BS */}
          <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-collegeDark flex flex-col">
            <div className="w-16 h-16 bg-[#f0f8fb] rounded-full flex items-center justify-center mx-auto mb-6 text-collegeDark">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-heading font-bold text-collegeDark mb-2 text-center">
              BS Programs (4-Years)
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              Comprehensive HEC-approved syllabus outlines spanning all 8
              semesters for our BS Degree programs.
            </p>
            <a
              href={links.cBS}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto flex items-center justify-center gap-2 w-full bg-collegeDark text-white py-3 px-4 rounded hover:bg-opacity-90 font-semibold text-sm"
            >
              View Curriculum (PDF) <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Curriculum;
