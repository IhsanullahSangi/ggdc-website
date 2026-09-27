import { useState, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import {
  Search,
  AlertCircle,
  Award,
  XCircle,
  RefreshCw,
  Printer,
} from "lucide-react";

// 🌟 STATIC DATA: Add your student results manually here for the static site
const mockResults = [
  {
    seatNo: "1001",
    name: "Ayesha Khan",
    fName: "Ahmed Khan",
    discipline: "BS Botany",
    score: "68",
    cpn: "72.5",
    status: "Selected",
  },
  {
    seatNo: "1002",
    name: "Fatima Ali",
    fName: "Syed Ali",
    discipline: "BS Computer Science",
    score: "45",
    cpn: "50.1",
    status: "Not Selected",
  },
];

const Results = () => {
  const [isValidPhase] = useState(true);

  // 🌟 STATIC DATA: Hardcoded labels
  const [pageData] = useState({
    resultPageHeading: "PRE-ENTRY TEST RESULTS",
    resultPageSubheading: "Fall Admissions",
    resultCertificateSubtitle: "BS Programs Pre-Entry Test",
    resultDisciplineLabel: "Discipline:",
    resultCpnLabel: "CPN:",
    resultPassText: "Selected",
    resultFailText: "Not Selected",
    resultPassMessage:
      "Please contact the administration to secure your admission.",
    resultFailMessage:
      "We regret to inform you that you were not selected in this merit list.",
  });

  const [seatNumber, setSeatNumber] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resultData, setResultData] = useState(null);

  const [showConfetti, setShowConfetti] = useState(false);
  const congratsRef = useRef(null);

  const isPassed =
    resultData &&
    resultData.status.toLowerCase() ===
      (pageData.resultPassText || "Selected").toLowerCase();

  useEffect(() => {
    if (isPassed && congratsRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setShowConfetti(true);
            observer.disconnect();
          }
        },
        { threshold: 0.5 },
      );
      observer.observe(congratsRef.current);
      return () => observer.disconnect();
    } else {
      setShowConfetti(false);
    }
  }, [resultData, isPassed]);

  if (isValidPhase === false) {
    return <Navigate to="/" replace />;
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setResultData(null);
    setShowConfetti(false);

    if (!seatNumber.trim()) {
      setError("Please enter your Seat Number.");
      return;
    }

    setIsLoading(true);

    // 🌟 STATIC SEARCH LOGIC: Simulates network delay and searches the local array
    setTimeout(() => {
      const foundResult = mockResults.find(
        (r) => r.seatNo === seatNumber.trim(),
      );

      if (foundResult) {
        setResultData(foundResult);
      } else {
        setError(
          "No result found for this Seat Number. Please check and try again.",
        );
      }
      setIsLoading(false);
    }, 800);
  };

  const customStyles = `
    @keyframes shoot-left { 0% { transform: translate(0, 0) scale(0); opacity: 0; } 50% { opacity: 1; } 100% { transform: translate(100px, -300px) scale(1.5) rotate(45deg); opacity: 0; } }
    @keyframes shoot-right { 0% { transform: translate(0, 0) scale(0); opacity: 0; } 50% { opacity: 1; } 100% { transform: translate(-100px, -300px) scale(1.5) rotate(-45deg); opacity: 0; } }
    .animate-confetti-left { animation: shoot-left 2s ease-out forwards; }
    .animate-confetti-right { animation: shoot-right 2s ease-out forwards; }
    @media print { header, footer, nav, iframe, .floating-alert { display: none !important; } main { min-height: auto !important; padding: 0 !important; margin: 0 !important; background-color: white !important; } #printable-certificate { box-shadow: none !important; border: 2px solid #e5e7eb !important; margin: 0 auto !important; page-break-inside: avoid; } * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } @page { margin: 15mm; } }
  `;

  return (
    <main className="font-body w-full min-h-screen bg-slate-50 pb-20 animate-in fade-in duration-500">
      <style>{customStyles}</style>

      <div className="print:hidden bg-collegeDark py-10 md:py-14 text-center border-b-4 border-collegeCyan">
        <h1 className="text-2xl md:text-4xl font-heading font-bold text-white uppercase tracking-wider">
          {pageData.resultPageHeading}
        </h1>
        <p className="text-cyan-100 mt-2 font-medium tracking-wide">
          {pageData.resultPageSubheading}
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {!resultData && (
          <div className="bg-white rounded-lg shadow-lg border-t-4 border-collegeCyan p-6 md:p-10 max-w-xl mx-auto print:hidden">
            <div className="flex justify-center mb-6 text-collegeCyan">
              <Award size={48} />
            </div>

            <h2 className="text-2xl font-heading font-bold text-center text-collegeDark mb-2">
              Check Your Result
            </h2>
            <p className="text-center text-gray-500 text-sm mb-8">
              Enter your assigned Seat Number to view your test result.
            </p>

            <form onSubmit={handleSearch} className="space-y-6">
              <div>
                <label
                  htmlFor="seatNumber"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Seat Number
                </label>
                <input
                  type="text"
                  id="seatNumber"
                  value={seatNumber}
                  onChange={(e) => setSeatNumber(e.target.value)}
                  placeholder="Enter Seat No"
                  className="w-full px-4 py-3 text-center text-xl tracking-wider rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-collegeCyan focus:border-transparent transition-all bg-slate-50 focus:bg-white text-gray-800 font-mono"
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded flex items-start gap-2 text-sm border border-red-100">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-collegeCyan text-white font-bold text-lg py-3 rounded flex items-center justify-center gap-2 hover:bg-collegeDark transition-colors shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="animate-pulse">Checking Records...</span>
                ) : (
                  <>
                    View Result <Search size={20} />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {resultData && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-6 print:hidden">
              <button
                onClick={() => {
                  setResultData(null);
                  setSeatNumber("");
                  setShowConfetti(false);
                }}
                className="flex items-center gap-2 text-gray-600 hover:text-collegeCyan font-semibold transition-colors"
              >
                <RefreshCw size={18} /> Search Another
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 bg-slate-200 text-collegeDark px-4 py-2 rounded hover:bg-slate-300 font-semibold transition-colors shadow-sm"
              >
                <Printer size={18} /> Print Result
              </button>
            </div>

            <div
              id="printable-certificate"
              className={`relative bg-white p-8 md:p-12 rounded-lg shadow-2xl border-t-8 print:shadow-none print:border-t-4 print:border-gray-800 ${isPassed ? "border-collegeGreen" : "border-gray-400"}`}
            >
              {showConfetti && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg print:hidden">
                  <div className="absolute bottom-0 left-0 text-6xl animate-confetti-left">
                    🎉
                  </div>
                  <div
                    className="absolute bottom-10 left-10 text-5xl animate-confetti-left"
                    style={{ animationDelay: "0.2s" }}
                  >
                    🎊
                  </div>
                  <div className="absolute bottom-0 right-0 text-6xl animate-confetti-right">
                    🎉
                  </div>
                  <div
                    className="absolute bottom-10 right-10 text-5xl animate-confetti-right"
                    style={{ animationDelay: "0.3s" }}
                  >
                    🎊
                  </div>
                </div>
              )}

              <div className="text-center mb-10 border-b-2 border-gray-100 pb-8">
                <h2 className="text-3xl font-heading font-bold text-collegeDark uppercase tracking-widest mb-1">
                  Official Result
                </h2>
                <p className="text-gray-500 font-medium">
                  {pageData.resultCertificateSubtitle}
                </p>
              </div>

              <div className="space-y-6 max-w-xl mx-auto">
                <div className="grid grid-cols-3 gap-4 items-center">
                  <span className="col-span-1 text-gray-600 font-semibold">
                    Seat No:
                  </span>
                  <span className="col-span-2 font-bold text-lg text-collegeDark">
                    {resultData.seatNo}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 items-center">
                  <span className="col-span-1 text-gray-600 font-semibold">
                    Name:
                  </span>
                  <span className="col-span-2 font-bold text-lg text-gray-800 uppercase">
                    {resultData.name}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 items-center">
                  <span className="col-span-1 text-gray-600 font-semibold">
                    F. Name:
                  </span>
                  <span className="col-span-2 font-bold text-lg text-gray-800 uppercase">
                    {resultData.fName}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 items-center">
                  <span className="col-span-1 text-gray-600 font-semibold">
                    {pageData.resultDisciplineLabel}
                  </span>
                  <span className="col-span-2 font-bold text-collegeCyan">
                    {resultData.discipline}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 items-center mt-8 pt-6 border-t border-gray-100">
                  <span className="col-span-1 text-gray-600 font-semibold">
                    Test Score:
                  </span>
                  <span className="col-span-2 font-mono font-bold text-xl text-collegeDark">
                    {resultData.score}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 items-center">
                  <span className="col-span-1 text-gray-600 font-semibold">
                    {pageData.resultCpnLabel}
                  </span>
                  <span className="col-span-2 font-mono font-bold text-xl text-collegeDark">
                    {resultData.cpn}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 items-start">
                  <span className="col-span-1 text-gray-600 font-semibold mt-1">
                    Remarks:
                  </span>
                  <div className="col-span-2">
                    {isPassed ? (
                      <span className="inline-block bg-green-100 text-green-800 font-bold px-4 py-1.5 rounded uppercase tracking-wider text-sm border border-green-200">
                        {resultData.status}
                      </span>
                    ) : (
                      <span className="inline-block bg-red-100 text-red-800 font-bold px-4 py-1.5 rounded uppercase tracking-wider text-sm border border-red-200">
                        {resultData.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div
                ref={congratsRef}
                className="mt-12 pt-8 border-t-2 border-gray-200 text-center"
              >
                {isPassed ? (
                  <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <Award
                      className="mx-auto text-collegeGreen mb-2"
                      size={32}
                    />
                    <h3 className="text-green-800 font-bold text-lg mb-1">
                      Congratulations!
                    </h3>
                    <p className="text-green-700 text-sm whitespace-pre-wrap">
                      <strong className="font-bold">Important Note:</strong>{" "}
                      {pageData.resultPassMessage}
                    </p>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <XCircle className="mx-auto text-gray-400 mb-2" size={32} />
                    <h3 className="text-gray-800 font-bold text-lg mb-1">
                      Keep Your Head Up
                    </h3>
                    <p className="text-gray-600 text-sm whitespace-pre-wrap">
                      <strong className="font-bold">Important Note:</strong>{" "}
                      {pageData.resultFailMessage}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Results;
