import { useState } from "react";
import { Navigate } from "react-router-dom";
import { CalendarDays, CheckCircle, FileText, AlertCircle } from "lucide-react";

const OnlineApply = () => {
  // 🌟 STATIC DATA: Hardcoded phase and page data
  const [isValidPhase] = useState(true);
  const [pageData] = useState({
    admissionHeading: "BS PROGRAM ADMISSIONS",
    admissionSubheading: "Fall Intake",
    formAvailableDate: "Oct 1, 2026",
    lastDateToApply: "Oct 25, 2026",
    preEntryTestDate: "Nov 5, 2026",
    eligibilityCriteria:
      "Minimum 50% marks in Intermediate (HSC) or equivalent.\nValid Domicile and PRC of relevant districts.",
    requiredDocuments:
      "CNIC or B-Form (Front/Back)\nMatriculation Pacca Certificate\nIntermediate Marksheet\nPassport Size Photo (Blue bg)",
    googleFormLink: "", // Add your actual Google Form embed link here
  });

  if (isValidPhase === false) {
    return <Navigate to="/" replace />;
  }

  // Convert the multiline text into Arrays for rendering
  const eligibilityList = pageData.eligibilityCriteria
    ? pageData.eligibilityCriteria.split("\n")
    : [];
  const documentsList = pageData.requiredDocuments
    ? pageData.requiredDocuments.split("\n")
    : [];

  return (
    <main className="font-body w-full min-h-screen bg-slate-50 pb-20 animate-in fade-in duration-500">
      {/* Dynamic Page Header */}
      <div className="bg-collegeDark py-10 md:py-14 text-center border-b-4 border-collegeCyan">
        <h1 className="text-2xl md:text-4xl font-heading font-bold text-white uppercase tracking-wider">
          {pageData.admissionHeading}
        </h1>
        <p className="text-cyan-100 mt-2 font-medium tracking-wide">
          {pageData.admissionSubheading}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6 lg:col-span-1">
            {/* Dynamic Dates */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-collegeCyan">
              <div className="flex items-center gap-2 mb-4 text-collegeDark">
                <CalendarDays size={24} className="text-collegeCyan" />
                <h3 className="font-heading font-bold text-lg">
                  Important Dates
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Forms Available:</span>
                  <span>{pageData.formAvailableDate}</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Last Date to Apply:</span>
                  <span className="text-red-600 font-bold">
                    {pageData.lastDateToApply}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">Pre-Entry Test:</span>
                  <span>{pageData.preEntryTestDate}</span>
                </li>
              </ul>
            </div>

            {/* Dynamic Eligibility Criteria */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-collegeGreen">
              <div className="flex items-center gap-2 mb-4 text-collegeDark">
                <CheckCircle size={24} className="text-collegeGreen" />
                <h3 className="font-heading font-bold text-lg">Eligibility</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                {eligibilityList.map(
                  (item, index) =>
                    item.trim() && (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-collegeGreen shrink-0"></div>
                        <p>{item}</p>
                      </li>
                    ),
                )}
              </ul>
            </div>

            {/* Dynamic Required Documents */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-collegeDark">
              <div className="flex items-center gap-2 mb-4 text-collegeDark">
                <FileText size={24} className="text-gray-500" />
                <h3 className="font-heading font-bold text-lg">
                  Required Documents
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                {documentsList.map(
                  (item, index) =>
                    item.trim() && (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0"></div>{" "}
                        {item}
                      </li>
                    ),
                )}
              </ul>
            </div>

            {/* Warning Alert */}
            <div className="bg-red-50 p-4 rounded-lg flex gap-3 text-red-700 border border-red-100">
              <AlertCircle size={24} className="shrink-0" />
              <p className="text-xs font-medium leading-relaxed">
                Take a moment to double-check all your information before
                submitting. We will use these exact details for all your future
                communications and educational records.
              </p>
            </div>
          </div>

          {/* Dynamic Google Form Embed */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-2 md:p-4 h-fit">
            {pageData.googleFormLink ? (
              <iframe
                src={pageData.googleFormLink}
                className="w-full h-[800px] md:h-[1200px] border-0 rounded-md"
                title="BS Admissions Application Form"
                loading="lazy"
              >
                Loading form...
              </iframe>
            ) : (
              <div className="w-full h-[500px] flex items-center justify-center bg-slate-100 rounded-md text-gray-500">
                Admission form will appear here when configured by
                administration.
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default OnlineApply;
