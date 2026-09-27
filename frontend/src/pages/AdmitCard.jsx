import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Search, AlertCircle, FileText, CheckCircle2 } from "lucide-react";

// 🌟 STATIC DATA: Add your student admit card links manually here
const mockAdmitCards = [
  {
    cnic: "42301-1234567-1",
    pdfUrl: "https://drive.google.com/file/d/your_test_link/view",
  },
];

const AdmitCard = () => {
  const [isValidPhase] = useState(true);

  // 🌟 STATIC DATA: Hardcoded labels
  const [pageData] = useState({
    admitCardHeading: "DOWNLOAD ADMIT CARD",
    admitCardSubheading: "Pre-Entry Test",
  });

  const [cnic, setCnic] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successLink, setSuccessLink] = useState("");

  if (isValidPhase === false) {
    return <Navigate to="/" replace />;
  }

  // Auto-format CNIC with dashes (XXXXX-XXXXXXX-X)
  const handleCnicChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 13) value = value.slice(0, 13);

    let formattedValue = value;
    if (value.length > 5 && value.length <= 12) {
      formattedValue = `${value.slice(0, 5)}-${value.slice(5)}`;
    } else if (value.length > 12) {
      formattedValue = `${value.slice(0, 5)}-${value.slice(5, 12)}-${value.slice(12)}`;
    }

    setCnic(formattedValue);
    setError("");
    setSuccessLink("");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessLink("");

    if (cnic.length !== 15) {
      setError("Please enter a valid 13-digit CNIC number.");
      return;
    }

    setIsLoading(true);

    // 🌟 STATIC SEARCH LOGIC: Simulates network delay and searches the local array
    setTimeout(() => {
      const foundCard = mockAdmitCards.find((card) => card.cnic === cnic);

      if (foundCard) {
        setSuccessLink(foundCard.pdfUrl);
      } else {
        setError(
          "No Admit Card found for this CNIC. Please check the number and try again.",
        );
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <main className="font-body w-full min-h-screen bg-slate-50 pb-20 animate-in fade-in duration-500">
      <div className="bg-collegeDark py-10 md:py-14 text-center border-b-4 border-collegeCyan">
        <h1 className="text-2xl md:text-4xl font-heading font-bold text-white uppercase tracking-wider">
          {pageData.admitCardHeading}
        </h1>
        <p className="text-cyan-100 mt-2 font-medium tracking-wide">
          {pageData.admitCardSubheading}
        </p>
      </div>

      <div className="max-w-xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-white rounded-lg shadow-lg border-t-4 border-collegeCyan p-6 md:p-10">
          <div className="flex justify-center mb-6 text-collegeCyan">
            <FileText size={48} />
          </div>

          <h2 className="text-2xl font-heading font-bold text-center text-collegeDark mb-2">
            Candidate Search
          </h2>
          <p className="text-center text-gray-500 text-sm mb-8">
            Enter your exact CNIC number (as provided on your application form)
            to download and print your official Admit Card.
          </p>

          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <label
                htmlFor="cnic"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                CNIC Number
              </label>
              <input
                type="text"
                id="cnic"
                value={cnic}
                onChange={handleCnicChange}
                placeholder="XXXXX-XXXXXXX-X"
                className="w-full px-4 py-3 text-center text-xl tracking-widest rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-collegeCyan focus:border-transparent transition-all bg-slate-50 focus:bg-white text-gray-800 font-mono"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded flex items-start gap-2 text-sm border border-red-100 animate-in fade-in">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {!successLink && (
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-collegeCyan text-white font-bold text-lg py-3 rounded flex items-center justify-center gap-2 hover:bg-collegeDark transition-colors shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="animate-pulse">Searching Records...</span>
                ) : (
                  <>
                    Search Admit Card <Search size={20} />
                  </>
                )}
              </button>
            )}
          </form>

          {successLink && (
            <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg text-center animate-in zoom-in-95 duration-300">
              <CheckCircle2
                size={40}
                className="text-collegeGreen mx-auto mb-3"
              />
              <h3 className="font-bold text-lg text-green-800 mb-2">
                Admit Card Found!
              </h3>
              <p className="text-sm text-green-700 mb-6">
                Click the button below to view and print your admit card from
                Google Drive. Please bring a printed copy to the examination
                hall.
              </p>
              <a
                href={successLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full bg-collegeGreen text-white font-bold py-3 px-4 rounded hover:bg-green-700 transition-colors shadow-md"
              >
                View & Print Admit Card <FileText size={18} />
              </a>

              <button
                onClick={() => {
                  setSuccessLink("");
                  setCnic("");
                }}
                className="mt-4 text-sm text-gray-500 hover:text-collegeDark underline"
              >
                Search another CNIC
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdmitCard;
