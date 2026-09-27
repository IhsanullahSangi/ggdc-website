import { useState, useEffect } from "react";
import {
  Award,
  Upload,
  Trash2,
  Search,
  Save,
  LayoutTemplate,
} from "lucide-react";

const ManageResults = () => {
  const [pastedData, setPastedData] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [savedResults, setSavedResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [pageSettings, setPageSettings] = useState({
    resultPageHeading: "",
    resultPageSubheading: "",
    resultCertificateSubtitle: "",
    resultDisciplineLabel: "",
    resultCpnLabel: "",
    resultPassText: "",
    resultFailText: "",
    resultPassMessage: "",
    resultFailMessage: "",
  });

  const fetchData = async () => {
    try {
      const resResults = await fetch("http://localhost:8080/api/results");
      if (resResults.ok) setSavedResults(await resResults.json());

      const token = localStorage.getItem("adminToken");
      const resSettings = await fetch("http://localhost:8080/api/settings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (resSettings.ok) {
        const data = await resSettings.json();
        setPageSettings({
          resultPageHeading: data.resultPageHeading || "",
          resultPageSubheading: data.resultPageSubheading || "",
          resultCertificateSubtitle: data.resultCertificateSubtitle || "",
          resultDisciplineLabel: data.resultDisciplineLabel || "Discipline:",
          resultCpnLabel: data.resultCpnLabel || "CPN:",
          resultPassText: data.resultPassText || "Selected",
          resultFailText: data.resultFailText || "Not Selected",
          resultPassMessage: data.resultPassMessage || "",
          resultFailMessage: data.resultFailMessage || "",
        });
      }
    } catch (err) {
      console.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setIsSavingSettings(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        "http://localhost:8080/api/settings/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(pageSettings),
        },
      );
      if (response.ok) alert("Page settings updated successfully!");
    } catch (error) {
      alert("Failed to update page settings.");
    } finally {
      setIsSavingSettings(false);
    }
  };

  const handleBulkUpload = async () => {
    if (!pastedData.trim())
      return alert("Please paste data from Google Sheets first.");
    setIsUploading(true);
    try {
      let sanitizedData = pastedData.replace(/"([^"]*)"/g, (match, p1) =>
        p1.replace(/\n/g, " "),
      );
      const rows = sanitizedData.split("\n");
      const formattedResults = rows
        .map((row) => {
          const cols = row
            .split("\t")
            .map((c) => c.trim().replace(/"/g, ""))
            .filter((c) => c !== "");
          if (cols.length >= 7) {
            return {
              seatNo: cols[0],
              name: cols[1],
              fName: cols[2],
              discipline: cols[3],
              score: cols[4],
              cpn: cols[5],
              status: cols[6], // 🌟 Now dynamically grabs exactly what is in the spreadsheet!
            };
          }
          return null;
        })
        .filter(Boolean);

      if (formattedResults.length === 0)
        return alert(
          "Could not detect valid data. Ensure you copied all 7 columns.",
        );

      const token = localStorage.getItem("adminToken");
      const res = await fetch("http://localhost:8080/api/results/bulk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ results: formattedResults }),
      });
      if (res.ok) {
        alert(`Success! Uploaded ${formattedResults.length} student results.`);
        setPastedData("");
        fetchData();
      }
    } catch (err) {
      alert("Error processing upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm("WARNING: Delete all results?")) return;
    const token = localStorage.getItem("adminToken");
    await fetch("http://localhost:8080/api/results/clear", {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchData();
  };

  const filteredResults = savedResults.filter(
    (r) =>
      r.seatNo.includes(searchTerm) ||
      r.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="max-w-5xl space-y-8 pb-20">
      <div className="flex items-center gap-3 mb-8">
        <Award className="text-collegeCyan" size={32} />
        <h1 className="text-3xl font-heading font-bold text-slate-800">
          Manage Test Results
        </h1>
      </div>

      {/* 🌟 UPGRADED: Editable Page Headers & Labels Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <div className="flex items-center gap-2 mb-6 text-collegeDark">
          <LayoutTemplate size={20} />
          <h2 className="text-xl font-bold">Universal Result Settings</h2>
        </div>
        <form onSubmit={handleSaveSettings} className="space-y-6">
          {/* Headers */}
          <div className="p-4 bg-slate-50 border rounded">
            <h3 className="font-bold text-slate-700 mb-3">1. Page Headers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold mb-1">
                  Top Heading
                </label>
                <input
                  type="text"
                  value={pageSettings.resultPageHeading}
                  onChange={(e) =>
                    setPageSettings({
                      ...pageSettings,
                      resultPageHeading: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded focus:outline-collegeCyan text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">
                  Top Subheading
                </label>
                <input
                  type="text"
                  value={pageSettings.resultPageSubheading}
                  onChange={(e) =>
                    setPageSettings({
                      ...pageSettings,
                      resultPageSubheading: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded focus:outline-collegeCyan text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">
                Certificate Subtitle
              </label>
              <input
                type="text"
                value={pageSettings.resultCertificateSubtitle}
                onChange={(e) =>
                  setPageSettings({
                    ...pageSettings,
                    resultCertificateSubtitle: e.target.value,
                  })
                }
                className="w-full border p-2 rounded focus:outline-collegeCyan text-sm"
              />
            </div>
          </div>

          {/* Custom Labels */}
          <div className="p-4 bg-slate-50 border rounded">
            <h3 className="font-bold text-slate-700 mb-3">
              2. Custom Field Labels
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1">
                  Column 4 Label (e.g., Discipline:, Group:)
                </label>
                <input
                  type="text"
                  value={pageSettings.resultDisciplineLabel}
                  onChange={(e) =>
                    setPageSettings({
                      ...pageSettings,
                      resultDisciplineLabel: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded focus:outline-collegeCyan text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">
                  Column 6 Label (e.g., CPN:, Percentage:)
                </label>
                <input
                  type="text"
                  value={pageSettings.resultCpnLabel}
                  onChange={(e) =>
                    setPageSettings({
                      ...pageSettings,
                      resultCpnLabel: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded focus:outline-collegeCyan text-sm"
                />
              </div>
            </div>
          </div>

          {/* Status Words */}
          <div className="p-4 bg-slate-50 border rounded">
            <h3 className="font-bold text-slate-700 mb-3">
              3. Status Words (Must match your spreadsheet exactly)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-green-700">
                  Success Word (e.g., Selected, Pass)
                </label>
                <input
                  type="text"
                  value={pageSettings.resultPassText}
                  onChange={(e) =>
                    setPageSettings({
                      ...pageSettings,
                      resultPassText: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded focus:outline-collegeCyan text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-red-700">
                  Failure Word (e.g., Not Selected, Fail)
                </label>
                <input
                  type="text"
                  value={pageSettings.resultFailText}
                  onChange={(e) =>
                    setPageSettings({
                      ...pageSettings,
                      resultFailText: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded focus:outline-collegeCyan text-sm"
                />
              </div>
            </div>
          </div>

          {/* Custom Messages */}
          <div className="p-4 bg-slate-50 border rounded">
            <h3 className="font-bold text-slate-700 mb-3">
              4. Custom Feedback Messages
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-green-700">
                  Success Box Message
                </label>
                <textarea
                  rows="3"
                  value={pageSettings.resultPassMessage}
                  onChange={(e) =>
                    setPageSettings({
                      ...pageSettings,
                      resultPassMessage: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded focus:outline-collegeCyan text-sm resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-red-700">
                  Failure Box Message
                </label>
                <textarea
                  rows="3"
                  value={pageSettings.resultFailMessage}
                  onChange={(e) =>
                    setPageSettings({
                      ...pageSettings,
                      resultFailMessage: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded focus:outline-collegeCyan text-sm resize-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSavingSettings}
            className="bg-collegeDark text-white font-bold py-3 px-8 rounded shadow hover:bg-slate-800 flex items-center gap-2 transition-colors"
          >
            <Save size={18} />{" "}
            {isSavingSettings ? "Saving..." : "Save All Settings"}
          </button>
        </form>
      </div>

      {/* Bulk Upload Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-collegeCyan">
        <h2 className="text-xl font-bold text-collegeDark mb-2">
          Bulk Upload from Google Sheets
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Your spreadsheet must have these 7 columns in this exact order:
        </p>
        <p className="text-xs font-mono bg-slate-100 p-2 rounded mb-4 inline-block">
          Seat No | Name | Father Name | Col 4 | Score | Col 6 | Status
        </p>
        <textarea
          rows="4"
          value={pastedData}
          onChange={(e) => setPastedData(e.target.value)}
          className="w-full border-2 border-dashed border-gray-300 p-4 rounded focus:outline-none focus:border-collegeCyan font-mono text-sm mb-4"
          placeholder="Paste columns here..."
        ></textarea>
        <button
          onClick={handleBulkUpload}
          disabled={isUploading}
          className="bg-collegeCyan text-white font-bold py-2 px-6 rounded shadow hover:bg-cyan-600"
        >
          <Upload size={18} className="inline mr-2" />{" "}
          {isUploading ? "Uploading..." : "Sync to Live Database"}
        </button>
      </div>

      {/* Database Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-collegeDark">
            Live Results Database
          </h2>
          <button
            onClick={handleClearAll}
            className="text-red-600 bg-red-50 hover:bg-red-100 font-bold px-4 py-2 rounded flex items-center gap-2"
          >
            <Trash2 size={16} /> Clear All
          </button>
        </div>
        <div className="relative mb-6">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by Seat No or Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border p-2 pl-10 rounded focus:outline-collegeCyan"
          />
        </div>
        <div className="max-h-[400px] overflow-y-auto border rounded">
          <table className="w-full text-left border-collapse text-sm">
            <thead className="bg-slate-100 sticky top-0">
              <tr>
                <th className="p-3 border-b">Seat No</th>
                <th className="p-3 border-b">Name</th>
                <th className="p-3 border-b">Score</th>
                <th className="p-3 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((res) => (
                <tr
                  key={res._id}
                  className="hover:bg-slate-50 border-b last:border-0"
                >
                  <td className="p-3 font-mono font-bold text-gray-700">
                    {res.seatNo}
                  </td>
                  <td className="p-3">{res.name}</td>
                  <td className="p-3 font-bold">{res.score}</td>
                  <td className="p-3">
                    <span className="px-2 py-1 rounded text-xs font-bold bg-slate-200 text-slate-800">
                      {res.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageResults;
