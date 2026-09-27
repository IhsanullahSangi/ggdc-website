import { useState, useEffect } from "react";
import {
  Database,
  Upload,
  Trash2,
  Search,
  Save,
  LayoutTemplate,
} from "lucide-react";

const ManageAdmitCards = () => {
  const [pastedData, setPastedData] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [savedCards, setSavedCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // 🌟 NEW: State for Page Headers
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [pageSettings, setPageSettings] = useState({
    admitCardHeading: "",
    admitCardSubheading: "",
  });

  const fetchData = async () => {
    try {
      // Fetch Admit Cards Data
      const resCards = await fetch("http://localhost:8080/api/admitcards");
      if (resCards.ok) setSavedCards(await resCards.json());

      // 🌟 NEW: Fetch Global Settings for Headers
      const token = localStorage.getItem("adminToken");
      const resSettings = await fetch("http://localhost:8080/api/settings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (resSettings.ok) {
        const data = await resSettings.json();
        setPageSettings({
          admitCardHeading: data.admitCardHeading || "",
          admitCardSubheading: data.admitCardSubheading || "",
        });
      }
    } catch (err) {
      console.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🌟 NEW: Save Header Settings Function
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
      if (response.ok) alert("Admit Card page headers updated successfully!");
    } catch (error) {
      alert("Failed to update page headers.");
    } finally {
      setIsSavingSettings(false);
    }
  };

  // Bulk Upload Function (Unchanged)
  const handleBulkUpload = async () => {
    if (!pastedData.trim())
      return alert("Please paste data from Google Sheets first.");
    setIsUploading(true);

    try {
      const rows = pastedData.split("\n");
      const formattedCards = rows
        .map((row) => {
          const columns = row.split("\t");
          if (columns.length >= 2) {
            const cnic = columns[0].trim();
            const pdfUrl = columns[1].trim();
            if (cnic && pdfUrl.includes("http")) {
              return { cnic, pdfUrl };
            }
          }
          return null;
        })
        .filter(Boolean);

      if (formattedCards.length === 0) {
        alert(
          "Could not detect valid data. Ensure you copy two columns: CNIC and URL.",
        );
        setIsUploading(false);
        return;
      }

      const token = localStorage.getItem("adminToken");
      const res = await fetch("http://localhost:8080/api/admitcards/bulk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cards: formattedCards }),
      });

      if (res.ok) {
        alert(
          `Success! Uploaded ${formattedCards.length} admit cards to the live database.`,
        );
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
    if (
      !window.confirm(
        "WARNING: This will permanently delete ALL admit cards for the current year. Are you sure?",
      )
    )
      return;
    const token = localStorage.getItem("adminToken");
    await fetch("http://localhost:8080/api/admitcards/clear", {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchData();
  };

  const filteredCards = savedCards.filter((card) =>
    card.cnic.includes(searchTerm),
  );

  return (
    <div className="max-w-4xl space-y-8 pb-20">
      <div className="flex items-center gap-3 mb-8">
        <Database className="text-collegeCyan" size={32} />
        <h1 className="text-3xl font-heading font-bold text-slate-800">
          Manage Admit Cards
        </h1>
      </div>

      {/* 🌟 NEW: Editable Page Headers Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <div className="flex items-center gap-2 mb-4 text-collegeDark">
          <LayoutTemplate size={20} />
          <h2 className="text-xl font-bold">Public Page Settings</h2>
        </div>
        <form onSubmit={handleSaveSettings} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Main Top Heading
              </label>
              <input
                type="text"
                value={pageSettings.admitCardHeading}
                onChange={(e) =>
                  setPageSettings({
                    ...pageSettings,
                    admitCardHeading: e.target.value,
                  })
                }
                className="w-full border p-2 rounded focus:outline-collegeCyan"
                placeholder="e.g., DOWNLOAD ADMIT CARD"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Top Subheading
              </label>
              <input
                type="text"
                value={pageSettings.admitCardSubheading}
                onChange={(e) =>
                  setPageSettings({
                    ...pageSettings,
                    admitCardSubheading: e.target.value,
                  })
                }
                className="w-full border p-2 rounded focus:outline-collegeCyan"
                placeholder="e.g., Pre-Entry Test"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isSavingSettings}
            className="bg-collegeDark text-white font-bold py-2 px-6 rounded shadow hover:bg-slate-800 flex items-center gap-2 transition-colors"
          >
            <Save size={18} />{" "}
            {isSavingSettings ? "Saving..." : "Update Headers"}
          </button>
        </form>
      </div>

      {/* Bulk Upload Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-collegeCyan">
        <h2 className="text-xl font-bold text-collegeDark mb-2">
          Bulk Upload via AutoCrat
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Highlight the <strong>CNIC column</strong> and the{" "}
          <strong>Merge Doc URL column</strong> in your Google Sheet. Copy them
          (Ctrl+C) and paste them directly into the box below (Ctrl+V).
        </p>

        <textarea
          rows="6"
          value={pastedData}
          onChange={(e) => setPastedData(e.target.value)}
          className="w-full border-2 border-dashed border-gray-300 p-4 rounded focus:outline-none focus:border-collegeCyan font-mono text-sm mb-4"
          placeholder="42301-1234567-1    https://drive.google.com/file/d/..."
        ></textarea>

        <button
          onClick={handleBulkUpload}
          disabled={isUploading}
          className="bg-collegeCyan text-white font-bold py-2 px-6 rounded shadow flex items-center gap-2 hover:bg-cyan-600 transition-colors"
        >
          <Upload size={18} />{" "}
          {isUploading ? "Processing Database..." : "Sync to Live Database"}
        </button>
      </div>

      {/* Directory Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-collegeDark">
            Live Admit Cards Database
          </h2>
          <button
            onClick={handleClearAll}
            className="text-red-600 bg-red-50 hover:bg-red-100 font-bold px-4 py-2 rounded flex items-center gap-2 transition-colors"
          >
            <Trash2 size={16} /> Clear All Cards
          </button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by CNIC..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border p-2 pl-10 rounded focus:outline-collegeCyan"
          />
        </div>

        <div className="max-h-[400px] overflow-y-auto border rounded">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-100 sticky top-0">
              <tr>
                <th className="p-3 border-b font-semibold text-collegeDark">
                  CNIC
                </th>
                <th className="p-3 border-b font-semibold text-collegeDark">
                  Google Drive PDF Link
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCards.map((card) => (
                <tr
                  key={card._id}
                  className="hover:bg-slate-50 border-b last:border-0"
                >
                  <td className="p-3 font-mono text-sm font-bold text-gray-700">
                    {card.cnic}
                  </td>
                  <td className="p-3 text-sm">
                    <a
                      href={card.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View PDF Document
                    </a>
                  </td>
                </tr>
              ))}
              {filteredCards.length === 0 && (
                <tr>
                  <td colSpan="2" className="p-6 text-center text-gray-500">
                    No admit cards found in database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageAdmitCards;
