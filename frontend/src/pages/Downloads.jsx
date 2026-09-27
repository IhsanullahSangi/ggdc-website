import { FileCheck, Receipt, ExternalLink, DownloadCloud } from "lucide-react";

const Downloads = () => {
  // 🌟 STATIC DATA: Add your actual Google Drive PDF links here
  const admissionForms = [
    // Example format:
    // { _id: "1", title: "BS Programs Admission Form 2026", fileUrl: "#" }
  ];

  const challanForms = [
    // Example format:
    // { _id: "2", title: "First Semester Fee Challan", fileUrl: "#" }
  ];

  return (
    <main className="font-body w-full min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="bg-collegeDark py-10 md:py-14 text-center border-b-4 border-collegeCyan">
        <h1 className="text-2xl md:text-4xl font-heading font-bold text-white uppercase tracking-wider">
          Downloads Center
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-collegeDark uppercase tracking-wide flex items-center justify-center gap-3">
            <DownloadCloud className="text-collegeGreen w-8 h-8" />
            Official Forms
          </h2>
          <div className="w-24 h-1 bg-collegeGreen mx-auto mt-4 mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Download official admission forms and bank challans directly to your
            device. All files are provided in secure, print-ready PDF formats.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1: Admission Forms */}
          <section id="admission-forms" className="scroll-mt-28 flex">
            <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-collegeGreen hover:shadow-xl transition-shadow flex flex-col w-full">
              <div className="w-16 h-16 bg-[#f0f8fb] rounded-full flex items-center justify-center mx-auto mb-6 text-collegeGreen">
                <FileCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-heading font-bold text-collegeDark mb-2 text-center">
                Admission Forms
              </h3>
              <p className="text-sm text-gray-500 mb-6 font-medium text-center">
                Intermediate & Degree Programs
              </p>

              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                Download the official admission application forms for all
                respective groups. Please ensure you fill out all fields
                accurately before submitting them to the college admission
                office.
              </p>

              <div className="mt-auto space-y-3 w-full">
                {admissionForms.length > 0 ? (
                  admissionForms.map((doc) => (
                    <a
                      key={doc._id}
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-2 w-full bg-collegeGreen text-white py-3 px-4 rounded hover:bg-opacity-90 transition-colors font-semibold tracking-wide text-sm"
                    >
                      <span className="truncate">{doc.title}</span>{" "}
                      <ExternalLink size={18} className="shrink-0" />
                    </a>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 text-center italic border border-dashed border-gray-300 py-3 rounded">
                    No forms available yet.
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Card 2: Challan Forms */}
          <section id="challan-forms" className="scroll-mt-28 flex">
            <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-collegeCyan hover:shadow-xl transition-shadow flex flex-col w-full">
              <div className="w-16 h-16 bg-[#f0f8fb] rounded-full flex items-center justify-center mx-auto mb-6 text-collegeCyan">
                <Receipt className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-heading font-bold text-collegeDark mb-2 text-center">
                Bank Challan Forms
              </h3>
              <p className="text-sm text-gray-500 mb-6 font-medium text-center">
                Fee Deposit Vouchers
              </p>

              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                Download the official bank challan forms for enrollment,
                examination, or degree tuition fees. Print the PDF and deposit
                the required amount at the designated bank branches.
              </p>

              <div className="mt-auto space-y-3 w-full">
                {challanForms.length > 0 ? (
                  challanForms.map((doc) => (
                    <a
                      key={doc._id}
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-2 w-full bg-collegeCyan text-white py-3 px-4 rounded hover:bg-opacity-90 transition-colors font-semibold tracking-wide text-sm"
                    >
                      <span className="truncate">{doc.title}</span>{" "}
                      <ExternalLink size={18} className="shrink-0" />
                    </a>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 text-center italic border border-dashed border-gray-300 py-3 rounded">
                    No challans available yet.
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Downloads;
